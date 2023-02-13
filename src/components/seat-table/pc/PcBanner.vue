<template>
  <div class="plv-iar-seat-table__banner">
    <div v-if="!seatBanner" class="plv-iar-seat-table__banner__content">
      <div class="plv-iar-seat-table__banner__content__placeholder pws-seat-table-placeholder-img"></div>
      <div class="plv-iar-seat-table__banner__content__text pws-seat-table-placeholder-text">{{ iarTrans('seatTable.placeEnter') }}</div>
      <pc-button
        class="plv-iar-seat-table__banner__content__button"
        @click="$emit('to-save')"
      >
        {{ iarTrans('seatTable.enterSeat') }}
      </pc-button>
    </div>

    <img
      v-if="seatBanner"
      class="plv-iar-seat-table__banner__img"
      :src="seatBanner"
      @click="$emit('to-save')"
    />
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
import PcButton from '../../common/button/PcButton.vue';

export default {
  components: {
    PcButton,
  },

  mixins: [basicMixin],

  props: {
    seatBanner: {
      type: String,
      default: ''
    },
  },
};
</script>

<style lang="scss">
.plv-iar-seat-table__banner {
  width: 100%;
  height: 100%;
}
.plv-iar-seat-table__banner__img {
  width: 100%;
}
.plv-iar-seat-table__banner__content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 80px;
  box-sizing: border-box;
}
.plv-iar-seat-table__banner__content__placeholder {
  width: 88px;
  height: 88px;
  background-image: url(./imgs/placeholder.png);
  background-size: 100% 100%;
}
.plv-iar-seat-table__banner__content__text {
  font-size: 14px;
  margin-top: 8px;
  color: rgba(#000, 0.4);
}
.plv-iar-seat-table__banner__content__button {
  margin-top: 32px !important;
}
</style>
