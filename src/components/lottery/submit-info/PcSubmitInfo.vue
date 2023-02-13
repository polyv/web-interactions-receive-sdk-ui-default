<template>
  <div class="plv-lottery-submit-default" :class="{'plv-lottery-submit-dashed': collectInfo.length > 0}">
    <template v-if="isShowDeadLine">
      <div class="plv-lottery-submit-default__deadline">
        <img class="plv-lottery-submit-default__deadline--empty" src="./imgs/empty.png" />
        <p class="plv-lottery-submit-default__deadline-tip">{{ iarTrans('lottery.deadlineTip') }}</p>
      </div>
      <div class="plv-lottery-submit-default__footer">
        <iar-button
          class="plv-lottery-submit-default__btn pws-btn-bg-color"
          @click="onClickKnow"
        >
          {{ iarTrans('lottery.ok') }}
        </iar-button>
      </div>
    </template>
    <template v-else>
      <p v-if="received" class="plv-lottery-submit-default__tips">{{ iarTrans('lottery.receivedInformation') }}</p>
      <p v-else-if="collectInfo.length > 0" class="plv-lottery-submit-default__tips" v-html="deadline ? iarTrans('lottery.deadlineFillInformation', {date: deadlineLabel}) : iarTrans('lottery.fillInformation')"></p>
      <div class="plv-lottery-submit-default__form-wrap">
        <form class="plv-lottery-submit-default__form">
          <div
            v-for="(field, index) in collectInfo"
            :key="index"
            class="plv-lottery-submit-default__form__field"
          >
            <label>
              <span class="plv-lottery-submit-default__form__field__title"><span v-if="field.required" class="plv-lottery-submit-default__form__field__title__before">*</span>{{ fieldLabel(field) }}：</span>
              <input
                v-if="received"
                class="plv-lottery-submit-default__form__field__input"
                :value="field.value"
                readonly
              />
              <input
                v-else
                v-model="formData[index].value"
                class="plv-lottery-submit-default__form__field__input"
                :placeholder="fieldPlaceholder(field)"
                :class="{
                  'plv-lottery-submit-default__form__field__input--err': fieldErr(field)
                }"
                @keyup="(e) => onInputKeyup(e, field, index)"
                @blur="(e) => onBlur(e, field, index)"
                @click="onClickInput(field,index)"
              />
              <span v-show="fieldErrTips(field)" :id="fieldErrTips(field)" class="plv-lottery-submit-default__form__field__err-tips">{{ fieldErrTips(field) }}</span>
            </label>
          </div>
        </form>
      </div>

      <div class="plv-lottery-submit-default__footer">
        <iar-button
          v-if=" collectInfo.length > 0"
          class="plv-lottery-submit-default__btn pws-btn-bg-color"
          :disabled="!submitEnable || received"
          @click="onClickSubmit"
        >
          {{ iarTrans('lottery.submit') }}
        </iar-button>
        <iar-button
          v-else
          class="plv-lottery-submit-default__btn pws-btn-bg-color"
          @click="onClickKnow"
        >
          {{ iarTrans('lottery.gotIt') }}
        </iar-button>
        <button
          v-show="collectInfo.length > 0 && showWinners"
          class="plv-lottery-submit-default__winner__list-btn pws-font-theme-color"
          @click="onClickCheckWinner"
        >
          {{ iarTrans('lottery.checkList') }}
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import IarButton from '../../../components/common/button/PcButton';
import mixin from './mixin';

export default {
  components: {
    IarButton,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-lottery-submit-dashed {
  border-top: 1px dashed #CFD8DC;
  padding-top: 40px !important;
}
.plv-lottery-submit-default {
  padding: 0 0 30px;
  box-sizing: border;
  font-size: 14px;
  color: #333;
}

.plv-lottery-submit-default__tips {
  padding: 0 71px;
  text-align: center;
}

.plv-lottery-submit-default__footer {
  position: relative;
  margin: 24px 71px 0;
  text-align: center;
}

.plv-lottery-submit-default__winner__list-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #2196F3;
  font-size: 14px;
  cursor: pointer;
}

.plv-lottery-submit-default__btn {
  width: 96px;
}

.plv-lottery-submit-default__form {
  padding: 0 63px 0 71px;
}
.plv-lottery-submit-default__form__field {
  position: relative;
  margin: 20px 0;
  line-height: 40px;
  padding-left: 50px;
  box-sizing: border-box;
}
.plv-lottery-submit-default__form__field__title {
  position: absolute;
  right: 328px;
  top: 0;
  height: 40px;
  white-space: nowrap;
}
.plv-lottery-submit-default__form__field__title__before {
  color: #ff3a30;
  margin-right: 4px;
  font-size: 12px;
}
.plv-lottery-submit-default__form__field__input {
  width: 328px;
  height: 40px;
  padding: 0 8px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 2px;
  border: 1px solid #cfd8dc;
  outline: none;
  &:read-only {
    cursor: default;
  }
  &--err {
    border: 1px solid #ff5722;
    +.plv-lottery-submit-default__form__field__err-tips {
      display: block;
    }
  }
}
.plv-lottery-submit-default__form__field__err-tips {
  display: none;
  position: absolute;
  top: 0;
  right: 8px;
  color: #f86665;
  font-size: 12px;
}
.plv-lottery-submit-default__deadline {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .plv-lottery-submit-default__deadline--empty {
    width: 60px;
    height: 60px;
  }
  .plv-lottery-submit-default__deadline-tip {
    color: #999999;
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
  }
}
</style>
