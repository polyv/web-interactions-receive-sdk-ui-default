<template>
  <modal-gift-box
    class="plv-iar-welfare-lottery__task__wrap"
    @close="handleClose"
  >
    <template #header>
      <span class="plv-iar-welfare-lottery__task__record-btn" @click="handleRecord">{{ iarTrans('welfareLottery.record') }}</span>
    </template>
    <template #body>
      <TaskWatchTime
        :prize="prize"
        :watched-time="watchedTime"
        :eligible="eligible"
        @lottery-callback="$emit('lottery-callback', $event)"
        @close="$emit('close', $event)"
        @record="$emit('record', $event)"
      />
    </template>
  </modal-gift-box>
</template>

<script>
import ModalGiftBox from '../modal-gift-box/MobileModalGiftBox.vue';
import mixin from './mixin';
import TaskWatchTime from './TaskWatchTime';

export default {
  components: {
    ModalGiftBox,
    TaskWatchTime,
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
@import '../task-public/base.scss';
</style>
