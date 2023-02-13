import basicMixin from '../../../assets/mixins/basic';
import { isIPhoneXSeries } from '../../../assets/utils/browser';

export default {
  mixins: [basicMixin],
  data() {
    return {
      isIPhoneXSeries: isIPhoneXSeries(),
    };
  },
  methods: {
    clickKnow() {
      this.$emit('click-know');
    }
  }
};
