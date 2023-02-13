<!-- 邀请任务PC端组件 -->
<template>
  <modal-gift-box
    class="plv-iar-welfare-lottery__task__wrap"
    :class="{'plv-iar-welfare-lottery__task--qr-code': showQRCode}"
    @close="handleClose"
  >
    <template #header>
      <button ref="copyBtn" type="button" class="plv-iar-welfare-lottery__copy-btn"></button>
      <span v-if="showQRCode" class="plv-iar-welfare-lottery__modal__back-btn--white" @click="handleBack"></span>
      <span v-else class="plv-iar-welfare-lottery__task__record-btn" @click="handleRecord">{{ iarTrans('welfareLottery.record') }}</span>
    </template>
    <template v-if="showQRCode" #body>
      <div class="plv-iar-welfare-lottery__qr-code__pic">
        <img :src="qrCodeUrl" />
      </div>
      <div class="plv-iar-welfare-lottery__qr-code__text">{{ iarTrans('welfareLottery.scanToParticipate') }}</div>
      <div class="plv-iar-welfare-lottery__task__btn-group">
        <welfare-lottery-btn @click="handleCopyLink">{{ iarTrans('welfareLottery.copyLiveLink') }}</welfare-lottery-btn>
      </div>
      <toast
        :visible="showCopySuccessTip"
        :text="iarTrans('welfareLottery.copySuccess')"
        @hidden="handleToastHidden"
      />
    </template>
    <template v-else #body>
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
    </template>
  </modal-gift-box>
</template>

<script>
import ModalGiftBox from '../modal-gift-box/PcModalGiftBox.vue';
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
  props: {
    watchUrl: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      showQRCode: false,
    };
  },
  computed: {
    qrCodeUrl() {
      return `https://live.polyv.net/qrcode?url=${this.watchUrl}`;
    },
    btnText() {
      return this.isCompleted ?
        'welfareLottery.participated' :
        (this.inviteType === 'external' ? 'welfareLottery.participateNow' : 'welfareLottery.scanningToParticipate');
    },
  },
  methods: {
    handleBack() {
      this.showQRCode = false;
    }
  }
};
</script>
<style lang="scss">
@import '../task-public/pc-style.scss';
.plv-iar-welfare-lottery__task--qr-code {
  .plv-iar-modal__main {
    background-image: url(./bg-qr-code.png);
  }
}
.plv-iar-welfare-lottery__qr-code__pic {
  text-align: center;
  margin: 52px 0 16px;
  font-size: 0;
  >img {
    width: 120px;
    height: 120px;
    border-radius: 4px;
  }
}
.plv-iar-welfare-lottery__qr-code__text {
  text-align: center;
  font-size: 14px;
  color: #FCEEBC;
  margin-bottom: 48px;
}
</style>
