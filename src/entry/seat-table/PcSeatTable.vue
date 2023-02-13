<template>
  <div class="plv-iar-seat-table">
    <pc-welcome
      v-if="currentWelcome"
      :nick-name="currentWelcome"
    />
    <pc-banner
      v-if="innerViewerSeatEnabled === 'N'"
      :seat-banner="seatBanner"
      @to-save="saveSeat"
    />
    <template v-if="innerViewerSeatEnabled === 'Y'">
      <div class="plv-iar-seat-table__wrap">
        <pc-light />
        <seat-table-list
          ref="seatList"
          :seat-list="seatList"
          :seat-total="seatTotal"
          :special-count="specialCount"
          :force-wrap-width="375"
          :seat-size="52"
          :column-number="12"
        />
      </div>
    </template>
    <enter-tip
      v-if="showTips"
      :current-seat="currentSeat"
      :seat-total="seatTotal"
      :special-count="specialCount"
      :column-number="12"
      @close="showTips = false"
    />
  </div>
</template>

<script>
import mixin from './mixin';
import PcWelcome from '../../components/seat-table/pc/PcWelcome.vue';
import PcBanner from '../../components/seat-table/pc/PcBanner.vue';
import PcLight from '../../components/seat-table/pc/PcLight.vue';
import SeatTableList from '../../components/seat-table/SeatTableList.vue';
import EnterTip from '../../components/seat-table/EnterTip.vue';

export default {
  components: {
    PcWelcome,
    PcBanner,
    PcLight,
    SeatTableList,
    EnterTip,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-iar-seat-table {
  position: relative;
}

.plv-iar-seat-table__wrap {
  width: 928px;
  margin: 0 auto;
}

.plv-iar-seat-table__cell__empty {
  background-image: url(../../components/seat-table/pc/imgs/seat.svg);
}
.plv-iar-seat-table__cell__user__avatar {
  border: none;
}
.plv-iar-seat-table__cell__user__avatar__out {
  width: 62px;
  height: 62px;
}
</style>
