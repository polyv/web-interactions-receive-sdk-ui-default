<template>
  <div class="plv-iar-answer-card-question-default">
    <div class="plv-iar-answer-card-question-default__wrap">
      <p class="plv-iar-answer-card-question-default__title">
        {{ questionType(question) }} {{ question.name }}
      </p>
      <div>
        <ul class="plv-iar-answer-card-question-default__options">
          <li
            v-for="(option, index) in question.options"
            :key="index"
          >
            <!-- 单选，投票 -->
            <label
              v-if="question.type === 'R' || question.type === 'V'"
              class="plv-iar-answer-card-question-default__option"
            >
              <input
                type="radio"
                class="plv-iar-answer-card-question-default__option__input"
                name="plvIarOption"
                :value="getOptionChar(index)"
                @change="handleRadioChange"
              />
              <span>{{ getOptionText(question, index) }}</span>
            </label>

            <!-- 多选 -->
            <label
              v-else-if="question.type === 'C'"
              class="plv-iar-answer-card-question-default__option"
            >
              <input
                v-model="selectedOptions"
                type="checkbox"
                class="plv-iar-answer-card-question-default__option__input"
                name="plvIarOption"
                :value="getOptionChar(index)"
              />
              <span>{{ getOptionText(question, index) }}</span>
            </label>

            <!-- 评分 -->
            <label
              v-else-if="question.type === 'S'"
              class="plv-iar-answer-card-question-default__option"
            >
              <input
                type="radio"
                class="plv-iar-answer-card-question-default__option__input"
                name="plvIarOption"
                :value="getOptionChar(index)"
                @change="handleRadioChange"
              />
              <span>{{ getOptionText(question, index) }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="plv-iar-answer-card-question-default__btn__wrap"
      :style="{
        paddingBottom: `${isIPhoneXSeries ? 34 : 20}px`,
      }"
    >
      <iar-button
        :disabled="submitDisabled || !selectedOptions || selectedOptions.length === 0"
        @click="submitAnswer"
      >
        <div
          :class="{
            'plv-iar-answer-card-question-default__btn--disabled': submitDisabled || !selectedOptions || selectedOptions.length === 0
          }"
        >
          <span class="plv-iar-answer-card-question-default__submit-btn-text">{{ iarTrans('answerCard.mobSubmitAnswer') }}</span>
          <span v-if="question && question.duration" class="plv-iar-answer-card-question-default__lefttime">{{ leftTime }}s</span>
        </div>
      </iar-button>
    </div>
  </div>
</template>

<script>
import IarButton from '../../common/button/MobileButton';
import mixin from './mixin';
import { isIPhoneXSeries } from '../../../assets/utils/browser';

export default {
  components: {
    IarButton,
  },

  mixins: [mixin],

  data() {
    return {
      isIPhoneXSeries: isIPhoneXSeries(),
    };
  },
};
</script>

<style lang="scss">
.plv-iar-answer-card-question-default {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.plv-iar-answer-card-question-default__wrap {
  padding: 20px 24px 0;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  flex: 1;
}

.plv-iar-answer-card-question-default__title {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  line-height: 19px;
  word-break: break-word;
}

.plv-iar-answer-card-question-default__options {
  list-style: none;
  margin: 0;
  padding: 0;
}

.plv-iar-answer-card-question-default__option {
  position: relative;
  word-break: break-word;
}

.plv-iar-answer-card-question-default__option__input {
  display: none; // 隐藏原生的输入控件

  &+span {
    font-size: 14px;
    position: relative;
    margin-bottom: 12px;
    display: inline-block;
    padding: 10px 16px;
    padding-right: 54px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 20px;
    transition: all .1s ease;
    color: #333;
    background: #fff;
    border: 1px solid #CFD8DC;
    line-height: 19px;
  }

  &:checked {
    &+span {
      color: #3082FE;
      border: 1px solid #3082FE;
    }
  }
}

.plv-iar-answer-card-question-default__btn__wrap {
  margin-top: 20px;
  text-align: center;
  padding: 0 24px;
  box-sizing: border-box;
  width: 100%;
}
.plv-iar-answer-card-question-default__lefttime {
  position: absolute;
  right: 24px;
  width: 40px;
  top: 50%;
  margin-top: -8px;
  background-image: url(./imgs/icon-clock.png);
  background-position: 0;
  background-repeat: no-repeat;
  background-size: 16px;
  font-size: 14px;
  text-align: right;
  vertical-align: middle;
}
.plv-iar-answer-card-question-default__btn--disabled {
  .plv-iar-answer-card-question-default__lefttime {
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
