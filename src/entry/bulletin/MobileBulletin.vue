<template>
  <div class="plv-iar-mobile-bulletin-default">
    <bulletin-list
      v-if="poper === poperType.LIST"
      ref="bulletinList"
      :list="bulletinList"
      @lookover="onLookover"
      @scroll="onListScroll"
    />
    <bulletin-detail
      v-if="poper === poperType.DETAIL"
      :bulletin-data="curBulletinData"
    />
  </div>
</template>

<script>
import BulletinList from '../../components/bulletin/BulletinList.vue';
import BulletinDetail from '../../components/bulletin/BulletinDetail.vue';

import mixin from './mixin';
import { isIPhoneXSeries } from '@/assets/utils/browser';

export default {
  components: {
    BulletinList,
    BulletinDetail,
  },
  mixins: [mixin],
  data() {
    return {
      isIPhoneXSeries: isIPhoneXSeries(),
    };
  },
};
</script>
<style lang="scss">
.plv-iar-mobile-bulletin-default {
  height: 100%;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
