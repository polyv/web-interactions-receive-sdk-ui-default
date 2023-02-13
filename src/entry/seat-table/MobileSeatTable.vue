<template>
  <div class="plv-iar-seat-table pws-seat-table-bg">
    <mobile-welcome
      v-if="currentWelcome"
      :nick-name="currentWelcome"
    />
    <mobile-banner
      v-if="innerViewerSeatEnabled === 'N'"
      :seat-banner="seatBanner"
      @to-save="saveSeat"
    />
    <template v-if="innerViewerSeatEnabled === 'Y'">
      <div
        class="plv-iar-seat-table__list__wrap plv-iar-seat-table__scroll"
        @scroll="handleScroll"
      >
        <mobile-light />
        <seat-table-list
          ref="seatList"
          :seat-list="seatList"
          :seat-total="seatTotal"
          :special-count="specialCount"
        />
      </div>
    </template>
    <enter-tip
      v-if="showTips"
      :current-seat="currentSeat"
      :seat-total="seatTotal"
      :special-count="specialCount"
      @close="showTips = false"
    />
  </div>
</template>

<script>
import mixin from './mixin';
import MobileWelcome from '../../components/seat-table/mobile/MobileWelcome.vue';
import MobileBanner from '../../components/seat-table/mobile/MobileBanner.vue';
import MobileLight from '../../components/seat-table/mobile/MobileLight.vue';
import SeatTableList from '../../components/seat-table/SeatTableList.vue';
import EnterTip from '../../components/seat-table/EnterTip.vue';

export default {
  components: {
    MobileWelcome,
    MobileBanner,
    MobileLight,
    SeatTableList,
    EnterTip,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-iar-seat-table {
  height: 100%;
  background: #202127;
  position: relative;
}

.plv-iar-seat-table__list__wrap {
  height: 100%;
  position: relative;
}
.plv-iar-seat-table__scroll {
  overflow-y: auto;
}

.plv-iar-seat-table__cell__empty {
  background-image: url(../../components/seat-table/mobile/imgs/seat.svg);
}
</style>
