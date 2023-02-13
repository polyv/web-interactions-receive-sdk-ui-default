<template>
  <div id="tuwenContain" class="plv-demo-tuwen">
    <div class="plv-demo-tuwen-top">
      <button @click="changeType(1)">图文模式</button>
      <button @click="changeType(2)">图片模式</button>
      <div v-show="messageTotal > 0">
        <div class="plv-demo-tuwen-top__tip"> 共 {{ messageTotal }} 图文直播</div>
      </div>
    </div>
    <ia-tuwen
      ref="tuwen"
      class="plv-demo-tuwen-mobile"
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
import IaTuwen from '../../entry/tuwen/MobileTuwen';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  components: {
    IaTuwen
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
    // 监听 document 的滚动，实现分页加载。
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
  height: 600px;
  overflow-y: scroll;
}
.plv-demo-tuwen-top {
  margin-top: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .plv-demo-tuwen-tip {
    font-size: 12px;
    color: #aaa;
  }
}

</style>
