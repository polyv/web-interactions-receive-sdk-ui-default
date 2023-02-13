<template>
  <div id="tuwenContain" class="plv-demo-tuwen">
    <button @click="changeType(1)">图文模式</button>
    <button @click="changeType(2)">图片模式</button>
    <div v-show="messageTotal > 0" class="plv-ia-tuwen-top">
      <div class="plv-ia-tuwen-top__tip"> 共 {{ messageTotal }} 图文直播</div>
    </div>
    <pc-tuwen
      ref="tuwen"
      scroll-container="tuwenContain"
      :tuwen-sdk="TuwenSdk"
      :mode="mode"
      :lang="lang"
      @change-message-total="changeMessageTotal"
    />
  </div>
</template>

<script>
import { Tuwen } from '@polyv/interactions-receive-sdk';
import PcTuwen from '../../entry/tuwen/PcTuwen';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  name: 'DemoPCTuwen',
  components: {
    PcTuwen
  },
  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },
  data() {
    return {
      // 图文直播 SDK 实例
      TuwenSdk: null,
      mode: 1,
      messageTotal: 0
    };
  },

  created() {
    this.TuwenSdk = new Tuwen();
  },
  mounted() {
    // this.$refs.tuwen.initScrollLister();
  },

  [BEFORE_DESTROY]() {
    this.destroy();
  },

  methods: {
    destroy() {
      this.TuwenSdk = null;
    },
    changeType(val) {
      this.mode = val;
    },
    changeMessageTotal(val) {
      this.messageTotal = val;
    }
  },
};

</script>

<style lang="scss">
.plv-demo-tuwen {
  padding: 0 16px;
  height: 1600px;
  overflow-y: scroll;
}
.plv-ia-tuwen-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 16px;
  .plv-ia-tuwen-tip {
    font-size: 12px;
    color: #aaa;
  }
}
</style>
