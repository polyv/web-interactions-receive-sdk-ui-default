<template>
  <module-container
    class="plv-iar-module-container--bulletin"
    :max-body-height="poper === poperType.LIST ? 350 : 275"
  >
    <bulletin-list
      v-show="poper === poperType.LIST"
      ref="bulletinList"
      :list="bulletinList"
      @lookover="onLookover"
      @scroll="onListScroll"
    />
    <bulletin-detail
      v-if="poper === poperType.DETAIL"
      :bulletin-data="curBulletinData"
    >
      <template #header>
        <a v-if="fromSocket || showListEntrance" class="plv-iar-bulletin__return-list" @click="onReturnList">{{ iarTrans('bulletin.list') }}&gt;</a>
      </template>
    </bulletin-detail>
    <template v-if="poper === poperType.DETAIL && (fromSocket || fromList)" #footer>
      <div class="plv-iar-pc-bulletin-default__footer">
        <iar-button @click="onBulletinDetailClose">{{ iarTrans(fromSocket ? 'bulletin.close' : 'bulletin.return') }}</iar-button>
      </div>
    </template>
  </module-container>
</template>

<script>
import IarButton from '../../components/common/button/PcButton';
import ModuleContainer from '../../components/common/module-container/PcModuleContainer';
import BulletinList from '../../components/bulletin/BulletinList.vue';
import BulletinDetail from '../../components/bulletin/BulletinDetail.vue';
import mixin from './mixin';

export default {
  components: {
    BulletinList,
    BulletinDetail,
    IarButton,
    ModuleContainer,
  },
  mixins: [mixin],

};
</script>
<style lang="scss">
.plv-iar-pc-bulletin-default__footer {
  padding: 17px 0 24px;
  text-align: center;
}
.plv-iar-module-container--bulletin {
  .plv-iar-module-container-default__body {
    overflow: hidden;
    >div {
      height: 100%;
    }
  }
}
.plv-iar-bulletin__return-list {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  color: #2196F3;
  cursor: pointer;
}
</style>
