<template>
  <div>
    <module-container :max-body-height="370">
      <div class="plv-iar-questionnaire-evaluation-result">
        <div class="plv-iar-questionnaire-evaluation-result__title">你的风险承受能力为：</div>
        <div class="plv-iar-questionnaire-evaluation-result__type">{{ answerResult.scoreLabel }}</div>
        <div
          class="plv-iar-questionnaire-evaluation-result__type-img"
          :class="typeImg"
        ></div>
        <div v-if="answerResult.passEvaluation === 1" class="plv-iar-questionnaire-evaluation-result__content">
          本人保证上述所填写信息为本人真实意愿，
          完全独立依据自身情况和判断做出上述答案，同时确认若本人进入与自身风险承受能力不匹配的直播间时，
          将自觉退出直播间，当忽略相关风险等级要求，执意观看风险等级高于本人风险能力范围的，
          本人确保已知悉可能带来的风险，由此导致的一切后果本人承担.
        </div>
        <div v-if="answerResult.passEvaluation === 0" class="plv-iar-questionnaire-evaluation-result__content">
          风险承受能力需要达到【<span>{{ answerResult.scoreLabelLimit }}</span>】才能观看直播。
        </div>
        <div class="plv-iar-questionnaire-evaluation-result__footer">
          <div
            class="plv-iar-questionnaire-evaluation-result__footer-btn"
            @click="isShowModalWin = true"
          >
            重测
          </div>
          <div
            v-if="answerResult.passEvaluation === 1"
            class="plv-iar-questionnaire-evaluation-result__footer-btn plv-iar-questionnaire-evaluation-result__footer-done-btn"
            @click="$emit('close')"
          >
            我已知悉，观看直播
          </div>
        </div>
        <div v-if="isShowModalWin" ref="evaluationResultModal" class="plv-iar-questionnaire-evaluation-result__model">
          <div class="plv-iar-questionnaire-evaluation-result__model-inner">
            <div class="plv-iar-questionnaire-evaluation-result__model-content">
              确定重测吗？
            </div>
            <div class="plv-iar-questionnaire-evaluation-result__model-footer">
              <div class="plv-iar-questionnaire-evaluation-result__model-footer-btn" @click="isShowModalWin = false">取消</div>
              <div class="plv-iar-questionnaire-evaluation-result__model-footer-btn plv-iar-questionnaire-evaluation-result__modal-footer-done-btn" @click="reTest">确定</div>
            </div>
          </div>
        </div>
      </div>
    </module-container>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
import answerMixin from '../../questionnaire/answer/mixin/answer-mixin';

import ModuleContainer from '../../common/module-container/PcModuleContainer';

export default {
  components: {
    ModuleContainer,
  },
  mixins: [basicMixin, answerMixin],
  props: {
    answerResult: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" >
.plv-iar-questionnaire-evaluation-result {
  padding: 28px 18px 24px 24px;
  position: relative;
}
.plv-iar-questionnaire-evaluation-result__title {
  font-size: 14px;
  font-weight: normal;
  color: #333;
}

.plv-iar-questionnaire-evaluation-result__type {
  width: fit-content;
  max-width: 230px;
  height: 26px;
  margin-top: 36px;
  border-bottom: 10px solid #fef0dc;
  color: #333;
  font-size: 28px;
  font-weight: 600;
}

.type-img-guard {
  background: url(./imgs/guard.svg) no-repeat;
}
.type-img-grow {
  background: url(./imgs/grow.svg) no-repeat;
}
.type-img-balance {
  background: url(./imgs/balance.svg) no-repeat;
}
.type-img-stable {
  background: url(./imgs/stable.svg) no-repeat;
}
.type-img-ahead {
  background: url(./imgs/ahead.svg) no-repeat;
}

.plv-iar-questionnaire-evaluation-result__type-img {
  width: 120px;
  height: 120px;
  position: absolute;
  right: 26px;
  top: 8px;
}

.plv-iar-questionnaire-evaluation-result__content {
  height: 130px;
  margin-top: 28px;
  font-size: 14px;
  line-height: 22px;
  color: #9E9E9E;
}

.plv-iar-questionnaire-evaluation-result__footer {
  display: flex;
  justify-content: center;
  margin-top: 36px;

  .plv-iar-questionnaire-evaluation-result__footer-btn {
    width: 84px;
    height: 32px;
    margin-right: 16px;
    padding: 10px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    color: #333;
    box-sizing: border-box;
    border: 1px solid rgba(51, 51, 51, 0.2);
    font-size: 14px;
    cursor: pointer;
  }

  .plv-iar-questionnaire-evaluation-result__footer-done-btn {
    width: 160px;
    color: #fff;
    background: #D9BA6C;
    box-sizing: border-box;
    border: 0;
    margin: 0;
  }

  .plv-iar-questionnaire-evaluation-result__footer-btn-mobile {
    height: 40px;
    border: none;
  }

  .plv-iar-questionnaire-evaluation-result__footer-done-btn-mobile {
    width: 206px;
    height: 40px;
  }
}

.plv-iar-questionnaire-evaluation-result__model {
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000, $alpha: 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;

  .plv-iar-questionnaire-evaluation-result__model-inner {
    width: 280px;
    height: 168px;
    padding: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 16px 0 rgb(0 0 0 / 8%);
    border: 1px solid #eceff1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .plv-iar-questionnaire-evaluation-result__model-content {
    flex: 1;
    color: #333;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .plv-iar-questionnaire-evaluation-result__model-footer {
    width: 204px;
    display: flex;
    justify-content: space-between;

    .plv-iar-questionnaire-evaluation-result__model-footer-btn {
      width: 88px;
      height: 32px;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
      border: 1px solid rgba(51, 51, 51, 0.2);
      cursor: pointer;
    }

    .plv-iar-questionnaire-evaluation-result__modal-footer-done-btn {
      color: #fff;
      background: #D9BA6C;
      box-sizing: border-box;
      border: 0;
      margin: 0;
    }
  }
}
</style>
