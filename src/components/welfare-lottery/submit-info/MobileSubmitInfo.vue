<!-- 提交中奖人信息移动端组件 -->
<template>
  <div class="plv-iar-welfare-lottery__submit-info">
    <p class="plv-iar-welfare-lottery__submit-info__tips">{{ received ? iarTrans('welfareLottery.receivedInformation') : iarTrans('welfareLottery.fillInformation') }}</p>

    <div class="plv-iar-welfare-lottery__submit-info__form-wrap" :class="{'plv-iar-welfare-lottery__submit-info__form-wrap--fix-auto': overFlowUnset}">
      <form ref="submitForm" class="plv-iar-welfare-lottery__submit-info__form">
        <div
          v-for="(field, index) in collectInfo"
          :key="index"
          class="plv-iar-welfare-lottery__submit-info__form__field"
        >
          <label>
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
              :placeholder="requiredText(field) + fieldPlaceholder(field)"
              :class="{
                'plv-iar-welfare-lottery__submit-info__form__field__input--err': fieldErr(field)
              }"
              @keyup="(e) => onInputKeyup(e, field, index)"
              @blur="(e) => onBlur(e, field, index)"
              @click="onClickInput(field, index)"
            />
            <span v-if="!received && field.value" class="plv-iar-welfare-lottery__submit-info__input__del" @click="cleanValue(field)"></span>
            <span v-if="fieldErrTips(field)" class="plv-iar-welfare-lottery__submit-info__form__field__err-tips">{{ fieldErrTips(field) }}</span>
          </label>
        </div>
      </form>
    </div>

    <div v-if="!received" class="plv-iar-welfare-lottery__submit-info__footer">
      <welfare-lottery-btn
        class="plv-iar-welfare-lottery__submit-info__btn pws-btn-bg-color"
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
import { BEFORE_DESTROY } from '@/assets/utils/compat';

let windowInnerHeight = window.innerHeight;
export default {
  components: {
    WelfareLotteryBtn,
  },

  mixins: [mixin],
  data() {
    return {
      showKeyboard: false,
      isLandscape: false
    };
  },
  computed: {
    overFlowUnset() {
      return this.isLandscape && this.showKeyboard;
    }
  },
  mounted() {
    this.bindEventHandle();
    this.onOrientationChange();
  },
  [BEFORE_DESTROY]() {
    this.unBindEventHandle();
  },
  methods: {
    bindEventHandle() {
      window.addEventListener(
        'onorientationchange' in window ? 'orientationchange' : 'resize',
        this.onOrientationChange,
        false
      );
      // 监听软盘是否显示， 软盘中点击完成/确认，会收起软盘，不会触发blur事件
      window.addEventListener('resize', this.onInnerHeightChange, false);
      // 输入框聚焦时，软盘升起
      this.$refs.submitForm.addEventListener('focus', () => {
        this.showKeyboard = true;
      }, true);
      this.$refs.submitForm.addEventListener('blur', () => {
        this.showKeyboard = false;
      }, true);

    },
    unBindEventHandle() {
      window.removeEventListener(
        'onorientationchange' in window ? 'orientationchange' : 'resize',
        this.onOrientationChange,
        false
      );
      // 窗口尺寸改变
      window.addEventListener('resize', this.onInnerHeightChange, false);
    },
    onInnerHeightChange(e) {
      // 对比软盘升起/收起的前后高度变化，判断是否软盘是否存在
      const target = e.target;
      if (Math.abs(target.innerHeight - windowInnerHeight) > 140) {
        this.showKeyboard = target.innerHeight < windowInnerHeight;
      }
      windowInnerHeight = target.innerHeight;
    },
    onOrientationChange() {
      setTimeout(() => {
        const mql = window.matchMedia('(orientation: portrait)');
        this.isLandscape = !mql?.matches;
      }, 200);
    },
    beforeOnBlur(e, field, index) {
      this.inFocus = false;
      this.onBlur(e, field, index);
    },
    beforeOnFocus() {
      this.inFocus = true;
    }
  }
};
</script>

<style lang="scss">
.plv-iar-welfare-lottery__submit-info {
  padding: 12px 0;
  text-align: center;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.plv-iar-welfare-lottery__submit-info__tips {
  color: #666;
  font-size: 14px;
  margin: 0;
  margin-bottom: 24px;
}
.plv-iar-welfare-lottery__submit-info__form-wrap {
  padding: 0 24px;
  overflow: auto;
  flex-grow: 1;
}
.plv-iar-welfare-lottery__submit-info__form-wrap--fix-auto {
  overflow: unset;
}
.plv-iar-welfare-lottery__submit-info__form__field {
  position: relative;
  margin-bottom: 16px;
  input {
    width: 100%;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    padding: 0 16px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, .3);
    border-radius: 24px;
    border: 1px solid #FFB299;
    outline: none;
    color: #333333;
    &::placeholder {
      color: #B2B2B2;
    }
  }
}

.plv-iar-welfare-lottery__submit-info__form__field__input {
  &--err {
    +.plv-iar-welfare-lottery__submit-info__form__field__err-tips {
      display: block;
    }
  }
}

.plv-iar-welfare-lottery__submit-info__input__del {
  position: absolute;
  top: 16px;
  right: 12px;
  width: 16px;
  height: 16px;
  background-image: url(./btn-del.png);
  background-repeat: no-repeat;
  background-size: contain;
}

.plv-iar-welfare-lottery__submit-info__form__field__err-tips {
  display: none;
  position: absolute;
  left: 18px;
  color: #f86665;
  font-size: 12px;
  line-height: 17px;
}

.plv-iar-welfare-lottery__submit-info__footer {
  padding: 21px 24px 0 24px;

  .plv-iar-welfare-lottery__submit-info__btn {
    // background: #FF5722;
    &:active {
      background: #FF5722;
    }
    // &:disabled {
    //   background: rgba(#FF5722, 0.6);
    // }
  }
}
</style>
