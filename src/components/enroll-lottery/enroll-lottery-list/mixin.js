
import basicMixin from '../../../assets/mixins/basic';
import { showToast } from '@/assets/utils/toast';
export default {
  mixins: [basicMixin],
  props: {
    // 抽奖ID
    lotteryId: {
      type: String,
      required: true
    },
    // 抽奖次数
    times: {
      type: [Number, String],
      required: true
    },
    // 奖品名称
    prize: {
      type: String,
      required: true
    },
    enrollLotterySdk: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      pageNumber: 1,
      totalPages: 12,
      search: '', // 关键字搜索
      list: [], // 中奖列表
      searchList: this.debounce(this.getList),
      isShowSearch: false,
      loading: false,
      loadError: false, // 加载失败不再请求
    };
  },

  watch: {
    search(newVal, oldVal) {
      if (newVal !== oldVal) this.searchList(1);
    }
  },

  mounted() {
    this.getList();
    this.getFullContainList();
    this.$nextTick(() => {
      this.$refs.enrollLotteryResultList.addEventListener('scroll', this.scrollHandle);
    });
  },

  beforeDestroy() {
    this.$refs.enrollLotteryResultList.removeEventListener('scroll', this.scrollHandle);
  },

  methods: {
    // 获取中奖列表，判断第一次获取数据不够铺满屏幕，则继续获取
    getFullContainList() {
      const scrollContainer = this.$refs.enrollLotteryResultList;
      let scrollHeight = scrollContainer.scrollHeight;
      let clientHeight = scrollContainer.clientHeight;
      // 判断获取的数据是否超过容器高度，没超过则继续获取
      const timer = setInterval(() => {
        scrollHeight = scrollContainer.scrollHeight;
        clientHeight = scrollContainer.clientHeight;
        if (this.pageNumber >= this.totalPages) {
          clearInterval(timer);
        } else if (!this.loading && !this.loadError) {
          this.pageNumber += 1;
          this.getList();
          if (scrollHeight > clientHeight) {
            clearInterval(timer);
          }
        }
      }, 1000);
    },
    async getList(pages) {
      if (pages) this.pageNumber = pages;
      const { lotteryId, times, pageNumber, search } = this;
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.loadError = false;
      const params = {
        lotteryId,
        times: times,
        pageNumber,
        search,
        pageSize: 20
      };
      try {
        const res = await this.enrollLotterySdk.getWinnerList(params);
        const { contents, totalPages, totalItems } = res.data;
        this.list = pageNumber === 1 ? contents : [...this.list, ...contents];
        this.totalPages = totalPages;
        if (!this.isShowSearch && totalItems > 9) {
          this.isShowSearch = true;
        }
      } catch (e) {
        this.loadError = true;
        const errorMessage = (e.data && e.data.error && e.data.error.desc) || e.toString();
        showToast({
          text: errorMessage
        });
      } finally {
        this.loading = false;
      }
    },

    // 向下加载更多
    scrollHandle() {
      const el = this.$refs.enrollLotteryResultList;
      const scrollTop = el.scrollTop;
      const clientHeight = el.clientHeight;
      const scrollHeight = el.scrollHeight;
      const { pageNumber, totalPages } = this;
      if (scrollTop + clientHeight >= parseInt((scrollHeight / 2), 10) && pageNumber < totalPages) {
        this.pageNumber += 1;
        this.getList();
      }
    },

    replacePhone(phone) {
      const reg = /^(\d{3})\d{4}(\d{4})$/;
      return phone.replace(reg, '$1****$2');
    },

    debounce(fn, time = 300) {
      let timer = null;
      return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...args), time);
      };
    }
  }
};
