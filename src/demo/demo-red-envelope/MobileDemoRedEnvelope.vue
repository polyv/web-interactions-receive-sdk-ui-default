<!-- 红包移动端 demo -->

<template>
  <div>
    <button type="button" @click="test2SocketRedEnvelope">测试实时红包</button>
    <!-- 聊天列表红包消息组件内容 -->
    <div v-show="redpackBar" class="plv-iar-demo-redpack-list">
      <red-envelope-entrance
        v-for="item in redEnvelopeEntranceData"
        :key="item.id"
        :red-envelope-sdk="redEnvelopeSdk"
        :red-envelope-data="item"
        :open-id="openId"
        :lang="lang"
        :custom-img-config="customImgConfig"
        @open="handleClickEntrance"
      />
    </div>
    <!-- 红包组件内容 -->
    <red-envelope
      :red-envelope-sdk="redEnvelopeSdk"
      :red-envelope-data="redEnvelopeData"
      unit="波豆"
      :open-id="openId"
      :with-draw-enabled="true"
      :lang="lang"
      redirect-url="www.baidu.com"
      :is-full-screen="isFullScreen"
      @close="handleCloseRedEnvelope"
      @statusChange="handleStatusChange"
      @click-withdraw="handleClickWidthdraw"
      @click-point-record="handleClickPoint"
    />
    <!-- 红包挂件内容 -->
    <template v-if="autoToggle">
      <red-envelope-pendant
        :lang="lang"
        :auto-toggle="autoToggle"
        :red-envelope-sdk="redEnvelopeSdk"
        @visible-changed="handleRedEnvelopePendantVisibleChanged"
      />
    </template>
    <template v-else>
      <red-envelope-pendant
        v-if="showPendant"
        :lang="lang"
        :type="redEnvelopeDelayData.type || redEnvelopeDelayData.redpackType"
        :time="redEnvelopeDelayData.delayTime"
        @end="handleCountDownEnd"
      />
    </template>
    <!-- 红包雨 -->
    <demo-redpack-rain ref="readpackRainEntrance" :custom-img-config="customImgConfig" />
  </div>
</template>

<script>
import RedEnvelopeComp from '../../entry/red-envelope/MobileRedEnvelope';
import RedEnvelopeEntrance from '../../entry/red-envelope/RedEnvelopeEntrance';
import RedEnvelopePendant from '../../entry/red-envelope/RedEnvelopePendant';
import DemoRedpackRain from '../demo-redpack-rain/MobileDemoRedpackRain.vue';
import mixin from './mixin';

export default {
  components: {
    'red-envelope': RedEnvelopeComp,
    RedEnvelopeEntrance,
    RedEnvelopePendant,
    DemoRedpackRain
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
.plv-iar-red-envelope__pendant {
  margin: 0 auto;
}
</style>
