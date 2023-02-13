<!-- 点击页面报名抽奖，填写报名信息 -->
<template>
  <div class="plv-ia-enroll-lottery-add-msg">
    <template v-if="enrollProcess === 'unenrolled'">
      <img src="../imgs/icon-winner.png" />
      <p class="plv-ia-enroll-lottery-add__content--prize">{{ iarTrans('enrollLottery.prize') }}：{{ prize }}</p>
      <p class="plv-ia-enroll-lottery-add__content--countdown">{{ iarTrans('enrollLottery.countdown') }} <span>{{ count }}</span></p>
      <ul class="plv-ia-enroll-lottery-submit__content">
        <li>
          <span>{{ iarTrans('enrollLottery.name') }}：</span>
          <div :class="['plv-ia-enroll-lottery-add-msg__input', { 'plv-ia-enroll-lottery-input__wrong': wrongName }]">
            <input
              v-model="name"
              type="text"
              :placeholder="iarTrans('enrollLottery.enterName')"
              maxlength="30"
              @focus="wrongName = false"
              @blur="nameInputBlur"
            />
            <span>{{ name.length }}/30</span>
          </div>
        </li>
        <li>
          <span>{{ iarTrans('enrollLottery.phone') }}：</span>
          <div>
            <input
              v-model="mobile"
              type="tel"
              :class="['plv-ia-enroll-lottery-add-msg__input', { 'plv-ia-enroll-lottery-input__wrong': wrongTel }]"
              :placeholder="iarTrans('enrollLottery.enterPhone')"
              @blur="checkPhone"
              @focus="wrongTel = false"
              @keyup="onlyNumber"
            />
            <p v-if="enrolled" class="plv-ia-enroll-lottery__error--tips"><span>!</span>{{ iarTrans('enrollLottery.beenRegistered') }}</p>
          </div>
        </li>
      </ul>
      <button class="pws-btn-bg-color" :disabled="!submitEnabled" @click="submitMessage">{{ iarTrans('enrollLottery.submit') }}</button>
      <p class="plv-ia-enroll-lottery__tips"><i></i>{{ iarTrans('enrollLottery.ensureInfo') }}</p>
    </template>
    <template v-else-if="enrollProcess === 'success'">
      <div class="plv-ia-enroll-lottery-add__success">
        <i></i>
        <p>{{ iarTrans('enrollLottery.regSuccess') }}</p>
        <button class="pws-btn-bg-color" @click="$emit('close-modal')">{{ iarTrans('enrollLottery.sure') }}</button>
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
  padding: 32px 0 24px;
  text-align: center;
  font-size: 14px;

  >img {
    width: 60px;
    height: 60px;
    display: block;
    margin: 0 auto;
  }

  .plv-ia-enroll-lottery-add__content--prize {
    color: #333;
    margin: 16px auto 8px;
  }

  .plv-ia-enroll-lottery-add__content--countdown {
    color: #757575;
    >span {
      color: #2671FD;
      font-weight: bold;
    }
  }

  .plv-ia-enroll-lottery-add-msg__error--tips {
    height: 32px;
    line-height: 32px;
    background: #FB7272;
    color: #FFFFFF;
    font-size: 14px;
  }

  .plv-ia-enroll-lottery-submit__content {
    padding-top: 12px;
    >li {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      padding-right: 95px;

      >div {
        position: relative;
      }

      >span {
        line-height: 40px;
        text-align: right;
        color: #333;
      }

      input {
        outline: none;
        background: transparent;
      }

      .plv-ia-enroll-lottery-add-msg__input {
        width: 320px;
        height: 40px;
        padding: 0 8px;
        border-radius: 2px;
        border: 1px solid #CFD8DC;
        flex-shrink: 0;
        display: flex;
        align-items: center;

        >input {
          height: 100%;
          border: none;
          flex: 1;
        }
        span {
          width: 34px;
          font-size: 12px;
          color: #9E9E9E;
          text-align: right;
        }
      }

      .plv-ia-enroll-lottery-input__wrong {
        border: 1px solid #FF5722;
        background: #FFE9E9;
      }
    }
  }

  .plv-ia-enroll-lottery__tips {
    padding: 0 24px;
    font-size: 12px;
    color: #757575;

    >i {
      display: inline-block;
      margin: 1px 4px 0 0;
      background: url('../imgs/icon-enroll-tips.png');
      width: 14px;
      height: 14px;
      background-size: cover;
      vertical-align: text-top;
    }
  }

  .plv-ia-enroll-lottery__error--tips {
    position: absolute;
    color: #FF5722;

    >span {
      width: 16px;
      height: 16px;
      display: inline-block;
      margin: 4px 4px 0 0;
      padding-top: 2px;
      background: #ff5722;
      color: #fff;
      font-size: 12px;
      border-radius: 8px;
      vertical-align: text-bottom;
      box-sizing: border-box;
    }
  }

  button {
    width: 96px;
    height: 32px;
    line-height: 32px;
    margin: 24px auto;
    display: block;
    border-radius: 18px;
    color: #fff;
    background: #3082FE;
    cursor: pointer;
    border: none;
    outline: none;

    &:disabled {
      background: #97C0FE;
      cursor: not-allowed;
    }
  }

  .plv-ia-enroll-lottery-add__success {
    >i {
      width: 60px;
      height: 60px;
      display: block;
      margin: 70px auto 24px;
      background-image: url('../imgs/icon-enroll-success.png');
      background-size: cover;
    }

    >p {
      color: #333;
    }

    button {
      background: #2196F3;
    }
  }
}

</style>
