<!-- 卡片推送 pc 端 demo -->

<template>
  <div v-show="visible" class="plv-demo-push-card">
    <!-- 卡片推送组件内容 -->
    <push-card
      :lang="lang"
      :push-card-sdk="pushCardSdk"
      :countdown-auto-open="false"
      :internal="true"
      @entry-visible-changed="entryVisibleChanged"
      @open="onOpen"
    />
  </div>
</template>

<script>
import { PushCard } from '@polyv/interactions-receive-sdk';
import PushCardComp from '../../entry/push-card/MobilePushCard';

export default {
  components: {
    'push-card': PushCardComp,
  },

  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },

  data() {
    return {
      // 卡片推送 SDK 实例
      pushCardSdk: null,
      visible: false
    };
  },

  mounted() {
    this.pushCardSdk = new PushCard();
  },

  methods: {
    onOpen(data) {
      console.info('###on open:', data);
    },
    entryVisibleChanged(val) {
      console.info('entryVisibleChanged', val);
      this.visible = val;
    }
  }
};
</script>
<style lang="scss">
.plv-demo-push-card {
  position: absolute;
  top: 300px;
  right: 10px;
  // left: 10px;
  background-color: rgba(0, 0, 0, .8);
  .plv-iar-push-card__entrance {
    margin: 0 auto;
  }
  .plv-iar-push-card--contain {
    margin-left: auto;
  }
}
</style>
