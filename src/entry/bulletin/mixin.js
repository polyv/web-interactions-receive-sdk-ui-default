import { interceptLink } from '@/assets/utils/utils';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
import publicMixin from './public-mixin';

const POPRT_TYPE = {
  LIST: 'list',
  DETAIL: 'detail',
};

export default {
  mixins: [publicMixin],

  props: {
    isWebView: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // 是否可见
      visible: false,
      // 公告id
      id: '',
      // 公告内容
      content: '',
      requireEnd: true,
      bulletinList: [],
      // 列表顺序为倒序，加载下一页需要传当前列表中createTime最小值到score
      score: undefined,
      // 是否有更多的公告
      hasMoreBulletin: true,
      // 弹窗类型
      poperType: POPRT_TYPE,
      // 当前弹窗类型
      poper: undefined,
      curBulletinData: undefined,
      // 公告是否来自socket消息
      fromSocket: false,
      // 公告是否来自列表点击
      fromList: false,
      // 是否在公告详情面板显示公告列表入口
      showListEntrance: false,
    };
  },

  watch: {
    announcementSdk: {
      immediate: true,
      handler(nv) {
        if (nv) {
          this.getBulletinList();
          this.bindAppEvents();
        } else {
          this.unbindAppEvents();
        }
      },
    },
    poper(nv) {
      this.$emit('title-change', nv);
    },
    content: {
      handler() {
        // this.initContent();
      },
    },
  },

  [BEFORE_DESTROY]() {
    this.unbindAppEvents();
  },

  methods: {
    // 标记公告已读
    markAnnounceReaded() {
      this.announcementSdk.markCurReaded();
    },
    async getBulletinList(score) {
      this.requireEnd = false;
      try {
        const res = await this.announcementSdk.getBulletinList(score);
        const list = res.data.list.map(item => {
          const temp = JSON.parse(item);
          temp.pic = this.setUserPic(temp.pic);
          return temp;
        });
        this.bulletinList = score ? this.bulletinList.concat(list) : list;
        this.score = list[list.length - 1]?.createTime;
        this.hasMoreBulletin = list.length >= 10;
      } catch (error) {
        console.error(error);
      }
      this.requireEnd = true;
    },
    onListScroll(isBottom) {
      if (isBottom && this.requireEnd && this.hasMoreBulletin) {
        this.getBulletinList(this.score);
      }
    },
    getBulletinIndexById(id) {
      return this.bulletinList.findIndex(item => item.id === id);
    },
    onLookover(id) {
      const index = this.getBulletinIndexById(id);
      this.curBulletinData = this.bulletinList[index] || {};
      this.fromList = true;
      this.fromSocket = false;
      this.showListEntrance = false;
      this.poper = POPRT_TYPE.DETAIL;
      this.$emit('look-over');
    },
    onBulletinDetailClose() {
      if (this.fromSocket) {
        this.poper = undefined;
        this.markAnnounceReaded();
        this.$emit('hide');
      } else {
        this.poper = POPRT_TYPE.LIST;
      }
      this.curBulletinData = undefined;
      this.fromSocket = false;
      this.fromList = false;
    },
    initContent() {
      const html = this.content || this.iarTrans('bulletin.none');
      if (this.$refs.bulletinContent) {
        this.$refs.bulletinContent.innerHTML = html;
      }
      // isWebView 为 true 时，给a标签绑定点击事件
      interceptLink(this.$refs.bulletinContent, this.isWebView, (href, target) => {
        this.$emit('to-link', {
          href,
          target
        });
      });
    },

    // 收到公告消息
    async onBulletin(msg) {
      msg.pic = this.setUserPic(msg.pic);
      // 如果当前正在查看弹窗公告，如果新的公告是弹窗或置顶类型的公告，那么需要隐藏现有的弹窗公告
      if (this.fromSocket && (msg.isPop === 1 || msg.isTop === 1)) {
        this.poper = undefined;
        this.$emit('hide');
      }
      const index = this.getBulletinIndexById(msg.id);
      if (index !== -1) {
        this.bulletinList.splice(index, 1);
      }
      this.bulletinList.unshift(msg);

      if (this.isReaded(msg)) return;
      if (msg.isPop === 1) {
        this.fromSocket = true;
        this.curBulletinData = msg;
        this.poper = POPRT_TYPE.DETAIL;
        this.$emit('show-detail-from-socket', msg);
      }
    },

    // 移除公告消息
    onRemoveBulletin(msg) {
      if (this.fromSocket === true && this.curBulletinData && this.curBulletinData.id === msg.id) {
        this.$emit('hide', null);
      }
      const index = this.getBulletinIndexById(msg.id);
      if (index !== -1) {
        this.bulletinList.splice(index, 1);
      }
    },

    onReturnList() {
      this.poper = POPRT_TYPE.LIST;
      this.fromSocket = false;
      this.$emit('show-list');
    },

    // 显示列表
    showBulletinList() {
      this.fromSocket = false;
      this.poper = POPRT_TYPE.LIST;
    },

    // 显示公告详情
    showBulletinDetail(data) {
      this.curBulletinData = data;
      this.showListEntrance = true;
      this.poper = POPRT_TYPE.DETAIL;
    },
  }
};
