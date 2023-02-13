import productBaseMixin from '../../components/product/base-mixin';
import browseMixin from './browse-mixin';
import throttle from 'lodash-es/throttle';

const throttleTime = 300;

export default {
  mixins: [productBaseMixin, browseMixin],

  props: {
    /** 是否显示总数 */
    totalVisible: {
      type: Boolean,
      default: true,
    },
    /** 描述详情文本 */
    descLabel: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      // 是否正在请求中
      isLoading: false,
      // 第一次请求是否完毕，完毕之后才能显示 blank 页
      isFirstLoadDone: false,
      // 是否获取完所有的商品
      isNoMore: false,
      // 商品列表加载图标延时器
      loadingTimer: null,
      // 是否显示商品列表加载图标
      isShowLoading: false,
      // 商品列表
      products: [],
      // 商品总数
      total: 0,
    };
  },

  mounted() {
    this.init();
  },

  watch: {
    productSdk: {
      immediate: true,
      handler() {
        this.listenSdkEvent();
      },
    },

    total: {
      immediate: true,
      handler() {
        this.$emit('total-change', this.total);
      },
    }
  },

  methods: {
    init() {
      this.isLoading = false;
      this.isFirstLoadDone = false;
      this.isNoMore = false;
      this.getProductList(true);
    },

    handleScroll(e) {
      this.checkBrowseProduct();
      this.handleScrollDebounce(e);
    },

    handleScrollDebounce: throttle(function(e) {
      // 获取下一页数据
      const target = e.target;
      const scrollHeight = parseInt(target.scrollHeight);
      const scrollTop = parseInt(target.scrollTop);
      const clientHeight = parseInt(target.clientHeight);
      // 滚动时距离底部 150px 内触发下一页的数据获取
      if (scrollTop >= scrollHeight - clientHeight - 150) {
        this.getProductList();
      }
    }, throttleTime),

    /**
     * 获取商品列表
     */
    async getProductList(isFirst = false) {
      if (this.isNoMore || this.isLoading || !this.productSdk) {
        return;
      }
      let rank = '';
      if (this.products.length && !isFirst) {
        rank = this.products[this.products.length - 1].rank;
      }

      this.isLoading = true;
      this.loadingTimer = setTimeout(() => {
        this.isShowLoading = true;
      }, 300);
      try {
        const res = await this.productSdk.getProductList({ rank });
        const { total = 0, content = [] } = res;
        console.info('商品列表', res);

        this.total = total;
        if (isFirst) {
          this.products = content;
          this.$nextTick(() => {
            this.isFirstLoadDone = true;
            this.$refs.productContent.scrollTop = 0;
          });
        } else {
          this.products = this.handleProducts([...this.products, ...content]);
        }

        if (content.length < 10) {
          this.isNoMore = true;
        }
      } catch (e) {}

      clearTimeout(this.loadingTimer);
      this.loadingTimer = null;
      this.$nextTick(() => {
        this.isLoading = false;
        this.isShowLoading = false;
        this.checkBrowseProduct();
      });
    },

    /**
     * 处理列表排序、去重
     * @param {Array} products 商品列表
     */
    handleProducts(products = []) {
      let newProducts = [...products];
      const pIds = {};
      newProducts = newProducts.filter(good => {
        // 去重
        if (pIds[good.productId]) {
          return false;
        }
        pIds[good.productId] = true;
        // 去除不在架的商品
        return Number(good.status) === 1;
      });
      // 排序
      newProducts.sort((good1, good2) => {
        return good1.rank > good2.rank ? -1 : 1;
      });
      return newProducts;
    },

    /** 监听 sdk 事件 */
    listenSdkEvent() {
      if (!this.productSdk) {
        return;
      }
      const { events } = this.productSdk;
      this.productSdk.on(events.PRODUCT_MESSAGE, this.handleProductMessage);
    },

    /**
     * 处理商品库消息
     */
    handleProductMessage(msg) {
      if (!this.productSdk) {
        return;
      }
      const ProductMessageStatus = this.productSdk.ProductMessageStatus;
      const status = `${msg.status}`;

      switch (status) {
        case ProductMessageStatus.OnShelf:
          this.handleOnShelfProduct(msg.content);
          break;
        case ProductMessageStatus.OffShelf:
        case ProductMessageStatus.DeleteProduct:
          this.handleOffShelfAndDel(msg.content);
          break;
        case ProductMessageStatus.AddProduct:
          this.handleAddProduct(msg.content);
          break;
        case ProductMessageStatus.ChangeProduct:
          this.handleChangeProduct(msg.content);
          break;
        case ProductMessageStatus.MoveUp:
        case ProductMessageStatus.MoveDown:
          if (msg.content.length !== 2 && !this.products.length) {
            return;
          }
          this.handleMoveProduct(msg.content);
          break;
        default:
          break;
      }

      // 经过上面的处理后重新处理一次当前的商品数组
      this.products = this.handleProducts(this.products);
      this.checkBrowseProduct();
    },

    // 操作1 - 上架商品
    handleOnShelfProduct(data) {
      this.total++;
      const len = this.products.length;

      if (len === 0) {
        this.products.push(data);
        return;
      }
      // 上架的商品rank小于最后一个
      if (
        data.rank < this.products[len - 1].rank &&
        this.products.length > 10
      ) {
        this.isNoMore = false;
        return;
      }
      const newProducts = [data, ...this.products];
      newProducts.sort((good1, good2) => {
        return good1.rank > good2.rank ? -1 : 1;
      });
      this.products = newProducts;
    },

    // 操作2 - 下架商品
    // 操作3 - 删除商品
    handleOffShelfAndDel(data) {
      this.total--;
      this.products = this.products.filter(
        item => item.productId !== data.productId
      );
      // 滚动条消失时需要获取下一批数据，避免无法滚动
      this.$nextTick(() => {
        const productContent = this.$refs.productContent;
        if (!productContent) {
          return;
        }
        const canScroll = productContent.scrollHeight > productContent.clientHeight;
        if (!canScroll) {
          this.getProductList();
        }
      });
    },

    // 操作4 - 添加商品
    handleAddProduct(data) {
      if (data.status !== 1) return;
      this.total++;
      this.products.unshift(data);
    },

    // 操作5 - 修改商品
    handleChangeProduct(data) {
      const index = this.products.findIndex(
        item => item.productId === data.productId
      );
      // 在列表里，直接更新
      if (index !== -1) {
        const products = [...this.products];
        products[index] = data;
        this.products = products;
      }
    },

    // 操作6 - 上移商品
    // 操作7 - 下移商品
    handleMoveProduct(data) {
      let index1 = -1;
      let index2 = -1;
      for (let i = 0; i < this.products.length; i++) {
        const item = this.products[i];
        if (item.productId === data[0].productId) {
          index1 = i;
        }
        if (item.productId === data[1].productId) {
          index2 = i;
        }
        if (index1 !== -1 && index2 !== -1) {
          break;
        }
      }
      const isInProducts = index1 !== -1 || index2 !== -1;
      if (!isInProducts) {
        return;
      }
      const newList = this.handleProducts([...data, ...this.products]);
      this.products = newList;
    },
  },
};
