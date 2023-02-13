<template>
  <div
    class="plv-iar-seat-table__enter-tip"
    :class="{
      'plv-iar-seat-table__enter-tip--pc': !isMobile
    }"
  >
    <div v-if="!seatText" class="plv-iar-seat-table__enter-tip__no-seat">
      <span>{{ iarTrans('seatTable.emptySeat') }}</span>
    </div>
    <div v-if="seatText" class="plv-iar-seat-table__enter-tip__success">
      <div class="plv-iar-seat-table__enter-tip__success__icon"></div>
      <div class="plv-iar-seat-table__enter-tip__success__title">{{ iarTrans('seatTable.welcomeEnter') }}</div>
      <div class="plv-iar-seat-table__enter-tip__success__desc">
        {{ iarTrans('seatTable.yourSeat') }}<span>{{ seatText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import basicMixin from '../../assets/mixins/basic';
import { isMobile } from '@polyv/utils/src/browser';
import { BEFORE_DESTROY } from '@/assets/utils/compat';

export default {
  mixins: [basicMixin],

  props: {
    specialCount: {
      type: Number,
      default: 0,
    },
    currentSeat: {
      type: [Number, undefined],
      default: undefined,
    },
    seatTotal: {
      type: Number,
      default: 220,
    },
    // 列数
    columnNumber: {
      type: Number,
      default: 6,
    },
  },

  data() {
    return {
      closeTimer: undefined,
      isMobile: isMobile(),
    };
  },

  computed: {
    seatText() {
      // 超出总座位数
      if (typeof this.currentSeat !== 'number' || this.currentSeat > this.seatTotal) {
        return '';
      }
      // 变成从 0 开始的索引值
      const num = this.currentSeat - this.specialCount - 1;
      let row = Math.floor(num / this.columnNumber) + 2;
      let column = num % this.columnNumber + 1;
      if (this.currentSeat <= this.specialCount) {
        row = 1;
        column = this.currentSeat;
      }
      return this._useLang === 'zh_CN' ?
        `${row}${this.iarTrans('seatTable.row')}${column}${this.iarTrans('seatTable.column')}` :
        `${this.iarTrans('seatTable.row')} ${row} ${this.iarTrans('seatTable.column')} ${column}`;
    },
  },

  mounted() {
    if (!this.isMobile) {
      document.body.appendChild(this.$el);
    }
    this.closeTimer = setTimeout(() => {
      this.$emit('close');
    }, 3000);
  },

  [BEFORE_DESTROY]() {
    this.$el.parentNode?.removeChild(this.$el);
    clearTimeout(this.closeTimer);
  },
};
</script>

<style lang="scss">
.plv-iar-seat-table__enter-tip {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.12);
  pointer-events: none;
}
.plv-iar-seat-table__enter-tip--pc {
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
}
.plv-iar-seat-table__enter-tip__no-seat {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
  &::before {
    content: '';
    width: 24px;
    height: 24px;
    margin-right: 8px;
    background-image: url(./imgs/icon-weep.png);
    background-size: 100% 100%;
  }
}
.plv-iar-seat-table__enter-tip__success {
  width: 212px;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.plv-iar-seat-table__enter-tip__success__icon {
  width: 40px;
  height: 40px;
  background-image: url(./imgs/success.png);
  background-size: 100% 100%;
  margin-bottom: 8px;
}
.plv-iar-seat-table__enter-tip__success__title {
  font-size: 18px;
  color: #333;
  margin-bottom: 4px;
}
.plv-iar-seat-table__enter-tip__success__desc {
  font-size: 14px;
  color: #666;
  span {
    color: #3082FE;
    margin-left: 4px;
  }
}
</style>
