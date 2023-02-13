import mixin from '../mixin';

export default {
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
  mounted() {
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleRecord() {
      this.$emit('record');
    },
  }
};
