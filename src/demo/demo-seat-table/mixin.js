import { SeatTable } from '@polyv/interactions-receive-sdk';

export default {
  data() {
    return {
      /** 座位表 sdk 实例 */
      seatTableSdk: null,
    };
  },
  mounted() {
    this.seatTableSdk = new SeatTable();
  },
};
