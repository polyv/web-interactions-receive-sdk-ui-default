<!-- 红包移动端 demo -->

<template>
  <div>
    <button type="button" @click="test2SocketRedEnvelope">测试实时红包</button>
    <!-- 聊天列表红包消息组件内容 -->
    <red-envelope-entrance
      v-for="item in redEnvelopeEntranceData"
      :key="item.id"
      :red-envelope-sdk="redEnvelopeSdk"
      :red-envelope-data="item"
      :lang="lang"
      :auto-width="true"
      @open="handleClickEntrance"
    />
    <!-- 红包组件内容 -->
    <red-envelope
      :red-envelope-sdk="redEnvelopeSdk"
      :red-envelope-data="redEnvelopeData"
      :cover-img="coverImg"
      :open-id="openId"
      :lang="lang"
      redirect-url="www.baidu.com"
      @close="handleCloseRedEnvelope"
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
        :type="redEnvelopeDelayData.type"
        :time="redEnvelopeDelayData.delayTime"
        :red-envelope-sdk="redEnvelopeSdk"
        @end="showPendant = false"
      />
    </template>
  </div>
</template>

<script>
import RedEnvelopeComp from '../../entry/red-envelope/PcRedEnvelope';
import RedEnvelopeEntrance from '../../entry/red-envelope/RedEnvelopeEntrance';
import RedEnvelopePendant from '../../entry/red-envelope/RedEnvelopePendant';
import mixin from './mixin';

export default {
  components: {
    'red-envelope': RedEnvelopeComp,
    RedEnvelopeEntrance,
    RedEnvelopePendant,
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
.plv-iar-red-envelope__pendant {
  margin: 0 auto;
}
</style>
