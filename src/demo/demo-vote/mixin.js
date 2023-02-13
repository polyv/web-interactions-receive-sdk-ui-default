import { Vote } from '@polyv/interactions-receive-sdk';

export default {
  data() {
    return {
      /** 投票sdk实例 */
      voteSdk: null,
    };
  },
  props: {
    votedList: {
      type: Array,
      default: () => []
    },
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },
  mounted() {
    this.voteSdk = new Vote();
  },
};
