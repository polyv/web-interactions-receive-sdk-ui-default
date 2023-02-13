<template>
  <div>
    <Pendant
      v-if="pendantVisible"
      :icon-url="iconUrl"
      :time="time"
      :segments="3"
      :show-tooltip="false"
      @countdown-end="$emit('end')"
      @click="showModal"
    />
  </div>
</template>

<script>
import entryMixin from '../../assets/mixins/entry';
import Pendant from '../../components/pendant/pendant.vue';
import pendantUrlEn from './imgs/icon-enroll-lottery-en.png';
import pendantUrl from './imgs/icon-enroll-lottery.png';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
import langs from '../../assets/locale/lang/enroll-lottery';
import { showToast } from '@/assets/utils/toast';

export default {
  langs,
  name: 'EnrollLotteryPendant',
  components: {
    Pendant
  },
  mixins: [entryMixin],
  props: {
    enrollLotterySdk: {
      type: Object,
      default: null
    },
    autoFetchDetail: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pendantVisible: false,
      time: 0,
      toastObj: null
    };
  },
  computed: {
    iconUrl() {
      return this._useLang === 'zh_CN' ? pendantUrl : pendantUrlEn;
    }
  },
  watch: {
    pendantVisible(val) {
      this.hasEnrollLotteryPendant(val);
    }
  },
  async mounted() {
    this.enrollLotterySdk.on(this.enrollLotterySdk.events.UpdateLotteryDetail, this.updateLotteryData);
    this.enrollLotterySdk.on(this.enrollLotterySdk.events.EndLotteryForSignUp, () => {
      this.pendantVisible = false;
    });
    if (this.autoFetchDetail) {
      await this.enrollLotterySdk.getEnrollLotteryDetail();
    }
  },
  methods: {
    hasEnrollLotteryPendant(nv) {
      this.$emit('entry-visible-changed', nv);
    },
    showModal() {
      if (this.enrollLotterySdk.hasEnrolled) {
        showToast({ text: this.iarTrans('enrollLottery.enrollLotteryEnrolled') });
        return;
      }
      this.$emit('to-show-modal');
    },
    updateLotteryData(data) {
      if (!data || !data.sourceRange.includes('enroll')) {
        this.hideEnroll();
        return;
      }
      const { startTime, endTime, serverTime } = data;
      this.pendantVisible = serverTime >= startTime && serverTime <= endTime;
      if (this.pendantVisible) {
        this.time = parseInt((endTime - Date.now()) / 1000);
      }
    },
    hideEnroll() {
      this.pendantVisible = false;
    },
  },
  [BEFORE_DESTROY]() {
    if (this.enrollLotterySdk) {
      this.enrollLotterySdk.off(this.enrollLotterySdk.events.UpdateLotteryDetail, this.updateLotteryData);
    }
  }

};
</script>
