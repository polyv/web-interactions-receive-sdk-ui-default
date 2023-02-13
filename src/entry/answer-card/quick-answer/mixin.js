export default {
  computed: {
    btnDisabled() {
      return !this.selectedOptions || !this.selectedOptions.length || this.isSubmitting || this.status === 'SUBMITTED';
    },

    // 偶数个选项
    isEvenLen() {
      const len = this.options && this.options.length;

      if (len % 2 === 0) { return true; }
      return false;
    },

    options() {
      return this.question && this.question.options;
    },
  },
};
