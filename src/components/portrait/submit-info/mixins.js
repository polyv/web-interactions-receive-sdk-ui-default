export default {
  props: {
    // 显示时长
    duration: {
      type: Number,
      default: 3000,
    },
    tipsStyle: {
      type: Object,
      default: null,
    },
    imagePath: {
      type: String
    }
  },

  computed: {
    hintStyle() {
      return {
        backgroundImage: `url(${this.imagePath})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        ...this.tipsStyle
      };
    }
  },

  mounted() {
    setTimeout(() => {
      this.hide();
    }, this.duration);
  },

  methods: {
    hide() {
      this.$emit('hide');
    },
  },
};
