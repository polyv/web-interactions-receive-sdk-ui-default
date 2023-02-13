<template>
  <div class="plv-demo-seat-table">
    <mobile-seat-table v-if="seatTableSdk" :seat-table="seatTableSdk" />
  </div>
</template>

<script>
import mixin from './mixin';
import MobileSeatTable from '../../entry/seat-table/MobileSeatTable.vue';

export default {
  components: {
    MobileSeatTable,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-demo-seat-table {
  height: 600px;
}
</style>
