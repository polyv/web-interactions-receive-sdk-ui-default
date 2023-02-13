export default {
  data() {
    return {
      // 外层宽度
      wrapWidth: 0,
    };
  },

  props: {
    forceWrapWidth: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    sizeProp() {
      const wrapWidth = this.forceWrapWidth || this.wrapWidth;
      return wrapWidth / 375;
    },
  },

  mounted() {
    this.setWrapWidth();
  },

  methods: {
    setWrapWidth() {
      this.$nextTick(() => {
        this.wrapWidth = this.$el.clientWidth;
      });
    },

    computeStyle(num) {
      return num * this.sizeProp;
    },
  },
};
