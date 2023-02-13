<!-- 点击页面报名抽奖，填写报名信息 -->
<template>
  <div class="plv-ia-enroll-lottery-add-msg">
    <template v-if="enrollProcess === 'unenrolled'">
      <p v-if="wrongName || wrongTel" class="plv-ia-enroll-lottery-add-msg__error--tips">{{ errorTips }}</p>
      <div class="plv-ia-enroll-lottery-countdown__content">
        <p class="plv-ia-enroll-lottery-add__content--p">{{ iarTrans('enrollLottery.countdown') }}</p>
        <span>{{ count }}</span>
      </div>
      <div class="plv-ia-enroll-lottery-submit__content">
        <input
          v-model="name"
          type="text"
          :class="{ 'plv-ia-enroll-lottery-input__wrong': wrongName }"
          :placeholder="iarTrans('enrollLottery.enterName')"
          maxlength="30"
          @focus="wrongName = false"
          @blur="nameInputBlur"
        />
        <input
          v-model="mobile"
          type="tel"
          :class="{ 'plv-ia-enroll-lottery-input__wrong': wrongTel }"
          :placeholder="iarTrans('enrollLottery.enterPhone')"
          @blur="checkPhone"
          @focus="wrongTel = false"
          @keyup="onlyNumber"
        />
        <p>*{{ iarTrans('enrollLottery.ensureInfo') }}</p>
        <button class="pws-btn-bg-color" :disabled="!submitEnabled" @click="submitMessage">{{ iarTrans('enrollLottery.submit') }}</button>
      </div>
    </template>
    <template v-else-if="enrollProcess === 'success'">
      <div class="plv-ia-enroll-lottery-add__success">
        <i></i>
        <p class="plv-ia-enroll-lottery-add__content--p">{{ iarTrans('enrollLottery.regSuccess') }}</p>
        <button class="pws-btn-bg-color" @click="$emit('close-modal')">{{ iarTrans('enrollLottery.sure') }}</button>
      </div>
    </template>
    <template v-else-if="enrollProcess === 'failed'">
      <div class="plv-ia-enroll-lottery-add__content">
        <p class="plv-ia-enroll-lottery-add__content--p">{{ iarTrans('enrollLottery.numberFull') }}</p>
        <button class="pws-btn-bg-color" @click="$emit('close-modal')">{{ iarTrans('enrollLottery.gotIt') }}</button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin]
};
</script>

<style lang="scss">
.plv-ia-enroll-lottery-add-msg {
  padding-bottom: 34px;
  text-align: center;
  overflow-y: auto;
  p {
    margin: auto;
  }

  button {
    display: block;
    height: 48px;
    line-height: 48px;
    border-radius: 24px;
    background: #3082FE;
    font-size: 16px;
    color: #fff;
    border: none;
    outline: none;
  }

  .plv-ia-enroll-lottery-add-msg__error--tips {
    height: 32px;
    line-height: 32px;
    background: #FB7272;
    color: #FFFFFF;
    font-size: 14px;
  }

  .plv-ia-enroll-lottery-countdown__content {
    padding-top: 24px;

    >span {
      display: block;
      margin-top: 16px;
      height: 50px;
      line-height: 50px;
      font-size: 36px;
      color: #2671FD;
    }
  }

  .plv-ia-enroll-lottery-add__content--p {
    margin: auto;
    font-size: 16px;
    color: #666;
  }

  .plv-ia-enroll-lottery-submit__content {
    margin-top: 12px;
    padding: 0 24px;
    margin-bottom: 34px;

    >input {
      width: 100%;
      height: 48px;
      padding: 0 16px;
      border-radius: 24px;
      background: #F6F6F6;
      font-size: 16px;
      color: #333333;
      border: none;
      outline: none;
      box-sizing: border-box;
    }

    >input:nth-child(2) {
      margin-top: 16px;
    }

    >p {
      margin: 12px 0 66px;
      line-height: 18px;
      font-size: 12px;
      color: #666;
      text-align: left;
    }

    >button {
      width: 100%;

      &:disabled {
        background: #97C0FE;
      }
    }

    .plv-ia-enroll-lottery-input__wrong {
      color: #FB7272;
    }
  }

  .plv-ia-enroll-lottery-add__success {
    >i {
      width: 60px;
      height: 60px;
      display: block;
      margin: 24px auto;
      background: url(../imgs/icon-enroll-success.png);
      background-size: cover;
    }

    button {
      width: 160px;
      margin: 24px auto 0;
    }
  }

  .plv-ia-enroll-lottery-add__content {
    padding-top: 66px;

    >button {
      width: 160px;
      margin: 66px auto 0;
    }
  }
}
</style>
