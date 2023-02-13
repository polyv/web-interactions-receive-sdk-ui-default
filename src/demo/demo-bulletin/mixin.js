import { Announcement } from '@polyv/interactions-receive-sdk';
import { I18n } from '@/assets/locale/locale';
import langs from '../../assets/locale/lang/bulletin';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },
  data() {
    return {
      // 公告 SDK 实例
      announcementSdk: null,
      // title
      bulletinTitle: '公告列表',
      // 是否展示公告
      isShowbulletin: false,
      // 是否显示返回按钮
      hasBackBtn: false,
      // 是否显示公告列表入口
      hasShowListBtn: false,
      // 当前是否显示了列表
      isShowList: false,
      // 是否显示置顶公告
      isShowTop: false,
      // 置顶公告数据
      topData: undefined,
    };
  },
  created() {
    this.i18n = new I18n(langs);
    this.i18n.updateLocale(() => this.lang);
    this.announcementSdk = new Announcement();
  },
  [BEFORE_DESTROY]() {
    this.announcementSdk?.destroy();
    this.announcementSdk = null;
  },
  methods: {
    changeStatus(status) {
      this.status = status;
      this.bulletinTitle = this.i18n.trans('bulletin.title');
    },

    setModalVisible(visible) {
      this.isShowbulletin = visible;
    },

    onModalClosed() {
      this.setModalVisible(false);
      if (!this.isShowList) {
        // 标记已读，下次收到同个公告不弹出
        this.$refs.bulletin && this.$refs.bulletin.markAnnounceReaded();
      }
    },

    onModalRerurn() {
      this.hasBackBtn = false;
      this.showBulletinList();
    },

    onLookOverBullletin() {
      this.hasBackBtn = true;
    },

    showBulletinFromTop() {
      this.setModalVisible(true);
      this.hasShowListBtn = true;
    },

    showBulletinFromSocket() {
      this.setModalVisible(true);
      this.hasShowListBtn = true;
      this.hasBackBtn = false;
      this.isShowList = false;
    },

    // 显示公告列表
    onShowBulletinList() {
      this.isShowList = true;
    },

    // webview 下调用toLink方法
    toLink(url) {
      console.log('toLink', url);
    },

    showBulletinList() {
      this.setModalVisible(true);
      this.isShowList = true;
      this.hasShowListBtn = false;
      this.hasBackBtn = false;
      this.$refs.bulletin && this.$refs.bulletin.showBulletinList();
    },

    showTopBulletinDetail(data) {
      this.setModalVisible(true);
      this.hasShowListBtn = true;
      this.$refs.bulletin && this.$refs.bulletin.showBulletinDetail(data);
    },

    onClickListBtn() {
      this.hasShowListBtn = false;
      this.showBulletinList();
    },

    showTopBulletin(data) {
      console.info('>>>showTopBulletin:', data);
    },

    onTitleChange(title) {
      const titles = {
        list: '公告列表',
        detail: '公告',
      };
      this.bulletinTitle = titles[title] || titles.detail;
    }
  }
};
