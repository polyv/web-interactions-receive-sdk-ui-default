<!-- 邀请任务移动端组件 -->
<template>
  <modal-gift-box
    class="plv-iar-welfare-lottery__task__wrap"
    @close="handleClose"
  >
    <template #header>
      <span class="plv-iar-welfare-lottery__task__record-btn" @click="handleRecord">{{ iarTrans('welfareLottery.record') }}</span>
    </template>
    <template #body>
      <button ref="copyBtn" type="button" class="plv-iar-welfare-lottery__copy-btn"></button>
      <task-detail
        :prize="prize"
      >
        <div class="plv-iar-welfare-lottery__invitation__task">
          {{ iarTrans('welfareLottery.invite') }}<span class="plv-iar-welfare-lottery__invitation__numbers">{{ prize.inviteNum }}</span>{{ iarTrans('welfareLottery.invite1') }}
          <template v-if="isCompleted">{{ iarTrans('welfareLottery.metConditions') }}</template>
          <template v-else>{{ iarTrans('welfareLottery.invite2') }}<span class="plv-iar-welfare-lottery__invitation__numbers">{{ prize.inviteNum - inviteCount }}</span>{{ iarTrans('welfareLottery.invite3') }}</template>
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
      <toast
        :visible="showCopySuccessTip"
        :text="iarTrans('welfareLottery.copySuccess')"
        @hidden="handleToastHidden"
      />
    </template>
  </modal-gift-box>
</template>

<script>
import ModalGiftBox from '../modal-gift-box/MobileModalGiftBox.vue';
import TaskDetail from '../task-detail';
import WelfareLotteryBtn from '../btn.vue';
import Toast from '../../common/toast/Toast.vue';
import mixin from './mixin';

export default {
  components: {
    ModalGiftBox,
    TaskDetail,
    WelfareLotteryBtn,
    Toast,
  },
  mixins: [mixin],
  computed: {
    btnText() {
      return this.isCompleted ?
        'welfareLottery.participated' :
        (this.isWeixin || this.inviteType === 'external' ? 'welfareLottery.participateNow' : 'welfareLottery.copyLinkToParticipate');
    },
  },
};
</script>
<style lang="scss">
@import '../task-public/base.scss';
</style>
