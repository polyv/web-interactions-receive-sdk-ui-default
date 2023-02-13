export default {
  data() {
    return {
      // 记录浏览过的商品 id
      recordBrowseId: {},
    };
  },

  methods: {
    /**
     * 检查商品浏览状态
     */
    checkBrowseProduct() {
      this.$nextTick(() => {
        const $productContent = this.$refs.productContent;
        const scrollTop = $productContent.scrollTop;
        const scrollClientHeight = $productContent.clientHeight;
        const items = this.$refs.productItem;

        if (!items) {
          return;
        }

        items.forEach((vm) => {
          const productId = vm.good.productId;

          const $el = vm.$el;
          const offsetTop = $el.offsetTop;
          const offsetHeight = $el.offsetHeight;
          // 是否超出顶部
          const overTop = scrollTop > (offsetTop + offsetHeight);
          // 是否超出底部
          const overBottom = (scrollClientHeight + scrollTop) < (offsetTop + offsetHeight);

          // 回调过一次就不需要再回调
          if (!overTop && !overBottom && !this.recordBrowseId[productId]) {
            this.recordBrowseId[productId] = true;
            this.$emit('browse-product', vm.good);
          }
        });
      });
    },
  },
};
