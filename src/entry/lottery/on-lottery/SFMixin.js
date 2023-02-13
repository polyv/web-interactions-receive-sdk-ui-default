export default {
  props: {
    memberList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    scrollSpeed: {
      type: Number,
      default: 2
    }
  },
  // computed: {
  //   scrollSpeed() {
  //     const rowCount = Math.floor(this.memberList.length / 3);
  //     if (rowCount < 4) {
  //       return 2;
  //     } else {
  //       console.log('scrollSpeed', ((rowCount - 4) * 0.8).toFixed(1) * 1 + 2);
  //       return ((rowCount - 4) * 0.8).toFixed(1) * 1 + 2;
  //     }
  //   }
  // }
};
