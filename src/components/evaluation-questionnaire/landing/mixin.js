export default {
  props: {
    isForceStart: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      countDownTime: 0,
      countDownTimer: null
    };
  },

  mounted() {
    this.setCountDown();
  },

  watch: {
    isForceStart() {
      this.setCountDown();
    }
  },

  methods: {
    setCountDown() {
      if (this.isForceStart) {
        this.countDownTime = 10;
        this.countDownTimer = setInterval(() => {
          if (this.countDownTime <= 0) {
            clearInterval(this.countDownTimer);
            this.countDownTimer = null;
            this.$emit('re-test');
            return;
          }
          this.countDownTime -= 1;
        }, 1000);
      } else {
        clearInterval(this.countDownTimer);
        this.countDownTimer = null;
      }
    }
  }
};
