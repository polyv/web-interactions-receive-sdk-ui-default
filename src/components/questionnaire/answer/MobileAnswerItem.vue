<template>
  <div class="plv-iar-questionnaire-answer plv-iar-questionnaire-answer-mobile">
    <div class="plv-iar-questionnaire-answer__top">
      <p
        class="plv-iar-questionnaire-answer__title"
        :class="{'plv-iar-questionnaire-answer__title--desc': answer.desc}"
      >
        <span v-html="formatQName(index, answer)"></span>
        <sup v-if="answer.required === 'Y'">*</sup>
        <span v-if="answer.scoreEnabled === 'Y'" class="plv-iar-questionnaire-answer__title__blue">（{{ answer.score }}{{ iarTrans('questionnaire.points') }}）</span>
      </p>
      <p v-if="answer.desc" class="plv-iar-questionnaire-answer__desc">{{ answer.desc }}</p>
    </div>
    <div>
      <div class="plv-iar-questionnaire-answer__options">
        <!-- 问答 -->
        <template v-if="answer.type === 'Q'">
          <div class="plv-iar-questionnaire-answer__option__q">
            <p>{{ answer.answer }}</p>
          </div>
          <div class="plv-iar-questionnaire-answer__option__result">
            <p>{{ iarTrans('questionnaire.total') }}<strong>{{ answer.total }}</strong>{{ iarTrans('questionnaire.total1') }}</p>
          </div>
        </template>
        <!-- 五星评分 -->
        <template v-else-if="answer.type === 'X'">
          <score-item
            type="X"
            scene="display"
            :amount="starOrScoreAmount"
          />
          <div class="plv-iar-questionnaire-answer__option__result">
            <p>{{ iarTrans('questionnaire.total') }}<strong>{{ answer.total }}</strong>{{ iarTrans('questionnaire.total2') }}</p>
          </div>
        </template>
        <!-- 10分评分 -->
        <template v-else-if="answer.type === 'S'">
          <score-item
            type="S"
            scene="display"
            :amount="starOrScoreAmount"
          />
          <div class="plv-iar-questionnaire-answer__option__result">
            <p>{{ iarTrans('questionnaire.total') }}<strong>{{ answer.total }}</strong>{{ iarTrans('questionnaire.total3') }}</p>
          </div>
        </template>
        <template v-else>
          <div
            v-for="(optionItem, optionIndex) in options"
            :key="optionIndex"
            :class="optionItem.optionCls"
            class="plv-iar-questionnaire-answer__option"
          >
            <!-- 单选 -->
            <div v-if="answer.type === 'R'">
              <span class="plv-iar-questionnaire-answer__option__text">{{ optionChar(optionIndex) }} . {{ optionItem.value }}</span>
              <i class="plv-iar-questionnaire-answer__option--icon"></i>
              <div class="plv-iar-questionnaire-answer__option__mobile--border"></div>
            </div>

            <!-- 多选 -->
            <div v-else-if="answer.type === 'C'">
              <span class="plv-iar-questionnaire-answer__option__text">{{ optionChar(optionIndex) }} . {{ optionItem.value }}</span>
              <i class="plv-iar-questionnaire-answer__option--icon"></i>
              <div class="plv-iar-questionnaire-answer__option__mobile--border"></div>
            </div>

            <!-- 判断 -->
            <div v-else-if="answer.type === 'J'">
              <span class="plv-iar-questionnaire-answer__option__text">{{ optionItem.value }}</span>
              <i class="plv-iar-questionnaire-answer__option--icon"></i>
              <div class="plv-iar-questionnaire-answer__option__mobile--border"></div>
            </div>
          </div>
          <div class="plv-iar-questionnaire-answer__option__result">
            <p v-if="right.length > 0" class="plv-iar-questionnaire-answer__option__right">
              {{ iarTrans('questionnaire.correctAnswer') }}:
              <strong>{{ right.join('') }}</strong>
            </p>

            <p v-for="(option, index) in options" :key="index">
              {{ iarTrans('questionnaire.result1') }}{{ optionChar(index) }}{{ iarTrans('questionnaire.result2') }}
              <strong v-if="~right.indexOf(option.optionChar) || (!isScore && option.optionCls)">
                {{ option.selectUserNum }}
              </strong>
              <template v-else>
                {{ option.selectUserNum }}
              </template>
              {{ iarTrans('questionnaire.result3') }}{{ iarTrans('questionnaire.result4') }}{{ option.ratio }}{{ iarTrans('questionnaire.result5') }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin/answer-item';
import ScoreItem from '../ScoreItem.vue';

export default {
  components: {
    ScoreItem,
  },
  mixins: [mixin],
};
</script>

<style lang="scss" >

.plv-iar-questionnaire-answer {
  color: #333;
  margin-bottom: 20px;
  word-break: break-word;
}

.plv-iar-questionnaire-answer__title {
  position: relative;
  padding-left: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 26px;
  margin-top: 0;
  margin-bottom: 16px;
  sup {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 12px;
    color: #ff5b5b;
  }
}

.plv-iar-questionnaire-answer__title--desc {
  margin-bottom: 12px;
}

.plv-iar-questionnaire-answer__title__blue {
  color: #3082FE;
  font-size: 14px;
}

.plv-iar-questionnaire-answer__title__gray {
  color: #666;
  font-size: 14px;
}

.plv-iar-questionnaire-answer__options {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
}

.plv-iar-questionnaire-answer__option {
  margin-bottom: 16px;
  font-size: 14px;
  color: #546E7A;
  position: relative;
  line-height: 19px;
  > div {
    position: relative;
    // display: inline-block;
    padding: 10px 16px;
    box-sizing: border-box;
    border-radius: 20px;
    background: #EDF1F7;
    max-width: 98%;
    min-width: 96px;
    line-height: 1;
    margin-right: 8px;
    display: inline-flex;
    align-items: center;

    // 控制单选框和文字垂直对齐
    span {
      flex: 1;
      line-height: 1;
    }

    .plv-iar-questionnaire-answer__option__text {
      display: inline-block;
      line-height: 18px;
      vertical-align: middle;
      word-break: break-word;
    }
  }

  .plv-iar-questionnaire-answer__option--stats {
    color: #333;
    strong {
      color: #2196f3;
    }
  }
  &.selected {
    > div {
      background: #C0E3FF;
      color: #2196F3;
    }
  }
  .plv-iar-questionnaire-answer__option--icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: cover;
    background-repeat: no-repeat;
    margin-left: 16px;
  }
  &.right {
    > div {
      background: #C0E3FF;
      color: #2196F3;
    }
    .plv-iar-questionnaire-answer__option--icon {
      background-image: url(./imgs/icon-success.png);
    }
  }
  &.wrong {
    > div {
      background: #FFE3E3;
      color: #E45B5B;
    }
    .plv-iar-questionnaire-answer__option--icon {
      background-image: url(./imgs/icon-fail.png);
    }
  }
}

