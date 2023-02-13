// @file 商品信息Item公用mixin
import { tryParseJSON } from '@polyv/utils/src/lang';
import basicMixin from '../../assets/mixins/basic';

export default {
  mixins: [basicMixin],

  inject: ['productVm'],

  data() {
    return {
      labels: []
    };
  },

  props: {
    good: {
      type: Object,
      default: () => ({})
    },
    number: {
      type: Number,
      default: 1,
    }
  },

  watch: {
    good: {
      immediate: true,
      handler() {
        this.parseFeatures();
      },
    }
  },

  computed: {
    linkType() {
      return Number(this.good.linkType || 10);
    },

    params() {
      try {
        return JSON.parse(this.good.params);
      } catch (e) {
        return {};
      }
    },

    treatment() {
      return this.params.treatment;
    },

    isJobType() {
      return this.good.productType === 'position';
    }
  },

  methods: {
    parseFeatures() {
      if (!this.good.features) { return; }
      this.labels = (tryParseJSON(this.good.features) || []).filter((text) => text);
    },

    oldPrice(price) {
      return price ? `￥${price}` : '';
    },

    realPrice(price) {
      return price ? `￥${price}` : this.iarTrans('product.free');
    },

    clickDescEnter() {
      this.productVm.emitClickGoodDesc(this.good);
    }
  },

  mounted() {
    this.parseFeatures();
  },
};
