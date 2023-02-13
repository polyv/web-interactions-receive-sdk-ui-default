<!-- @file 答题卡-题目答案。 -->

<template>
  <div class="plv-iar-answer-card-answer-default">
    <!-- 评分 -->
    <template v-if="questionResult.content.type === 'S'">
      <div class="plv-iar-answer-card-answer-default__score__result">
        <div class="plv-iar-answer-card-answer-default__score__result__icon"></div>
        <p class="plv-iar-answer-card-answer-default__score__result__tips">{{ iarTrans('answerCard.pointsEnd') }}</p>
        <p class="plv-iar-answer-card-answer-default__score__result__question">{{ questionType(question) }} {{ question.name }}</p>
        <p class="plv-iar-answer-card-answer-default__score__result__avg">{{ iarTrans('answerCard.averageScore') }} <span>{{ questionResult.result.avgScore }}</span> {{ iarTrans('answerCard.point') }}</p>
      </div>
    </template>

    <!-- 投票 -->
    <template v-else-if="questionResult.content.type === 'V'">
      <div class="plv-iar-answer-card-answer-default-wrap">
        <p class="plv-iar-answer-card-answer-default__question__question">
          {{ questionType(question) }} {{ question.name }}
        </p>
        <div class="plv-iar-answer-card-answer-default__question__options__wrap">
          <ul class="plv-iar-answer-card-answer-default__question__options">
            <li
              v-for="(option, index) in options"
              :key="index"
              class="plv-iar-answer-card-answer-default__question__option"
            >
              <label class="plv-iar-answer-card-answer-default__option plv-iar-answer-card-answer-default__option--vote">
                <div
                  class="plv-iar-answer-card-answer-default__option__percent"
                  :style="{
                    width: `${getPercent(index)}%`,
                  }"
                ></div>
                <span class="plv-iar-answer-card-answer-default__option__answer">{{ getOptionText(question, index) }}</span>
                <span class="plv-iar-answer-card-answer-default__option__num">
                  <span>{{ getOptionSubmitCount(index) }}</span>{{ iarTrans('answerCard.people') }}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </template>

    <!-- 多选、单选 -->
    <template v-else>
      <div class="plv-iar-answer-card-answer-default-wrap">
        <p class="plv-iar-answer-card-answer-default__question__question">
          {{ questionType(question) }} {{ question.name }}
        </p>
        <div class="plv-iar-answer-card-answer-default__question__options__wrap">
          <ul class="plv-iar-answer-card-answer-default__question__options">
            <li
              v-for="(option, index) in options"
              :key="index"
              class="plv-iar-answer-card-answer-default__question__option"
            >
              <label
                class="plv-iar-answer-card-answer-default__option"
                :class="{
                  'plv-iar-answer-card-answer-default__option--right': isRightOption(index),
                  'plv-iar-answer-card-answer-default__option--wrong': isWrongChoice(index),
                }"
              >
                {{ getOptionText(question, index) }}
                <span class="plv-iar-answer-card-answer-default__option-icon"></span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
};
</script>

<style lang="scss">

.plv-iar-answer-card-answer-default__score__result {
  font-size: 14px;
  color: #333;
  text-align: center;
  padding: 20px 24px;
  box-sizing: border-box;

  &__icon {
    width: 60px;
    height: 60px;
    background-image: url(./imgs/icon-score-result.png);
    background-size: 100%;
    background-position: bottom;
    background-repeat: no-repeat;
    margin: 0 auto;
    padding-top: 20px;
  }
  &__tips {
    margin: 0;
    margin-top: 20px;
    font-size: 16px;
  }
  &__question {
    margin: 0;
    margin-top: 20px;
    color: #666;
  }
  &__avg {
    margin: 0;
    margin-top: 8px;
    margin-bottom: 80px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    span {
      color: #45ACFF;
      font-size: 24px;
      font-weight: 600;
    }
  }
}

.plv-iar-answer-card-answer-default-wrap {
  padding: 0 24px;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  word-break: break-word;
}

.plv-iar-answer-card-answer-default__question__question {
  margin: 0;
  padding: 20px 0;
  font-size: 16px;
  font-weight: bold;
  line-height: 19px;
}

.plv-iar-answer-card-answer-default__question__options {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 12px;
  font-size: 14px;
}

.plv-iar-answer-card-answer-default__option {
  position: relative;
  color: #333;
  display: inline-block;
  padding: 10px 16px;
  padding-right: 54px;
  margin: 6px 0;
  width: 100%;
  box-sizing: border-box;
  border-radius: 20px;
  transition: all .1s ease;
  background: #EDF1F7;
  border: none;
  line-height: 19px;

  .plv-iar-answer-card-answer-default__option-icon {
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -8px;
    right: 16px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &--right {
    background: #C0E3FF;
    color: #3082FE;
    .plv-iar-answer-card-answer-default__option-icon {
      background-image: url(./imgs/icon-option-right.png);
    }
  }

  &--wrong {
    background: #FFE3E3;
    color: #E45B5B;
    .plv-iar-answer-card-answer-default__option-icon {
      background-image: url(./imgs/icon-option-wrong.png);
    }
  }
}

.plv-iar-answer-card-answer-default__option--vote {
  background: #fff;
  border: 1px solid #C0E3FF;
  .plv-iar-answer-card-answer-default__option__percent {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: #C0E3FF;
    border-radius: 20px;
  }

  .plv-iar-answer-card-answer-default__option__answer {
    position: relative;
  }

  .plv-iar-answer-card-answer-default__option__num {
    position: absolute;
    right: 14px;
    span {
      color: #3082FE;
    }
  }
}
</style>
