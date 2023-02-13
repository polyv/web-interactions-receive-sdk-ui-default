<template>
  <div
    class="plv-iar-product-job"
    :class="{
      'plv-iar-product-job--mobile': useMobileClass
    }"
  >
    <product-job
      :logo-img="jobDetail.cover"
      :title="jobDetail.name"
      :tags="tags"
      :salary="treatment"
      :textarea-content="jobDetail.productDesc"
      @click-send="$emit('click-send', jobDetail)"
    >
      <buy-button slot="send-btn" :good="jobDetail">
        <template>
          <div
            class="plv-iar-product-job__btn"
          >
            {{ jobDetail.btnShow || '投递简历' }}
          </div>
        </template>
      </buy-button>
    </product-job>
  </div>
</template>

<script>
import productJob from '../../components/product/job/detail.vue';
import BuyButton from '../../components/product/BuyButton/BuyButton.vue';
import productBaseMixin from '../../components/product/base-mixin';

export default {
  components: {
    productJob,
    BuyButton
  },

  mixins: [productBaseMixin],

  props: {
    jobDetail: {
      type: Object,
      default: () => {
        return {
          cover: '',
          name: '',
          tags: [],
          params: ''
        };
      }
    },

    useMobileClass: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    tags() {
      let tags;
      try {
        tags = JSON.parse(this.jobDetail.features);
      } catch (e) {
        tags = [];
      }

      return tags;
    },

    params() {
      try {
        return JSON.parse(this.jobDetail.params);
      } catch (e) {
        return {};
      }
    },

    treatment() {
      return this.params.treatment || '';
    },
  },
};
</script>

<style scoped lang="scss">
.plv-iar-product-job {
  display: flex;
  min-height: 400px;
  height: 100%;
  width: 100%;

  .plv-iar-product__buy-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.plv-iar-product-job--mobile {
  min-height: initial;

  .plv-iar-product-job-detail__main {
    padding: 0;
  }

  .plv-iar-product-job-detail__bottom-fixed {
    height: 72px;
  }

  .plv-iar-product-job__btn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 1364px;
  }

  .plv-iar-product-job-detail__main {
    padding: 16px 16px 0 16px;
  }

  .plv-iar-product-job-detail__bottom-fixed {
    height: 72px;

    .plv-iar-product__buy-button {
      width: calc(100% - 32px);
    }
  }
}

</style>
