import mixin from '../mixin';

export default {
  mixins: [mixin],
  props: {
    receiveData: {
      type: Object,
      default: () => ({})
    },
  },
  computed: {
    title() {
      return this.iarTrans(this.receiveData.acceptType === 'qrCode' ? 'welfareLottery.receiveByScanCode' : 'welfareLottery.receiveByFillInformation');
    },
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleBack() {
      this.$emit('back');
    },
    handleSubmit(data) {
      this.$emit('submit', data);
    },
  }
};
