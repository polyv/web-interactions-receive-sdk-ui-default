import mixin from '../mixin';
import { showToast } from '../../../assets/utils/toast';
import { ynToBool } from '@polyv/utils/src/boolean';

export default {
  mixins: [mixin],
  data() {
    return {
    };
  },
  props: {
    welfareLotterySdk: {
      type: Object,
      required: true,
    },
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
      return ynToBool(this.prize.hasComment || 'N');
    },
    btnText() {
      return this.isCompleted ? 'welfareLottery.participated' : 'welfareLottery.sendComment';
    },
    watchedMinutes() {
      return Math.floor(this.watchedTime / 60);
    },
  },
  mounted() {
  },
  methods: {
    async handleClick() {
      if (!this.isCompleted) {
        const obj = {
          type: 'setLottery'
        };
        this.$emit('lottery-callback', obj);
        try {
          // 聊天室发言成功，触发回调后提示用户满足条件
          await this.welfareLotterySdk.sendComment(this.prize.comment);
          showToast({
            text: this.iarTrans('welfareLottery.sendCommentSuccess'),
            duration: 3000,
          });
          this.$emit('comment-success', this.prize.comment);
        } catch (e) {
          console.warn(e);
        }
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
