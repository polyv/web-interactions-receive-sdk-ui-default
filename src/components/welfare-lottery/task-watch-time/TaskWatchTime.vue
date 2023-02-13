<template>
  <div>
    <task-detail
      :prize="prize"
    >
      <div class="plv-iar-welfare-lottery__invitation__task">
        {{ iarTrans('welfareLottery.watch4') }}<span class="plv-iar-welfare-lottery__invitation__numbers">{{ watchedMinutes }}/{{ prize.duration }}</span>{{ iarTrans('welfareLottery.watch3') }}
      </div>
    </task-detail>
    <div class="plv-iar-welfare-lottery__task__btn-group">
      <welfare-lottery-btn
        :disabled="isCompleted || !eligible"
        @click="handleClick"
      >
        {{ iarTrans(btnText) }}
      </welfare-lottery-btn>
    </div>
  </div>
</template>

<script>
import TaskDetail from '../task-detail';
import WelfareLotteryBtn from '../btn.vue';
import mixin from '../mixin';
export default {
  name: 'TaskWatchTime',
  components: {
    TaskDetail,
    WelfareLotteryBtn,
  },
  mixins: [mixin],
  props: {
    prize: {
      type: Object,
      default: () => ({})
    },
    // 已观看分钟数
    watchedTime: {
      type: Number,
      default: 0
    },
    // 是否能进行抽奖任务
    eligible: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isCompleted() {
      return this.watchedTime >= this.prize.duration * 60;
    },
    btnText() {
      return this.eligible ?
        this.isCompleted ? 'welfareLottery.participated' : 'welfareLottery.keepWatching' :
        'welfareLottery.notEligible';
    },
    watchedMinutes() {
      return Math.floor(this.watchedTime / 60);
    },
  },
  methods: {
    handleClick() {
      if (this.eligible && !this.isCompleted) {
        const obj = {
          type: 'setLottery'
        };
        this.$emit('lottery-callback', obj);
        this.handleClose();
      }
    },
    handleClose() {
      this.$emit('close');
    },
    handleRecord() {
      this.$emit('record');
    },
  }
};
</script>
