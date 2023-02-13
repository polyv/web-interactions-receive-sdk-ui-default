export default {
  props: {
    isForceStart: {
      type: Boolean,
      default: false
    },
    questionnaireType: {
      type: String,
      default: 'normal'
    },
    isMock: {
      type: Boolean,
      default: false
    }
  }
};
