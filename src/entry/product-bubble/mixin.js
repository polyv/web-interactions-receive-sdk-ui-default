import productBaseMixin from '../../components/product/base-mixin';
import styleMixin from './style-mixin';

export default {
  mixins: [productBaseMixin, styleMixin],

  data() {
    return {
      good: undefined,
      // 气泡外层是否显示
      wrapVisible: false,
      // 气泡是否显示
      bubbleVisible: false,
    };
  },

  watch: {
    productSdk: {
      immediate: true,
      handler() {
        this.listenSdkEvent();
      },
    },
  },

  methods: {
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

      if (status === ProductMessageStatus.PushProduct) {
        this.handleBubbleVisible(msg.content);
        return;
      }

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
          this.handleMoveProduct(msg.content);
          break;
        default:
          break;
      }
    },

    /** 当前显示的气泡序号递增 */
    addNumber() {
      if (!this.good) return;
      this.$set(this.good, 'showId', this.good.showId + 1);
    },
    /** 当前显示的气泡序号递减 */
    reduceNumber() {
      if (!this.good) return;
      this.$set(this.good, 'showId', this.good.showId - 1);
    },

    // 操作1 - 上架商品
    handleOnShelfProduct(data) {
      if (!this.good) return;
      if (data.rank < this.good.rank) {
        this.addNumber();
      }
    },

    // 操作2 - 下架商品
    // 操作3 - 删除商品
    handleOffShelfAndDel(data) {
      if (!this.good) return;
      if (data.productId === this.good.productId) {
        this.close();
      }
      if (data.rank > this.good.rank) {
        this.addNumber();
      } else {
        this.reduceNumber();
      }
    },

    // 操作4 - 添加商品
    handleAddProduct(data) {
      if (!this.good) return;
      if (data.status !== 1) return;
      this.reduceNumber();
    },

    // 操作5 - 编辑商品
    handleChangeProduct(data) {
      if (!this.good) return;
      if (data.productId === this.good.productId) {
        this.good = data;
      }
    },

    // 操作6 - 上移商品
    // 操作7 - 下移商品
    handleMoveProduct(data) {
      if (!this.good) return;
      const findIndex = data.findIndex(
        item => item.productId === this.good.productId
      );
      if (findIndex === -1) {
        return;
      }
      this.good = data[findIndex];
    },

    // 操作9 - 推送消息
    handleBubbleVisible(data) {
      this.$emit('product-push', data);
      this.good = data;
      this.wrapVisible = true;
      this.$nextTick(() => {
        this.bubbleVisible = true;
      });
    },

    close() {
      this.bubbleVisible = false;
    },

    handleAfterLeave() {
      this.wrapVisible = false;
      this.good = undefined;
    },
  }
};
