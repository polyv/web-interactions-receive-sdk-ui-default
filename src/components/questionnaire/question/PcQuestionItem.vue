<template>
  <div v-if="question" class="plv-iar-questionnaire-question">
    <div v-if="question.type !== 'D'">
      <div>
        <p
          class="plv-iar-questionnaire-question__title"
          :class="{'plv-iar-questionnaire-question__title--desc': question.desc}"
        >
          <sup v-if="question.required === 'Y'">*</sup>
          <span v-html="formatQName(index, question)"></span>
          <span v-if="question.scoreEnabled === 'Y'" class="plv-iar-questionnaire-question__title__blue pws-vclass-questionnaire-question__title__blue">（{{ question.score }}{{ iarTrans('questionnaire.points') }}）</span>
        </p>
        <!-- <p v-if="notFill" class="plv-iar-questionnaire-question__required">这道题必填哦</p> -->
        <p v-if="question.desc" class="plv-iar-questionnaire-question__desc">{{ question.desc }}</p>
      </div>
      <div>
        <div
          class="plv-iar-questionnaire-question__options"
          :class="{
            'plv-iar-questionnaire-question__options--table': question.type === 'R' || question.type === 'C'
          }"
        >
          <!-- 问答 -->
          <textarea
            v-if="question.type === 'Q'"
            v-model="values"
            class="plv-iar-questionnaire-question__option__textarea"
          ></textarea>

          <!-- 五星评分 -->
          <div
            v-else-if="question.type === 'X'"
          >
            <score-item
              v-model="values"
              type="X"
            />
          </div>

          <!-- 10分评分 -->
          <div
            v-else-if="question.type === 'S'"
            class="plv-iar-questionnaire-question__option__score"
          >
            <score-item
              v-model="values"
              type="S"
            />
          </div>

          <div
            v-for="(optionItem, optionIndex) in question.options"
            v-else
            :key="optionIndex"
            class="plv-iar-questionnaire-question__option"
          >
            <div class="plv-iar-questionnaire-question__option__inner-wrap">
              <!-- 单选 -->
              <label v-if="question.type === 'R'">
                <input
                  v-model="values"
                  type="radio"
                  class="plv-iar-questionnaire-question__option__input plv-iar-questionnaire-question__option__input--single pws-vclass-questionnaire-question__option__input--single"
                  :name="question.questionId"
                  :value="optionChar(optionIndex)"
                />
                <span class="plv-iar-questionnaire-question__option__dot"></span>
                <span class="plv-iar-questionnaire-question__option__text">{{ optionChar(optionIndex) }} . {{ optionItem }}</span>
                <div class="plv-iar-questionnaire-question__option__mobile--border"></div>
              </label>

              <!-- 多选 -->
              <label v-else-if="question.type === 'C'">
                <input
                  v-model="values"
                  type="checkbox"
                  class="plv-iar-questionnaire-question__option__input plv-iar-questionnaire-question__option__input--multi"
                  :name="question.questionId"
                  :value="optionChar(optionIndex)"
                />
                <span class="plv-iar-questionnaire-question__option__dot"></span>
                <span class="plv-iar-questionnaire-question__option__text">{{ optionChar(optionIndex) }} . {{ optionItem }}</span>
                <div class="plv-iar-questionnaire-question__option__mobile--border"></div>
              </label>
              <!-- 判断题 -->
              <label v-else-if="question.type === 'J'">
                <input
                  v-model="values"
                  type="radio"
                  class="plv-iar-questionnaire-question__option__input plv-iar-questionnaire-question__option__input--single pws-vclass-questionnaire-question__option__input--single"
                  :name="question.questionId"
                  :value="optionChar(optionIndex)"
                />
                <span class="plv-iar-questionnaire-question__option__dot"></span>
                <span class="plv-iar-questionnaire-question__option__text">{{ optionItem }}</span>
                <div class="plv-iar-questionnaire-question__option__mobile--border"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="question.type === 'D'">
      <div class="plv-iar-questionnaire-question-evaluation__title">
        {{ question.name }}
      </div>
      <div class="plv-iar-questionnaire-question__options plv-iar-questionnaire-question__evaluation-options">
        <div
          v-for="(optionItem, optionIndex) in question.options"
          :key="'option'+optionIndex"
          class="plv-iar-questionnaire-question__option plv-iar-questionnaire-question__evaluation-option"
          @click="slectOption(optionIndex)"
        >
          <div
            class="plv-iar-questionnaire-question__evaluation-option-checked-box"
            :class="{'plv-iar-questionnaire-question__evaluation-option-checked-box--checked': optionChar(optionIndex) === answer}"
          ></div>
          <span>{{ optionChar(optionIndex) }} . {{ optionItem }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin/question-item';
import ScoreItem from '../ScoreItem.vue';

export default {
  name: 'PcQuestionItem',

  components: {
    ScoreItem,
  },

  mixins: [mixin]
};
</script>

<style lang="scss" >
.plv-iar-questionnaire-question {
  padding: 0 24px;
  color: #333;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.plv-iar-questionnaire-question__title {
  position: relative;
  padding-left: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 26px;
  margin-top: 0;
  margin-bottom: 20px;
  word-break: break-word;
  sup {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 12px;
    color: #ff5b5b;
  }
}

.plv-iar-questionnaire-question__title--desc {
  margin-bottom: 12px;
}

.plv-iar-questionnaire-question__required {
  margin-left: 1em;
  padding: 0 8px;
  font-size: 12px;
  color: #fff;
  line-height: 18px;
  background: #ff5b5b;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  top: -18px;
}

.plv-iar-questionnaire-question__title__blue {
  color: #3082FE;
  font-size: 14px;
}

.plv-iar-questionnaire-question__title__gray {
  color: #666;
  font-size: 14px;
}

.plv-iar-questionnaire-question__options {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
  &--table {
    display: table;
  }
}

.plv-iar-questionnaire-question__option {
  font-size: 14px;
  color: #333333;
  position: relative;
  line-height: 19px;
  display: table-row;
  &__inner-wrap {
    display: table-cell;
    padding-bottom: 16px;
  }
  &:last-child {
    .plv-iar-questionnaire-question__option__inner-wrap {
      padding-bottom: 0;
    }
  }
  label {
    position: relative;
    display: block;
    padding: 10px 16px;
    border-radius: 20px;
    border: 1px solid #CFD8DC;
    cursor: pointer;
    max-width: 98%;
    min-width: 96px;
    line-height: 1;

    // 控制单选框和文字垂直对齐
    span {
      line-height: 1;
    }

    .plv-iar-questionnaire-question__option__dot {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      margin-top: 1px;
    }
    .plv-iar-questionnaire-question__option__text {
      display: inline-block;
      margin-left: 32px;
      line-height: 18px;
      vertical-align: middle;
      word-break: break-word;
    }
  }
}

// 单选
.plv-iar-questionnaire-question__option__input {
  display: none;
  &+.plv-iar-questionnaire-question__option__dot {
    margin-right: 16px;
    display: inline-block;
    width: 15px;
    height: 15px;
    box-sizing: border-box;
    transition: .15s all ease-in-out;
  }

  &--single {
    &+.plv-iar-questionnaire-question__option__dot {
      border: 1px solid #CFD8DC;
      border-radius: 50%;
      &:hover {
        border: 1px solid #2196F3;
      }
    }
    &:checked+span, &:checked+span:hover {
      border: 5px solid #2196F3;
    }
  }

  &--multi {
    &:checked+span {
      position: absolute;
      font-size: 12px;
      font-weight: 600;
      color: #fff;
      border: 1px solid transparent;
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
        border: 1px solid #CFD8DC;
        border-radius: 2px;
        &:hover {
          border: 1px solid #2196F3;
        }
      }
    }
    &+.plv-iar-questionnaire-question__option__dot {
      border: 1px solid #CFD8DC;
      border-radius: 2px;
      &:hover {
        border: 1px solid #2196F3;
      }
    }
  }
}

