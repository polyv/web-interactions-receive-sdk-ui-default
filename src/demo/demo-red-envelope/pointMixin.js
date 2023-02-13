import { RedEnvelope } from '@polyv/interactions-receive-sdk';

export default {
  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },

  data() {
    return {
      // 红包 SDK 实例
      redEnvelopeSdk: null,
      isShowResult: true
    };
  },

  created() {
    this.redEnvelopeSdk = new RedEnvelope();
  },

  mounted() {
    // 是否有延时红包
  },

  watch: {
    redEnvelopeSdk: {
      immediate: true,
      handler() {
      }
    },
  },

  methods: {

  },
};
