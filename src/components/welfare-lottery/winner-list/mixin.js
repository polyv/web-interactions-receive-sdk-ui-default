/**
 * @file
 * 中奖名单组件 mixin
 */
import throttle from 'lodash-es/throttle';
import mixin from '../mixin';

export default {
  mixins: [mixin],

  props: {
    // 抽奖SDK
    sdk: {
      type: Object,
      default: null,
    },
    // 抽奖ID
    lotteryId: {
      type: String,
    }
  },

  data() {
    return {
      // 当前页码
      pageNumber: 0,
      // 总页码
      totalPages: 1,
      // 中奖者分行列表
      winnerGroups: [],
      // 上次滚动scrollTop
      lastScrollTop: null,
      // 是否加载中
      isLoading: false,
    };
  },

  mounted() {
    this.getWinnersList();
  },

  methods: {
    async getWinnersList(params = {}) {
      const pageNumber = params.pageNumber || this.pageNumber + 1;
      if (pageNumber > this.totalPages || this.isLoading) {
        return;
      }

      let data = null;
      this.isLoading = true;
      try {
        data = await this.sdk.getWinnersList({
          pageNumber,
          lotteryId: this.lotteryId,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        this.isLoading = false;
      }

      if (data) {
        this.pageNumber = data.pageNumber;
        this.totalPages = data.totalPages;
        this.winnerGroups = this.winnerGroups.concat(this.setArrGroup(data.contents));
        if (this.$refs.container) {
          // PC 端更新容器组件样式
          this.$refs.container.updateBorderStatus();
        }
      }
    },

    // 将数组进一步整理成n个一组
    setArrGroup(arr = [], groupLen = 3) {
      const groups = [];
      arr.forEach((item, index) => {
        let group;
        if (groups.length > 0) {
          group = groups[groups.length - 1];
        } else {
          groups.push([]);
          group = groups[0];
        }
        if ((index + 1) % groupLen === 0) {
          group.push(item);
          if (index + 1 < arr.length) {
            groups.push([]);
          }
        } else {
          group.push(item);
        }
      });
      return groups;
    },

    onClickBack() {
      this.$emit('back');
    },

    onScroll: throttle(function(e) {
      const $el = e.target;
      // 下滑
      if (this.lastScrollTop &&
        $el.scrollTop - this.lastScrollTop > 0 &&
        $el.scrollHeight - $el.clientHeight - $el.scrollTop <= 100
      ) {
        this.getWinnersList();
      }
      this.lastScrollTop = $el.scrollTop;
    }, 500),
  },
};
