<template>
  <div class="plv-iar-seat-table__list">
    <div
      class="plv-iar-seat-table__special"
      :style="{
        marginBottom: `${computeStyle(36)}px`,
        paddingTop: `${computeStyle(106)}px`,
      }"
    >
      <div
        v-for="(item, index) in specialSeats"
        :key="`special-${index}`"
        class="plv-iar-seat-table__special__item"
        :style="getItemStyle(item, false)"
      >
        <seat-table-cell
          v-if="wrapWidth"
          ref="cell"
          :index="index"
          :viewer-info="item"
        />
      </div>
    </div>
    <div
      class="plv-iar-seat-table__list__inner"
      :style="{
        paddingLeft: `${computeStyle(7.5)}px`,
        paddingRight: `${computeStyle(7.5)}px`,
      }"
    >
      <div
        v-for="(item, index) in formatOrdinarySeats"
        :key="`ordinary-${index}`"
        class="plv-iar-seat-table__list__item"
        :style="getItemStyle(item)"
      >
        <seat-table-cell
          v-if="wrapWidth"
          ref="cell"
          :index="index"
          :viewer-info="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SeatTableCell from './SeatTableCell.vue';
import ResponsiveMixin from './responsive-mixin';

export default {
  components: {
    SeatTableCell,
  },

  mixins: [ResponsiveMixin],

  props: {
    seatList: {
      type: Array,
      default: () => ([])
    },
    specialCount: {
      type: Number,
      default: 4,
    },
    // 座位尺寸
    seatSize: {
      type: Number,
      default: 36,
    },
    // 列数
    columnNumber: {
      type: Number,
      default: 6,
    },
    // 行数
    rowNumber: {
      type: Number,
      default: 3,
    },
  },

  computed: {
    itemStyle() {
      return {
        width: `${this.computeStyle(this.seatSize)}px`,
      };
    },

    // 特殊座位
    specialSeats() {
      return this.seatList.filter((item, index) => index < this.specialCount);
    },

    // 普通座位
    ordinarySeats() {
      return this.seatList.filter((item, index) => index >= this.specialCount);
    },

    formatOrdinarySeats() {
      // 上一刻的商
      let prevMerchant = -1;
      return this.ordinarySeats.map((item, index) => {
        // 是否加重左侧距离
        const isAggravateLeft = index % 3 === 0;
        // 是否加重右侧距离
        const isAggravateRight = (index + 1) % 3 === 0;
        // 是否加重底部距离
        let isAggravateBottom = false;
        if (index / this.columnNumber - prevMerchant === this.rowNumber) {
          isAggravateBottom = true;
          prevMerchant = index / this.columnNumber;
        }

        return {
          ...item,
          isAggravateLeft,
          isAggravateRight,
          isAggravateBottom,
        };
      });
    },
  },

  methods: {
    getCellRefs() {
      return this.$refs.cell;
    },
    getItemStyle(item, marginBottom = true) {
      const style = {
        width: `${this.computeStyle(this.seatSize)}px`,
        marginLeft: `${this.computeStyle(8)}px`,
        marginRight: `${this.computeStyle(8)}px`,
      };

      if (item.isAggravateLeft) {
        style.marginLeft = `${this.computeStyle(20)}px`;
      }

      if (item.isAggravateRight) {
        style.marginRight = `${this.computeStyle(20)}px`;
      }

      if (marginBottom) {
        const size = item.isAggravateBottom ? 36 : 18;
        style.marginBottom = `${this.computeStyle(size)}px`;
      }

      return style;
    },
  },
};
</script>

<style lang="scss">
.plv-iar-seat-table__list {
  position: relative;
  z-index: 2;
}
.plv-iar-seat-table__special {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.plv-iar-seat-table__list__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
