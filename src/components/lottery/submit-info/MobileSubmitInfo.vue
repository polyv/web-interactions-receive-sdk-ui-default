<template>
  <div class="plv-lottery-submit-default">
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
      <p v-else class="plv-lottery-submit-default__tips" v-html="deadline ? iarTrans('lottery.deadlineFillInformation', {date: deadlineLabel}) : iarTrans('lottery.fillInformation')"></p>
      <div class="plv-lottery-submit-default__form-wrap">
        <form class="plv-lottery-submit-default__form">
          <div
            v-for="(field, index) in collectInfo"
            :key="index"
            class="plv-lottery-submit-default__form__field"
          >
            <label>
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
                :placeholder="requiredText(field) + fieldPlaceholder(field)"
                :class="{
                  'plv-lottery-submit-default__form__field__input--err': fieldErr(field)
                }"
                @keyup="(e) => onInputKeyup(e, field, index)"
                @blur="(e) => onBlur(e, field, index)"
                @click="onClickInput(field, index)"
              />
              <span v-if="fieldErrTips(field)" class="plv-lottery-submit-default__form__field__err-tips">{{ fieldErrTips(field) }}</span>
            </label>
          </div>
        </form>
      </div>
      <div class="plv-lottery-submit-default__footer">
        <iar-button
          v-if="!received"
          class="plv-lottery-submit-default__btn pws-btn-bg-color"
          :disabled="!submitEnable"
          @click="onClickSubmit"
        >
          {{ iarTrans('lottery.submit') }}
        </iar-button>
      </div>
    </template>
  </div>
</template>

<script>
import IarButton from '../../../components/common/button/MobileButton';
import mixin from './mixin';

export default {
  components: {
    IarButton,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-lottery-submit-default {
  padding: 24px 24px 19px;
  text-align: center;
  font-size: 16px;
  p {
    margin: 0;
  }
}

.plv-lottery-submit-default__tips {
  color: #333333;
  font-size: 14px;
  margin-bottom: 20px;
}

.plv-lottery-submit-default__form-wrap {
  height: 150px;
  overflow: auto;
}
.plv-lottery-submit-default__form__field {
  position: relative;
  margin: 16px auto;
  input {
    font-size: 16px;
    width: 100%;
    height: 48px;
    line-height: 48px;
    padding: 0 18px;
    box-sizing: border-box;
    background: #F6F6F6;
    border-radius: 24px;
    border: none;
    outline: none;
    color: #333333;
    &::placeholder {
      color: #B2B2B2;
    }
  }
}

.plv-lottery-submit-default__form__field__input {
  &--err {
    +.plv-lottery-submit-default__form__field__err-tips {
      display: block;
    }
  }
}

.plv-lottery-submit-default__form__field__err-tips {
  display: none;
  position: absolute;
  left: 18px;
  color: #f86665;
  font-size: 12px;
}

.plv-lottery-submit-default__footer {
  padding: 21px 0 0;

  .plv-lottery-submit-default__btn {
    background: #FF5722;
    &:active {
      background: #FF5722;
    }
    &:disabled {
      background: rgba(#FF5722, 0.6);
    }
  }
}
.plv-lottery-submit-default__deadline {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 250px;
  .plv-lottery-submit-default__deadline--empty {
    width: 60px;
    height: 60px;
  }
  .plv-lottery-submit-default__deadline-tip {
    color: #999999;
    font-size: 14px;
    margin-top: 8px;
    line-height: 18px;
  }
}
</style>
