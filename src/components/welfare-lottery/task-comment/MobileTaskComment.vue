<template>
  <modal-gift-box
    class="plv-iar-welfare-lottery__task__wrap"
    @close="handleClose"
  >
    <template #header>
      <span class="plv-iar-welfare-lottery__task__record-btn" @click="handleRecord">{{ iarTrans('welfareLottery.record') }}</span>
    </template>
    <template #body>
      <task-detail
        :prize="prize"
      >
        <div class="plv-iar-welfare-lottery__invitation__task">
          {{ iarTrans('welfareLottery.commentLabel') }}<span class="plv-iar-welfare-lottery__invitation__numbers">{{ prize.comment }}</span>
        </div>
      </task-detail>
      <div class="plv-iar-welfare-lottery__task__btn-group">
        <welfare-lottery-btn
          :disabled="isCompleted"
          @click="handleClick"
        >
          {{ iarTrans(btnText) }}
        </welfare-lottery-btn>
      </div>
    </template>
  </modal-gift-box>
</template>

<script>
import ModalGiftBox from '../modal-gift-box/MobileModalGiftBox.vue';
import TaskDetail from '../task-detail';
import WelfareLotteryBtn from '../btn.vue';
import mixin from './mixin';

export default {
  components: {
    ModalGiftBox,
    TaskDetail,
    WelfareLotteryBtn,
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
@import '../task-public/base.scss';
</style>