.plv-iar-questionnaire-answer__option__q {
  width: 420px;
  font-size: 14px;
  display: flex;
  align-items: center;
  p {
    min-height: 40px;
    line-height: 40px;
    box-sizing: content-box;
    flex: 1;
    color: #333;
    padding: 0 10px;
    border: 1px solid #CFD8DC;
    border-radius: 2px;
  }

  span {
    margin-left: 16px;
  }

  strong {
    color: #2196F3;
  }
}

// 移动端
.plv-iar-questionnaire-answer-mobile {
  .plv-iar-questionnaire-answer__option {
    flex-direction: column;
    > div {
      width: 100%;
      border: none;
      .plv-iar-questionnaire-answer__option__text {
        margin-left: 0;
      }

      .plv-iar-questionnaire-answer__option__mobile--border {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 20px;
      }
    }
  }

  .plv-iar-questionnaire-answer__option__q {
    width: 100%;
  }
}

.plv-iar-questionnaire-answer__option__result {
  position: relative;
  background: #EDF1F7;
  border-radius: 8px;
  padding: 10px 16px;
  margin-top: 18px;
  margin-right: 8px;
  max-width: 98%;
  p {
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    color: #333;
    strong {
      color: #2196F3;
      font-weight: 400;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    height: 0;
    width: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 6px solid #edf1f7;
  }
}
.plv-iar-questionnaire-answer__desc {
  font-size: 12px;
  color: #757575;
  margin: 0;
  margin-bottom: 16px;
  line-height: 19px;
}
</style>
