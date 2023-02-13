<template>
  <div class="plv-iar-mobile-announcement-default">
    <div class="plv-iar-mobile-announcement-default__wrap">
      <div ref="announcementContent" class="plv-iar-mobile-announcement-content"></div>
    </div>
    <div
      class="plv-iar-mobile-announcement-default__btn__wrap"
      :style="{
        paddingBottom: `${isIPhoneXSeries ? 34 : 20}px`,
      }"
    >
      <iar-button
        @click="onClickKnow"
      >
        {{ iarTrans('announcement.know') }}
      </iar-button>
    </div>
  </div>
</template>

<script>
import IarButton from '../../components/common/button/MobileButton';

import mixin from './mixin';
import announcementMixin from './announcement-mixin';
import { isIPhoneXSeries } from '../../assets/utils/browser';

export default {
  components: {
    IarButton,
  },
  mixins: [mixin, announcementMixin],
  data() {
    return {
      isIPhoneXSeries: isIPhoneXSeries(),
    };
  },
};
</script>
<style lang="scss" scoped>
.plv-iar-mobile-announcement-default {
  height: 100%;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.plv-iar-mobile-announcement-content {
  box-sizing: border-box;
  line-height: 1.5;
  overflow-y: auto;
  word-break: break-word;
  color: #2c3e50;
}
.plv-iar-mobile-announcement-default__btn__wrap {
  margin-top: 20px;
  text-align: center;
  padding: 0 24px;
  box-sizing: border-box;
  width: 100%;
}
.plv-iar-mobile-announcement-default__wrap {
  padding: 20px 24px 0;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  flex: 1;
}
</style>
