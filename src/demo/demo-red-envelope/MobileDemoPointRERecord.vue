<template>
  <div class="plv-demo-point-re-record-default">
    <button @click="isShowResult = true"> 打开积分记录 </button>
    <template v-if="isShowResult">
      <modal
        :visible="isShowResult"
        title="积分记录"
        :modal-style="{
          height: 'auto',
          position: 'absolute',
          bottom: '0',
        }"
        @close="isShowResult = false"
      >
        <MobilePointRERecord :visible="isShowResult" :red-envelope-sdk="redEnvelopeSdk" unit="点" />
      </modal>
    </template>
  </div>
</template>

<script>
import MobilePointRERecord from '../../entry/red-envelope/MobilePointRERecord';
import Modal from '../demo-modal/MobileModal';
import pointMixin from './pointMixin';
export default {
  components: {
    MobilePointRERecord,
    Modal
  },
  mixins: [pointMixin]
};
</script>

<style lang="scss">
.plv-demo-point-re-record-default {
  width: 100%;
}
</style>
