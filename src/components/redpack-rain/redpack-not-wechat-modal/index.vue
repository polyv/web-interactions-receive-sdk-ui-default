<template>
  <div class="plv-ia-c-redpack-rain-notwechat-modal">
    <redpack-rain-modal
      :visible="visible"
      :show-top-bg="false"
      :custom-img-config="customImgConfig"
      @close="$emit('close')"
    >
      <div class="plv-ia-c-redpack-rain-notwechat-modal__main">
        <div class="plv-ia-c-redpack-rain-notwechat-modal__teacher">
          <teacher
            :nickname="nickname"
            :avatar="avatar"
          />
        </div>
        <p class="plv-ia-c-redpack-rain-notwechat-modal__blessings">{{ greeting }}</p>
        <p class="plv-ia-c-redpack-rain-notwechat-modal__tips">{{ iarTrans('redpackRain.openInWechat') }}</p>
        <div ref="copyBtn" class="plv-ia-c-redpack-rain-notwechat-modal__btn">
          <redpack-btn>{{ iarTrans('redpackRain.copyLink') }}</redpack-btn>
        </div>
      </div>
    </redpack-rain-modal>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
import Modal from '../redpack-rain-modal';
import Teacher from '../teacher-info';
import Button from '../redpack-btn';
import ClipboardJs from 'clipboard';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  components: {
    RedpackRainModal: Modal,
    Teacher,
    RedpackBtn: Button,
  },

  mixins: [basicMixin],

  props: {
    status: {
      type: String,
      default: '',
    },

    allStatus: {
      type: Object,
      default: () => ({})
    },

    nickname: {
      type: String,
      default: '',
    },

    avatar: {
      type: String,
      default: '',
    },

    greeting: {
      type: String,
      default: '',
    },

    watchUrl: {
      type: String,
      default: '',
    },

    redirectUrl: {
      type: String,
      default: ''
    },
    customImgConfig: {
      type: [Object, null],
      default: null
    }

  },
  data() {
    return {
      clipboardJs: null
    };
  },

  computed: {
    visible() {
      return this.status === this.allStatus.showNotWechat;
    },
  },

  mounted() {
    this.initClipBoardJs();
  },

  [BEFORE_DESTROY]() {
    this.clipboardJs && this.clipboardJs.destroy();
  },

  methods: {
    initClipBoardJs() {
      this.clipboardJs = new ClipboardJs(this.$refs.copyBtn, {
        text: () => {
          return this.redirectUrl || this.watchUrl;
        },
      });

      this.clipboardJs.on('success', this.copySuccess);
    },

    copySuccess() {
      this.$emit('copy-success');
    },
  },
};
</script>

<style lang="scss" scoped>
.plv-ia-c-redpack-rain-notwechat-modal__main {
  text-align: center;
}
.plv-ia-c-redpack-rain-notwechat-modal__teacher {
  position: absolute;
  top: -32px;
  left: 0;
  width: 100%;
}
.plv-ia-c-redpack-rain-notwechat-modal__blessings {
  color: #FCEEBC;
  padding: 84px 0 32px;
  font-size: 20px;
}
.plv-ia-c-redpack-rain-notwechat-modal__tips {
  margin-bottom: 8px;
  color: #FCEEBC;
}
.plv-ia-c-redpack-rain-notwechat-modal__btn {
  width: 233px;
  margin: 0 auto;
  padding-bottom: 24px;
}
</style>
