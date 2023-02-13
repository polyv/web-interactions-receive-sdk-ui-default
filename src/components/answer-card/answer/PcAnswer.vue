<!-- @file 答题卡-题目答案。 -->

<template>
  <div>
    <!-- 评分 -->
    <template v-if="questionResult.content.type === 'S'">
      <div class="plv-iar-answer-card-answer-default__score__result">
        <div class="plv-iar-answer-card-answer-default__score__result__icon"></div>
        <p class="plv-iar-answer-card-answer-default__score__result__tips">{{ iarTrans('answerCard.pointsEnd') }}</p>
        <p class="plv-iar-answer-card-answer-default__score__result__question">{{ questionType(question) }} {{ question.name }}</p>
        <p class="plv-iar-answer-card-answer-default__score__result__avg">
          {{ iarTrans('answerCard.averageScore') }} <span>{{ questionResult.result.avgScore }}</span> {{ iarTrans('answerCard.point') }}
        </p>
      </div>
    </template>

    <!-- 投票 -->
    <template v-else-if="questionResult.content.type === 'V'">
      <div>
        <p class="plv-iar-answer-card-answer-default__question">{{ questionType(question) }} {{ question.name }}</p>
        <ul class="plv-iar-answer-card-answer-default__options">
          <li
            v-for="(option, index) in options"
            :key="index"
            class="plv-iar-answer-card-answer-default__option plv-iar-answer-card-answer-default__option--vote"
          >
            <div class="plv-iar-answer-card-answer-default__option-inner-wrap">
              <label>
                <div
                  class="plv-iar-answer-card-answer-default__option--vote__percent"
                  :style="{
                    width: `${getPercent(index)}%`,
                  }"
                ></div>
                <span class="plv-iar-answer-card-answer-default__option-content">{{ getOptionText(question, index) }}</span>
                <span class="plv-iar-answer-card-answer-default__options__num">
                  <span>{{ getOptionSubmitCount(index) }}</span>{{ iarTrans('answerCard.people') }}({{ getPercent(index) }}%)
                </span>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </template>

    <!-- 多选、单选 -->
    <template v-else>
      <div>
        <p class="plv-iar-answer-card-answer-default__question">{{ questionType(question) }} {{ question && question.name }}</p>
        <ul class="plv-iar-answer-card-answer-default__options">
          <li
            v-for="(option, index) in options"
            :key="index"
            class="plv-iar-answer-card-answer-default__option"
            :class="{
              'plv-iar-answer-card-answer-default__option--right': isRightOption(index),
              'plv-iar-answer-card-answer-default__option--wrong': isWrongChoice(index),
            }"
          >
            <div class="plv-iar-answer-card-answer-default__option-inner-wrap">
              <label>
                <span class="plv-iar-answer-card-answer-default__option-content">{{ getOptionText(question, index) }}</span>
                <span
                  v-if="isRightOption(index)"
                  class="plv-iar-answer-card-answer-default__option--right__icon plv-iar-answer-card-answer-default__option__icon"
                ></span>
                <span
                  v-else-if="isWrongChoice(index)"
                  class="plv-iar-answer-card-answer-default__option--wrong__icon plv-iar-answer-card-answer-default__option__icon"
                ></span>
                <span v-if="question.type === 'R'" class="plv-iar-answer-card-answer-default__options__num">
                  <span>{{ getOptionSubmitCount(index) }}</span>{{ iarTrans('answerCard.people') }}({{ getPercent(index) }}%)
                </span>
              </label>
            </div>
          </li>
        </ul>
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

  &__icon {
    width: 60px;
    height: 60px;
    background-image: url(./imgs/icon-score-result.png);
    background-size: 100%;
    background-position: bottom;
    background-repeat: no-repeat;
    margin: 0 auto;
    padding-top: 40px;
  }
  &__tips {
    margin: 0;
    margin-top: 20px;
  }
  &__question {
    margin: 0;
    margin-top: 20px;
    color: #666;
  }
  &__avg {
    margin: 0;
    margin-top: 8px;
    margin-bottom: 30px;
    span {
      color: #45ACFF;
      font-size: 24px;
      font-weight: 600;
    }
  }
}

.plv-iar-answer-card-answer-default__question {
  margin: 0;
  margin-bottom: 20px;
  color: #333333;
  font-size: 14px;
  line-height: 1.5;
}

.plv-iar-answer-card-answer-default__options {
  margin: 0;
  list-style: none;
  padding: 0;
  display: table;
}

.plv-iar-answer-card-answer-default__option {
  padding-right: 31px;
  box-sizing: border-box;
  font-size: 14px;
  color: #333333;
  display: table-row;

  .plv-iar-answer-card-answer-default__option-inner-wrap {
    position: relative;
    display: table-cell;
    padding-bottom: 20px;
    padding-right: 50px; // 留给选项人数的宽度
  }

  label {
    position: relative;
    display: block;
    padding: 8px 48px 12px 16px;
    min-width: 96px;
    max-width: 400px;
    box-sizing: border-box;
    background-color: #EDF1F7;
    border: none;
    color: #546E7A;
    border-radius: 20px;
    cursor: default;
    user-select: none;

    .plv-iar-answer-card-answer-default__option-content {
      font-size: 14px;
      line-height: 1.6;
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 16px;
    margin-top: -8px;
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 16px;
    background-size: 100%;
    background-position: center;
  }

  &--right {
    label {
      background-color: #C0E3FF;
      color: #2196F3;
    }
    &__icon {
      background-image: url(./imgs/icon-option-right.png);
    }
  }

  &--wrong {
    label {
      background-color: #FFE3E3;
      color: #E45B5B;
    }
    &__icon {
      background-image: url(./imgs/icon-option-wrong.png);
    }
  }
}

.plv-iar-answer-card-answer-default__options__num {
  position: absolute;
  top: 50%;
  left: 100%;
  display: block;
  margin-left: 8px;
  margin-top: -10px;
  font-size: 14px;
  white-space: nowrap;
  color: #546E7A;
  span {
    color: #2196F3;
  }
}

.plv-iar-answer-card-answer-default__option--vote {
  label {
    position: relative;
    background: #fff;
    border: 1px solid #C0E3FF;
    padding-right: 16px;
    .plv-iar-answer-card-answer-default__option--vote__percent {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: #C0E3FF;
      border-radius: 20px;
    }
    .plv-iar-answer-card-answer-default__option-content {
      position: relative;
    }
  }
}
</style>
