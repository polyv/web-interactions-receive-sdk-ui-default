<template>
  <div class="plv-iar-questionnaire-status-icon">
    <template v-if="status === allStatus.isShowAnswer && result && result.isShowRankIcon">
      <img src="./imgs/icon-rank.svg" class="plv-iar-questionnaire-status-icon__img" @click="$emit('change-status', allStatus.isShowResultRank)" />
      <div v-if="firstShow" class="plv-iar-questionnaire-status-icon__tips">
        {{ iarTrans('questionnaire.rankResultTip') }}
      </div>
    </template>
    <template v-if="status === allStatus.isShowResultRank && rank && rank.isShowQuestionIcon">
      <img
        src="./imgs/icon-result.svg"
        class="plv-iar-questionnaire-status-icon__img"
        @click="$emit('change-status', allStatus.isShowAnswer)"
      />
      <div v-if="firstShow" class="plv-iar-questionnaire-status-icon__tips plv-iar-questionnaire-status-icon__tips--result">
        {{ iarTrans('questionnaire.resultTip') }}
      </div>
    </template>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';

export default {
  mixins: [basicMixin],
  props: {
    status: {
      type: String,
      default: ''
    },
    allStatus: {
      type: Object,
      default: () => {
        return {};
      }
    },
    result: {
      type: Object,
      default: () => {
        return {};
      }
    },
    rank: {
      type: Array,
      default: () => {
        return [];
      }
    },
    firstShow: {
      type: Boolean,
      default: true
    }
  },
};
</script>

<style scoped lang="scss">
.plv-iar-questionnaire-status-icon {
  position: absolute;
  bottom: 50px;
  right: 8px;
  z-index: 20;
  .plv-iar-questionnaire-status-icon__img {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }
  .plv-iar-questionnaire-status-icon__tips {
    position: absolute;
    display: flex;
    right: 76px;
    top: 13px;
    background: #fe9765;
    box-shadow: 0 2px 8px 0rgba(0, 0, 0, .1);
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    user-select: none;
    width: fit-content;
    white-space: nowrap;
    padding: 12px 8px;
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      top: 12px;
      right: -7px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid #fe9765;
    }
    &--result {
      background: #3082FE;
      &:after {
        border-left: 10px solid #3082FE;
      }
    }
  }
}
</style>
