import entry from '../../assets/mixins/entry';
import langs from '../../assets/locale/lang/tuwen';
import { DESTROYED } from '@/assets/utils/compat';

export default {
  langs,
  mixins: [entry],
  data() {
    return {
      noMore: false,
      loading: false, // 加载中
      loadError: false, // 接口异常 加载失败
      isFetch: true, // 接口异常后，禁止请求
      isWindowScroll: false, // 判断容器是否在body下滚动
      // 消息流数据
      messageTotal: 0,
      messages: [],
      topMessages: [], // 置顶消息
      userInfo: {}, // 主持人信息
      showPreview: false, // 展示预览图
      previewIndex: null,
      previewTips: '', // 预览提示
      previewTipsTimer: null
    };
  },
  props: {
    tuwenSdk: {
      type: Object,
      default: () => {}
    },
    // 监听的容器id, 默认监听body
    scrollContainer: {
      type: String,
      default: ''
    },
    // 触发加载的距离阈值
    scrollDistance: {
      type: Number,
      default: 200
    },
    // 展示模式：1为图文，2为图片
    mode: {
      type: Number,
      default: 1
    },
    // 是否开启预览图功能
    disablePreview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    previewImgs() {
      let list = [];
      this.topMessages.forEach(item => {
        list = list.concat(item.images);
      });
      this.messages.forEach(item => {
        if (item.top === 'N') {
          list = list.concat(item.images);
        }
      });
      return list;
    }
  },
  watch: {
    previewTips(tips) {
      if (!tips) { return; }
      if (this.previewTipsTimer) { clearTimeout(this.previewTipsTimer); }
      this.previewTipsTimer = setTimeout(() => {
        this.previewTips = '';
      }, 2000);
    },
    tuwenSdk: {
      immediate: true,
      handler() {
        this.bindAppEvents();
        this.getTuwenInfo();
      },
    },
    mode: {
      async handler(val) {
        this.more = false;
        const type = val === 2 ? 'Y' : 'N';
        await this.tuwenSdk.changeMessageType(type);
        type === 'Y' && this.getNextList();
      }
    },
    messageTotal: {
      handler(val) {
        this.$emit('change-message-total', val);
      },
      immediate: true
    }
  },
  methods: {
    /** 监听聊天室socket事件 */
    bindAppEvents() {
      const tuwenSdk = this.tuwenSdk;
      if (!tuwenSdk) { return; }
      this.tuwenSdk.bindSocketIOEvents();
      this.tuwenSdk
        .on(this.tuwenSdk.events.EDIT_STICKY, ({ messageIndex, content }) => { this.messages.splice(messageIndex, 1, content); })
        .on(this.tuwenSdk.events.SET_USER_INFO, () => { this.userInfo = this.tuwenSdk.masterUserInfo; })
        .on(this.tuwenSdk.events.DELETE, () => { this.messageTotal = this.tuwenSdk.total; })
        .on(this.tuwenSdk.events.CREATE, () => { this.messageTotal = this.tuwenSdk.total; })
        // 监听 socket 事件
        .on(this.tuwenSdk.socketIOEvents.RECONNECT, () => {
          // 每次重连，清空消息列表重新获取
          this.reconnectGetMessage();
        });
    },
    // 重新获取消息
    async resetMessageList() {
      // 每次重连，清空消息列表重新获取
      this.messageTotal = [];
      this.messages = [];
      this.topMessages = [];
      this.noMore = false;
      this.loadError = false;
      this.isFetch = true;
      this.tuwenSdk.clearMessageList();
      await this.getTuwenInfo();
      this.$nextTick(() => {
        this.getFullContainMessage();
      });
    },

    getNextList() {
      const lastItem = this.messages.slice(-1);
      if (!this.noMore && lastItem.length !== 0) this.getTuwenInfo(lastItem[0].id);
    },

    /** 获取图文直播基础信息 */
    async getTuwenInfo(startId = '') {
      if (this.loading || !this.isFetch) return;
      this.loading = true;
      this.noMore = false;
      let result;
      try {
        result = await this.tuwenSdk.getTuwenInfo(startId);
        this.messageTotal = this.tuwenSdk.total;
        this.userInfo = this.tuwenSdk.masterUserInfo;
        this.messages = this.tuwenSdk.messages;
        this.topMessages = this.tuwenSdk.topMessages;
      } catch (err) {
        console.error(err);
        this.loading = false;
        this.loadError = true;
        this.isFetch = false;
        this.initPullUpListener();
      } finally {
        // 滚动加载判断，最后一页停止加载
        if (!result.data.contents || result.data.contents.length === 0) {
          this.noMore = true;
        }
        this.loading = false;
      }
    },
    // 监听向上滚动
    initPullUpListener() {
      if (this.isWindowScroll) {
        window.addEventListener('scroll', this.windowPullUpListener);
      } else {
        if (!this.scrollContainer) return;
        const container = document.getElementById(this.scrollContainer);
        if (!container) throw new Error(`Don't find element: ${this.scrollContainer}`);
        container.addEventListener('scroll', this.domPullUpListener);
      }
    },
    // 容器滚动
    domPullUpListener(e) {
      const target = e.target;
      const viewH = target.clientHeight;
      const contentH = target.scrollHeight; // 内容高度
      const scrollTop = target.scrollTop;
      if (contentH - viewH - scrollTop > this.scrollDistance) { // 到达底部100px时,加载新内容
        this.loadError = false;
        this.isFetch = true;
        window.removeEventListener('scroll', this.domPullUpListener);
      }
    },
    // body下滚动
    windowPullUpListener(e) {
      const target = e.target.documentElement;
      const viewH = target.clientHeight;
      const contentH = target.scrollHeight; // 内容高度
      const scrollTop = target.scrollTop;
      if (contentH - viewH - scrollTop > this.scrollDistance) { // 滚动距离底部阈值，可重新滚动加载
        this.loadError = false;
        this.isFetch = true;
        window.removeEventListener('scroll', this.windowPullUpListener);
      }
    },

    handleClickPicture(val) {
      this.previewIndex = this.previewImgs.findIndex(url => url === val);
      if (!this.disablePreview) {
        this.showPreview = true;
      }
      this.$emit('show-preview', { images: this.previewImgs, index: this.previewIndex });
    },
    closePreviewImg() {
      this.previewIndex = null;
      this.showPreview = false;
    },
    // 下一张预览图
    nextPreviewImg() {
      if (this.previewIndex >= this.previewImgs.length - 1) {
        this.previewTips = this.iarTrans('tuwen.tuwenLastImg');
        return;
      }
      this.previewIndex++;
    },

    // 上一张预览图
    prevPreviewImg() {
      if (this.previewIndex === 0) {
        this.previewTips = this.iarTrans('tuwen.tuwenFirstImg');
        return;
      }
      this.previewIndex--;
    },
    // 监听document 滚动后分页加载
    initScrollLister() {
      this.isWindowScroll = true;
      window.addEventListener('scroll', this.scrollHandler);
    },
    scrollHandler(e) {
      const target = e.target.documentElement;
      const viewH = target.clientHeight;
      const contentH = target.scrollHeight; // 内容高度
      const scrollTop = target.scrollTop;
      if (contentH - viewH - scrollTop <= this.scrollDistance) { // 到达底部100px时,加载新内容
        this.getNextList();
      }
    },

    reconnectGetMessage() {
      // 清空数据，重新获取
      this.resetMessageList();
    },
    // 判断容器获取数据没有铺满高度，继续获取
    getFullContainMessage() {
      if (!this.scrollContainer) return;
      const container = document.getElementById(this.scrollContainer);
      if (!container) {
        console.warn(new Error(`Don't find element: ${this.scrollContainer}`));
        return;
      }
      const scrollHeight = container.clientHeight;
      const tuwenContainHeight = this.$el.clientHeight;
      if (scrollHeight > tuwenContainHeight) {
        const timer = setInterval(() => {
          const scrollHeight = container.clientHeight;
          const tuwenContainHeight = this.$el.clientHeight;
          if (!this.loading) {
            this.getNextList();
            if (scrollHeight < tuwenContainHeight) {
              clearInterval(timer);
            }
          } else if (this.noMore) {
            clearInterval(timer);
          }
        }, 1000);
      }
    }
  },
  mounted() {
    this.getFullContainMessage();
    // 滚动监听
    if (this.scrollContainer) {
      const container = document.getElementById(this.scrollContainer);
      if (!container) {
        console.warn(new Error(`Don't find element: ${this.scrollContainer}`));
        return;
      }
      container.addEventListener('scroll', (e) => {
        const target = e.target;
        const viewH = target.clientHeight;
        const contentH = target.scrollHeight; // 内容高度
        const scrollTop = target.scrollTop;
        if (contentH - viewH - scrollTop <= this.scrollDistance) { // 到达底部100px时,加载新内容
          this.getNextList();
        }
      });
    }
  },
  [DESTROYED]() {
    window.removeEventListener('scroll', this.scrollHandler);
  }
};
