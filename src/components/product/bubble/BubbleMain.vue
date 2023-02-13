<template>
  <div
    class="plv-iar-product-bubble__bubble-main"
    :class="{
      'plv-iar-product-bubble__bubble-main--job': isJobType,
      'plv-iar-product-bubble__bubble-main--noCoverJob': isJobType && !good.cover
    }"
  >
    <!-- 商品图片 -->
    <div
      v-if="good.cover"
      class="plv-iar-product-bubble__cover"
    >
      <img :src="good.cover" />
      <span class="plv-iar-product-bubble__cover__number">{{ good.showId }}</span>
    </div>

    <div class="plv-iar-product-bubble__content">
      <!-- 商品名称 -->
      <div
        :title="good.name"
        class="plv-iar-product-bubble__content__name"
      >
        <span
          v-if="!good.cover"
          class="plv-iar-product-bubble__content__number"
        >{{ good.showId }}</span>
        <span>{{ good.name }}</span>
      </div>

      <!-- 商品标签 -->
      <div
        v-if="labels.length"
        class="plv-iar-product-bubble__content__labels"
      >
        <product-label
          v-for="(label, index) in labels"
          :key="index"
          class="plv-iar-product-bubble__content__labels__item"
          :text="label"
          :tag-width="isJobType ? Math.min(label.length * 12, 72) : 52"
        />
      </div>

      <!-- 商品描述 -->
      <div
        v-if="good.productDesc && !isJobType"
        class="plv-iar-product-bubble__content__desc"
        :title="good.productDesc"
      >
        <span>{{ good.productDesc }}</span>
      </div>

      <!-- 价格+购买按钮 -->
      <div class="plv-iar-product-bubble__content__bottom">
        <!-- 普通商品价格 -->
        <template v-if="good.productType === 'normal'">
          <div
            class="plv-iar-product-bubble__content__price"
            :class="{
              'plv-iar-product-bubble__content__price--free': good.realPrice === 0
            }"
          >
            <span>{{ realPrice(good.realPrice) }}</span>
          </div>
          <div class="plv-iar-product-bubble__content__oldprice">{{ oldPrice(good.price) }}</div>
        </template>

        <!-- 金融商品价格 -->
        <template v-if="good.productType === 'finance'">
          <div class="plv-iar-product-bubble__content__price">
            <span>{{ good.yield }}</span>
          </div>
        </template>

        <!-- 金融商品价格 -->
        <template v-if="good.productType === 'job'">
          <div class="plv-iar-product-bubble__content__price">
            <span>{{ good.yield }}</span>
          </div>
        </template>

        <template v-if="isJobType">
          <div class="plv-iar-product-bubble__content__job-group">
            <div class="plv-iar-product-bubble__content__job-group__salary">{{ treatment }}</div>

            <div class="plv-iar-product-bubble__content__job-group__btn">
              <button class="plv-iar-product-bubble__content__job-group__detail" @click="$emit('job-detail', good)">
                {{ iarTrans('product.jobDetail') }}
              </button>
              <buy-button :good="good">
                <template #default="{ buttonText }">
                  <div
                    class="plv-iar-product__item__btn__content pws-iar-product-list-button"
                  >
                    <template v-if="!isJobType">
                      {{ buttonText }}
                    </template>
                    <template v-else>
                      {{ good.btnShow || '投递简历' }}
                    </template>
                  </div>
                </template>
              </buy-button>
            </div>
          </div>
        </template>

        <!-- 购买按钮 -->
        <div
          v-if="!isJobType"
          class="plv-iar-product-bubble__btn"
          :class="{
            'plv-iar-product-bubble__btn--disabled': disabledStatus
          }"
        ></div>
      </div>
    </div>

    <!-- 点击热区 -->
    <div v-if="!isJobType" class="plv-iar-product-bubble__link">
      <buy-button
        class="plv-iar-product-bubble__link__content"
        :good="good"
        :show-disabled="false"
        @disabled-status-change="disabledStatusChange"
      />
    </div>

    <!-- 关闭按钮 -->
    <div class="plv-iar-product-bubble__close" @click="$emit('click-close')"></div>
  </div>
</template>

<script>
import goodMixin from '../good-mixin';
import ProductLabel from '../ProductLabel';
import BuyButton from '../BuyButton/BuyButton.vue';

export default {
  components: {
    ProductLabel,
    BuyButton,
  },

  mixins: [goodMixin],

  data() {
    return {
      disabledStatus: false,
    };
  },

  methods: {
    disabledStatusChange(status) {
      this.disabledStatus = status;
    }
  }
};
</script>

<style lang="scss">
@import '../../../assets/styles/basic.scss';

