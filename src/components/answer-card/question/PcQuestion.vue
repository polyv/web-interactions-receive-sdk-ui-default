<!-- @file 答题卡-题目。 -->

<template>
  <div v-if="question" class="plv-iar-answer-card-question-default">
    <module-container>
      <div class="plv-iar-answer-card-question-default__body">
        <p class="plv-iar-answer-card-question-default__question-content">
          {{ questionType(question) }} {{ question.name }}
        </p>
        <div class="plv-iar-answer-card-question-default__options__wrap">
          <ul class="plv-iar-answer-card-question-default__options">
            <li
              v-for="(option, index) in question.options"
              :key="index"
              class="plv-iar-answer-card-question-default__option"
              :class="{ 'plv-iar-answer-card-question-default__option__qa': question.itemType === 1 }"
            >
              <div class="plv-iar-answer-card-question-default__option-inner-wrap">
                <!-- 单选，投票 -->
                <label v-if="question.type === 'R' || question.type === 'V'">
                  <input
                    type="radio"
                    class="plv-iar-answer-card-question-default__option__input plv-iar-answer-card-question-default__option__input--single"
                    name="plvIntrSdkOption"
                    :value="getOptionChar(index)"
                    @change="handleRadioChange"
                  />
                  <span class="plv-iar-answer-card-question-default__option__dot"></span>
                  <span class="plv-iar-answer-card-question-default__option__content">{{ getOptionText(question, index) }}</span>
                </label>

                <!-- 多选 -->
                <label v-else-if="question.type === 'C'">
                  <input
                    v-model="selectedOptions"
                    type="checkbox"
                    class="plv-iar-answer-card-question-default__option__input plv-iar-answer-card-question-default__option__input--multi"
                    name="plvIntrSdkOption"
                    :value="getOptionChar(index)"
                  />
                  <span class="plv-iar-answer-card-question-default__option__dot"></span>
                  <span class="plv-iar-answer-card-question-default__option__content">{{ getOptionText(question, index) }}</span>
                </label>

                <!-- 评分 -->
                <label v-else>
                  <input
                    type="radio"
                    class="plv-iar-answer-card-question-default__option__input plv-iar-answer-card-question-default__option__input--single"
                    name="plvIntrSdkOption"
                    :value="getOptionChar(index)"
                    @change="handleRadioChange"
                  />
                  <span class="plv-iar-answer-card-question-default__option__dot"></span>
                  <span>{{ getOptionText(question, index) }}</span>
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <template #footer>
        <div class="plv-iar-answer-card-question-default__footer">
          <iar-button
            :disabled="submitDisabled || !selectedOptions || selectedOptions.length === 0"
            @click="submitAnswer"
          >
            {{ iarTrans('answerCard.submitAnswer') }}
          </iar-button>
          <p v-if="question.duration" class="plv-iar-answer-card-question-default__duration">
            {{ iarTrans('answerCard.leftTime') }} <span class="plv-iar-answer-card-question-default__duration__left">{{ leftTime }}</span> s
          </p>
        </div>
      </template>
    </module-container>
  </div>
</template>

<script>
import IarButton from '../../../components/common/button/PcButton';
import ModuleContainer from '../../common/module-container/PcModuleContainer';
import mixin from './mixin';

export default {
  components: {
    ModuleContainer,
    IarButton,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-iar-answer-card-question-default__body {
  padding: 24px;
  padding-bottom: 0;
  box-sizing: border-box;
  word-break: break-word;
}
.plv-iar-answer-card-question-default__footer {
  padding: 17px 0 24px;
  text-align: center;
}

.plv-iar-answer-card-question-default__question-content {
  margin: 0;
  margin-bottom: 20px;
  color: #333333;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.plv-iar-answer-card-question-default__options {
  list-style: none;
  padding: 0;
  margin: 0;
  display: table; // 题目选项采用 table 布局，主要是为了使各选项宽度保持一致且都与最大宽度选项同宽
}

.plv-iar-answer-card-question-default__option {
  font-size: 14px;
  color: #333333;
  display: table-row;
  word-break: break-word;

  .plv-iar-answer-card-question-default__option-inner-wrap {
    display: table-cell;
    padding-bottom: 20px;
  }

  label {
    display: block;
    position: relative;
    padding: 10px 16px;
    padding-left: 48px;
    box-sizing: border-box;
    border-radius: 20px;
    border: 1px solid #CFD8DC;
    cursor: pointer;
    min-width: 96px;
    line-height: 1;
    word-break: break-word;

    // 控制单选框和文字垂直对齐
    span {
      vertical-align: middle;
    }
  }
}

.plv-iar-answer-card-question-default__option__qa {
  label {
    width: 96px;
  }
}

// 单选
.plv-iar-answer-card-question-default__option__input {
  display: none;
  &+.plv-iar-answer-card-question-default__option__dot {
    position: absolute;
    top: 50%;
    margin-top: -8px;
    left: 16px;
    display: block;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    transition: .15s all ease-in-out;
  }

  &--single {
    &+.plv-iar-answer-card-question-default__option__dot {
      border: 1px solid #CFD8DC;
      border-radius: 50%;
      &:hover {
        border: 1px solid #2196F3;
      }
    }
    &:checked+span {
      border: 5px solid #2196F3;
      &:hover {
        border: 5px solid #2196F3;
      }
    }
  }

  &--multi {
    &:checked+span {
      position: absolute;
      font-size: 12px;
      font-weight: 600;
      color: #fff;
      border: none;
      background: #2196F3;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 16px;
        background: url(./imgs/icon-checkbox-checked.png);
        background-size: 100%;
        background-position: center;
        border-radius: 2px;
      }
      &:hover {
        border: none;
      }
    }
    &+.plv-iar-answer-card-question-default__option__dot {
      border: 1px solid #CFD8DC;
      border-radius: 2px;
      &:hover {
        border: 1px solid #2196F3;
      }
    }
  }
}

p.plv-iar-answer-card-question-default__duration {
  position: absolute;
  left: 343px;
  top: 30px;
  margin: 0;
  margin-top: -7px;
  color: #757575;
  font-size: 14px;

  span {
    color: #2196F3;
    font-weight: 600;
  }
}

.plv-iar-answer-card-question-default__option__content {
  line-height: 18px;
}
</style>
