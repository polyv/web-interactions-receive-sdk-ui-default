<!-- 卡片推送 pc 端 demo -->

<template>
  <div class="plv-demo-evaluation-pendant">
    <!-- 风险测评挂件组件 -->
    <evaluation-pendant
      ref="evaluationPendant"
      :lang="lang"
      :icon-url="iconUrl"
      :count-down-time="countDownTime"
      :questionnaire-sdk="questionnaireSdk"
      @openEvaluation="open"
      @openEvaluationForce="openForce"
    />
    <button @click="changeStatus(20)">changeStatusToCount</button>
    <button @click="changeStatus(0)">changeStatusToNocount</button>
  </div>
</template>

<script>
import EvaluationPendant from '../../entry/evaluation-questionnaire/evaluation-pendant/EvaluationPendant';
import mixin from '../demo-evaluation-questionnaire/mixin';

export default {
  components: {
    EvaluationPendant
  },

  mixins: [mixin],

  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },

  data() {
    return {
      iconUrl: 'https://demo2.polyv.net/linxiaoru/2020092402.jpeg',
      countDownTime: 0
    };
  },

  mounted() {
  },

  methods: {
    changeStatus(time) {
      this.countDownTime = time;
      console.log('this.countDownTime==>', this.countDownTime);
    },
    open() {
      console.log('打开问卷');
    },
    openForce() {
      console.log('强制打开问卷');
    }
  }
};
</script>
<style lang="scss">
.plv-demo-evaluation-pendant {
  position: absolute;
  top: 280px;
  left: 10px;
}
</style>