.plv-iar-product-bubble__bubble-main {
  display: inline-flex;
  background: #fff;
  border-radius: 4px;
  padding: 12px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 0 10px 0 rgba(153, 153, 153, .3);
}

.plv-iar-product-bubble__cover {
  width: 90px;
  height: 90px;
  border-radius: 4px;
  margin-right: 8px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 27px;
    height: 16px;
    line-height: 16px;
    color: #fff;
    background: rgba(0, 0, 0, 0.35);
    text-align: center;
    font-size: 12px;
    border-radius: 0 0 6px 0;
  }
}

.plv-iar-product-bubble__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.plv-iar-product-bubble__content__name {
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
  color: #333;
  @include text-singleline;
}
.plv-iar-product-bubble__content__number {
  display: inline-block;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  min-width: 27px;
  text-align: center;
  padding: 0 3px;
  border-radius: 4px;
  background: rgba(0, 0, 0, .35);
  color: #fff;
  margin-right: 2px;
  box-sizing: border-box;
}

.plv-iar-product-bubble__content__labels {
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}
.plv-iar-product-bubble__content__labels__item {
  background: rgba(255, 143, 17, 0.08);
  border-radius: 4px;
  color: #FF8F11;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
}

.plv-iar-product-bubble__content__desc {
  font-size: 12px;
  color: #333;
  opacity: .6;
  @include text-singleline;
}

.plv-iar-product-bubble__content__bottom {
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
}
.plv-iar-product-bubble__content__price {
  color: #FF6666;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
}
.plv-iar-product-bubble__content__oldprice {
  color: #B2B2B2;
  font-size: 12px;
  line-height: 16px;
  margin-left: 2px;
  margin-right: 8px;
  text-decoration: line-through;
  flex: 1;
  @include text-singleline;
}

.plv-iar-product-bubble__btn {
  display: block;
  width: 24px;
  height: 24px;
  text-decoration: none;
  background-image: url(./imgs/icon-bubble.png);
  background-size: contain;
  outline: none;
  margin-left: auto;

  &.plv-iar-product-bubble__btn--disabled {
    background-image: url(./imgs/icon-bubble-disabled.png);
  }
}

.plv-iar-product-bubble__link {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
}
.plv-iar-product-bubble__link__content {
  width: 100%;
  height: 100%;
}

.plv-iar-product-bubble__close {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background-image: url(./imgs/icon-close-bubble.png);
  background-size: 8px 8px;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 30;
}

.plv-iar-product__item__btn__content {
  display: block;
  min-width: 72px;
  height: 28px;
  line-height: 28px;
  border-radius: 4px;
  color: #fff;
  background: #FF6666;
  font-size: 14px;
  text-decoration: none;
  outline: none;
  position: relative;
  padding: 0 8px;
  box-sizing: border-box;
  text-align: center;
}

.plv-iar-product-bubble__bubble-main--job {
  .plv-iar-product-bubble__content__labels {
    margin-bottom: 8px;
    flex-wrap: wrap;
  }

  .plv-iar-product-bubble__content__labels__item {
    margin-bottom: 2px;
    text-align: center;
  }

  .plv-iar-product__label__content {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .plv-iar-product-bubble__cover {
    width: 104px;
    height: 104px;
  }

  .plv-iar-product-bubble__content__labels__item {
    color: #333;
    background: rgba(51, 51, 51, 0.1);
  }

  .plv-iar-product-bubble__content__job-group__salary {
    color: #FF6666;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    align-self: flex-start;
    margin-bottom: 4px;
  }

  .plv-iar-product-bubble__content__job-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .plv-iar-product-bubble__content__job-group__btn {
    display: flex;
    align-self: flex-end;
  }

  .plv-iar-product-bubble__content__name {
    margin-bottom: 8px;
    line-height: 22px;
  }

  .plv-iar-product-bubble__content__job-group__detail {
    width: 64px;
    height: 23px;
    box-sizing: border-box;
    line-height: 23px;
    min-width: 64px;
    padding: 0;
    margin-right: 5px;
    background: transparent;
    border: 1px solid #F15D5D;
    cursor: pointer;
    border-radius: 456px;
    color: #F15D5D;
    font-size: 12px;
    text-align: center;

    div {
      width: 100%;
    }
  }

  .plv-iar-product__item__btn__content {
    width: 64px;
    height: 23px;
    line-height: 23px;
    text-align: center;
    border-radius: 456px;
    font-size: 12px;

    div {
      width: 100%;
    }
  }
}

.plv-iar-product-bubble__bubble-main--noCoverJob {
  .plv-iar-product-bubble__content__job-group {
    flex-direction: row;
  }

  .plv-iar-product-bubble__content__job-group__salary {
    margin-bottom: 0;
  }
}
</style>