.plv-iar-questionnaire-question__option__textarea {
  width: 100%;
  box-sizing: border-box;
  height: 88px;
  display: block;
  font-size: 14px;
  color: #333;
  resize: none;
  padding: 5px 10px;
  border: 1px solid #efefef;
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
  // @include scrollbar();
}

.plv-iar-questionnaire-question-default__privacy {
  margin-top: 30px;
  padding: 0 24px;
}

.plv-iar-questionnaire-question__desc {
  font-size: 12px;
  color: #757575;
  margin: 0;
  margin-bottom: 16px;
  line-height: 19px;
}
.plv-iar-questionnaire-question__option__score {
  margin-bottom: 12px;
}

.plv-iar-questionnaire-question-evaluation__title {
  margin-top: 10px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.plv-iar-questionnaire-question__evaluation-options {
  // height: 255px;
  padding-top: 8px;
}

.plv-iar-questionnaire-question__evaluation-option {
  margin-top: 16px;
  padding: 10px 16px;
  border-radius: 22px;
  display: flex !important;
  align-items: center;
  box-sizing: border-box;
  border: 0.5px solid #CFD8DC;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: normal;
    line-height: 24px;
  }
}

.plv-iar-questionnaire-question__evaluation-option-checked-box {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 8px;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 1px solid #CFD8DC;
  flex-shrink: 0;

  &--checked {
    border-width: 4px;
    border-color: #D9BA6C;
  }
}

</style>
