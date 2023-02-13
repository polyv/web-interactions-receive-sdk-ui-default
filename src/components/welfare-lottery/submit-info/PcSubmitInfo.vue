<!-- 提交中奖人信息PC端组件 -->
<template>
  <div class="plv-iar-welfare-lottery__submit-info">
    <p
      v-if=" collectInfo.length > 0"
      class="plv-iar-welfare-lottery__submit-info__tips"
    >
      {{ received ? iarTrans('welfareLottery.receivedInformation') : iarTrans('welfareLottery.fillInformation') }}
    </p>
    <div class="plv-iar-welfare-lottery__submit-info__form-wrap">
      <form class="plv-iar-welfare-lottery__submit-info__form">
        <div
          v-for="(field, index) in collectInfo"
          :key="index"
          class="plv-iar-welfare-lottery__submit-info__form__field"
        >
          <label>
            <span class="plv-iar-welfare-lottery__submit-info__form__field__title"><span v-if="field.required" class="plv-iar-welfare-lottery__submit-info__form__field__title__before">*</span>{{ fieldLabel(field) }}：</span>
            <input
              v-if="received"
              class="plv-iar-welfare-lottery__submit-info__form__field__input"
              :value="field.value"
              readonly
            />
            <input
              v-else
              v-model="formData[index].value"
              class="plv-iar-welfare-lottery__submit-info__form__field__input"
              :placeholder="fieldPlaceholder(field)"
              :class="{
                'plv-iar-welfare-lottery__submit-info__form__field__input--err': fieldErr(field)
              }"
              @keyup="(e) => onInputKeyup(e, field, index)"
              @blur="(e) => onBlur(e, field, index)"
              @click="onClickInput(field,index)"
            />
            <span v-if="!received && field.value" class="plv-iar-welfare-lottery__submit-info__input__del" @click="cleanValue(field)"></span>
            <span
              v-show="fieldErrTips(field)"
              :id="fieldErrTips(field)"
              class="plv-iar-welfare-lottery__submit-info__form__field__err-tips"
            >{{ fieldErrTips(field) }}</span>
          </label>
        </div>
      </form>
    </div>

    <div v-if="!received" class="plv-iar-welfare-lottery__submit-info__footer">
      <welfare-lottery-btn
        v-if=" collectInfo.length > 0"
        type="deep"
        :disabled="!submitEnable"
        @click="onClickSubmit"
      >
        {{ iarTrans('welfareLottery.submit') }}
      </welfare-lottery-btn>
    </div>
  </div>
</template>

<script>
import WelfareLotteryBtn from '../btn.vue';
import mixin from './mixin';

export default {
  components: {
    WelfareLotteryBtn,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-iar-welfare-lottery__submit-info {
  position: relative;
  font-size: 14px;
  color: #333;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 108px;
  padding-top: 24px;
}

.plv-iar-welfare-lottery__submit-info__tips {
  margin: 0;
  padding: 0 70px 0 88px;
  margin-bottom: 20px;
}
.plv-iar-welfare-lottery__submit-info__form-wrap {
  flex-grow: 1;
  overflow: auto;
}
.plv-iar-welfare-lottery__submit-info__footer {
  position: absolute;
  bottom: 28px;
  width: 100%;
  padding: 0 116px;
  text-align: center;
}

.plv-iar-welfare-lottery__submit-info__form {
  padding: 0 88px;
}
.plv-iar-welfare-lottery__submit-info__form__field {
  position: relative;
  margin-bottom: 12px;
  line-height: 40px;
  padding-left: 64px;
  box-sizing: border-box;
  // >label {
  //   display: flex;
  // }
}
.plv-iar-welfare-lottery__submit-info__form__field__title {
  position: absolute;
  right: 320px;
  top: 0;
  height: 40px;
  white-space: nowrap;
  // flex-grow: 1;
}
.plv-iar-welfare-lottery__submit-info__form__field__title__before {
  color: #ff3a30;
  margin-right: 4px;
  font-size: 12px;
}
.plv-iar-welfare-lottery__submit-info__form__field__input {
  // flex-shrink: 0;
  width: 320px;
  height: 40px;
  padding: 0 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, .3);
  border-radius: 2px;
  border: 1px solid #FFB299;
  outline: none;
  &:read-only {
    cursor: default;
  }
  &--err {
    border: 1px solid #ff5722;
    +.plv-iar-welfare-lottery__submit-info__form__field__err-tips {
      display: block;
    }
  }
}
.plv-iar-welfare-lottery__submit-info__input__del {
  position: absolute;
  top: 13px;
  right: 12px;
  width: 16px;
  height: 16px;
  background-image: url(./btn-del.png);
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}
.plv-iar-welfare-lottery__submit-info__form__field__err-tips {
  display: none;
  position: absolute;
  top: 0;
  right: 8px;
  color: #f86665;
  font-size: 12px;
}
</style>
