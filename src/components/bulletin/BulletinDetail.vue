<template>
  <div class="plv-iar-bulletin__detail">
    <div class="plv-iar-bulletin__detail__user">
      <div class="plv-iar-bulletin__detail__user__inner">
        <img :src="bulletinData.pic" />
        <div>
          <p class="plv-iar-bulletin__detail__user__nick">{{ bulletinData.actor ? bulletinData.actor + '-' : '' }}{{ bulletinData.nick }}</p>
          <p class="plv-iar-bulletin__detail__publish-time">{{ iarTrans('bulletin.issuedOn') + convertTime(bulletinData.createTime) }}</p>
        </div>
        <slot name="header"></slot>
      </div>
    </div>
    <div class="plv-iar-bulletin__detail__content" v-html="bulletinData.content"></div>
  </div>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
  props: {
    bulletinData: {
      type: Object,
      default: null
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/basic.scss';

.plv-iar-bulletin__detail {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.plv-iar-bulletin__detail__user {
  position: relative;
  padding: 16px 24px 8px;
}
.plv-iar-bulletin__detail__user__inner {
  position: relative;
  padding-left: 36px;
  font-size: 12px;
  line-height: 17px;
  height: 32px;
  >img {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
.plv-iar-bulletin__detail__user__nick {
  font-weight: 500;
  color: #333;
  margin: 0;
}
.plv-iar-bulletin__detail__publish-time {
  color: #8D8D8D;
  margin: 0;
}
.plv-iar-bulletin__detail__content {
  flex-grow: 1;
  overflow: auto;
  padding: 0 24px;
  font-size: 14px;
  color: #333;
  @include scrollbar();
  img {
    max-width: 100%;
  }
  * {
    padding: revert;
    margin: revert;
    // font-size: initial;
    // color: initial;
    word-break: break-word;
    line-height: 22px;
  }
}
</style>
