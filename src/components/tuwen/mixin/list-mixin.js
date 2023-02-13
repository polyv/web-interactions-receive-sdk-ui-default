export default {
  props: {
    list: {
      type: Array,
      default: () => { return []; }
    },
    topList: {
      type: Array,
      default: () => { return []; }
    },
    userInfo: {
      type: Object,
      default: () => { return {}; }
    },
    noMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      singleSuffix: '?x-oss-process=image/resize,m_fill,w_720,h_405,limit_0/format,jpg',
      multiSuffix: '?x-oss-process=image/resize,m_fill,w_300,h_300,limit_0/format,jpg'
    };
  },
  methods: {
    clickPicture(image) {
      this.$emit('click-picture', image);
    }
  }
};
