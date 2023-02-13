<template>
  <div class="plv-demo-seat-table">
    <pc-seat-table v-if="seatTableSdk" ref="seat" :seat-table="seatTableSdk" />
  </div>
</template>

<script>
import mixin from './mixin';
import PcSeatTable from '../../entry/seat-table/PcSeatTable.vue';
import debounce from 'lodash-es/debounce';
import { BEFORE_DESTROY } from '@/assets/utils/compat';

export default {
  components: {
    PcSeatTable,
  },

  mixins: [mixin],

  created() {
    window.addEventListener('scroll', this.handleScroll);
  },

  [BEFORE_DESTROY]() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    /** 防抖处理滚动事件 */
    handleScroll: debounce(function() {
      this.checkAvatarLazyLoad();
    }, 200),

    checkAvatarLazyLoad() {
      this.$refs.seat.checkAvatarLazyLoad();
    },
  }
};
</script>
