import ClipboardJs from 'clipboard';
import { isMobile, isWeixin } from '@polyv/utils/src/browser';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  data() {
    return {
      isMobile: isMobile(),
      isWeixin: isWeixin(),
      showCopySuccessTip: false,
    };
  },
  props: {
    prize: {
      type: Object,
      default: () => ({})
    },
    inviteCount: Number,
    watchUrl: String,
    inviteUrl: String,
    isShowCustomLottery: Boolean,
    linkSkipEnabled: Boolean,
  },
  computed: {
    isCompleted() {
      return this.inviteCount >= this.prize.inviteNum;
    },
    inviteType() {
      return this.prize.inviteType || 'poster';
    },
  },
  mounted() {
    this.initClipBoardJs();
  },
  methods: {
    initClipBoardJs() {
      this.clipboardJs = new ClipboardJs(this.$refs.copyBtn, {
        text: () => {
          return this.watchUrl;
        },
      });
      this.clipboardJs.on('success', this.copySuccess);
    },
    handleClick() {
      // 完成抽奖后，不能点击
      if (this.isCompleted) {
        return;
      }
      const obj = {
        type: 'setLottery'
      };
      this.$emit('lottery-callback', obj);
      // 是否显示自定义抽奖，如果是的话，将屏蔽sdk自带的流程，
      if (this.isShowCustomLottery) {
        this.handleClose();
        return;
      }
      // PC端打开，展示二维码
      if (!this.isMobile) {
        this.showQRCode = true;
        return;
      }
      if (this.isWeixin) {
        const iosVersion = this.getIosVersion();
        if (iosVersion && iosVersion <= 9) {
          alert('当前设备系统版本过低，请更新版本后重试');
          return;
        }
        // entryType: 进入类型，new表示从新版观看页进入，海报页不显示排行榜入口
        if (this.linkSkipEnabled) {
          window.location.href = this.inviteUrl;
        }
      } else {
        this.handleCopyLink();
      }
    },
    getIosVersion() {
      let ver = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      if (ver) {
        ver = parseInt(ver[1], 10);
        return ver;
      } else {
        return false;
      }
    },
    copySuccess() {
      this.showCopySuccessTip = true;
    },
    handleToastHidden() {
      this.showCopySuccessTip = false;
    },
    handleClose() {
      this.$emit('close');
    },
    handleRecord() {
      this.$emit('record');
    },
    handleCopyLink() {
      this.$refs.copyBtn.click();
    },
  }
};
