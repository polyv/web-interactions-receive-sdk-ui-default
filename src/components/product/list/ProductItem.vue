<template>
  <div
    class="plv-iar-product__item pws-iar-product-list-item"
    :class="{
      'plv-iar-product__item--job': isJobType,
      'plv-iar-product__item--noCoverJob': isJobType && !good.cover
    }"
  >
    <!-- 商品图片 -->
    <div
      v-if="good.cover"
      class="plv-iar-product__item__cover pws-iar-product-list-cover"
    >
      <img :src="good.cover" />
      <span class="plv-iar-product__item__cover__number pws-iar-product-list-cover-number">{{ number }}</span>
    </div>

    <div class="plv-iar-product__item__info">
      <!-- 商品名称 -->
      <div
        :title="good.name"
        class="plv-iar-product__item__name"
      >
        <!-- 序号 -->
        <span
          v-if="!good.cover"
          class="plv-iar-product__item__name__number pws-iar-product-list-number"
        >{{ number }}</span>
        <!-- 名称 -->
        <span class="plv-iar-product__item__name__text pws-product-theme-text-color">{{ good.name }}</span>
        <!-- 详情入口 -->
        <div
          v-if="productVm.descLabel && good.productDesc && good.productType !== 'position'"
          class="plv-iar-product__item__name__desc pws-iar-product-list-desc-label"
          @click="clickDescEnter"
        >
          <span>{{ productVm.descLabel }}</span>
          <span class="plv-iar-product__item__name__desc__icon pws-iar-product-list-right-arrow"></span>
        </div>
      </div>

      <!-- 商品标签 -->
      <div
        v-if="labels.length"
        class="plv-iar-product__item__labels"
      >
        <product-label
          v-for="(label, index) in labels"
          :key="index"
          class="plv-iar-product__item__labels__item"
          :class="{
            'plv-iar-product__item__labels__item--job': good.productType === 'position'
          }"
          :enable-watch-skin="isJobType"
          :max-width="isJobType ? Math.min(label.length * 12.1, 80) : 0"
          :text="label"
        />
      </div>

      <!-- 商品描述 -->
      <div
        v-if="good.productDesc && good.productType !== 'position'"
        class="plv-iar-product__item__desc pws-iar-product-list-desc"
        :class="{
          'plv-iar-product__item__desc--pr': labels.length
        }"
        :title="good.productDesc"
      >
        <span>{{ good.productDesc }}</span>
      </div>

      <!-- 价格+购买按钮 -->
      <div class="plv-iar-product__item__bottom">
        <!-- 普通商品价格 -->
        <template v-if="good.productType === 'normal'">
          <div
            class="plv-iar-product__item__price"
            :class="{
              'plv-iar-product__item__price--free': good.realPrice === 0
            }"
          >
            <span>{{ realPrice(good.realPrice) }}</span>
          </div>
          <div class="plv-iar-product__item__oldprice pws-body-font-color3">{{ oldPrice(good.price) }}</div>
        </template>

        <!-- 金融商品价格 -->
        <template v-if="good.productType === 'finance'">
          <div class="plv-iar-product__item__price">
            <span>{{ good.yield }}</span>
          </div>
        </template>

        <template v-if="good.productType === 'position'">
          <div class="plv-iar-product__item__price">
            <span>{{ treatment }}</span>
          </div>
        </template>

        <!-- 购买按钮 -->
        <div
          class="plv-iar-product__item__btn pws-iar-product__item__btn"
          :class="{
            'plv-iar-product__item__job': good.productType === 'position'
          }"
        >
          <template v-if="good.productType === 'position'">
            <div
              class="plv-iar-product__item__btn plv-iar-product__item__job__detail"
              @click="$emit('jobDetail', good)"
            >
              <div>{{ iarTrans('product.jobDetail') }}</div>
            </div>
          </template>

          <buy-button
            :good="good"
            :style="{
              maxWidth: isJobType ? `${Math.min(good.btnShow.length * 16, 98)}px` : 'auto'
            }"
          >
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
    </div>
  </div>
</template>

<script>
import goodMixin from '../good-mixin';
import ProductLabel from '../ProductLabel';
import BuyButton from '../BuyButton/BuyButton.vue';
// import basicMixin from '../../../assets/mixins/basic';

export default {
  components: {
    ProductLabel,
    BuyButton,
  },

  mixins: [goodMixin],
};
</script>

<style lang="scss">
@import '../../../assets/styles/basic.scss';

.plv-iar-product__item {
  margin: 0 16px;
  padding-bottom: 14px;
  margin-bottom: 14px;
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, .1);
  color: #fff;
}
.plv-iar-product__item:last-child {
  border-bottom: none;
}

.plv-iar-product__item__cover {
  width: 87px;
  height: 87px;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  margin-right: 8px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.plv-iar-product__item__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 90px;
}

.plv-iar-product__item__cover__number {
  position: absolute;
  top: 0;
  left: 0;
  width: 27px;
  height: 16px;
  line-height: 16px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, .35);
  border-radius: 0 0 4px 0;
}

.plv-iar-product__item__name {
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}
.plv-iar-product__item__name__number {
  display: inline-block;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  min-width: 27px;
  text-align: center;
  padding: 0 3px;
  border-radius: 4px;
  background: rgba(#fff, .35);
  margin-right: 4px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.plv-iar-product__item__name__text {
  flex: 1;
  @include text-singleline;
}
.plv-iar-product__item__name__desc {
  color: rgba(#fff, 0.8);
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-left: 4px;
  cursor: pointer;
}
.plv-iar-product__item__name__desc__icon {
  width: 10px;
  height: 20px;
  margin-left: 2px;
  background-image: url(./imgs/right.png);
  background-size: 20px 20px;
  background-position-x: -3px;
}

.plv-iar-product__item__labels {
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}
.plv-iar-product__item__labels__item {
  background: rgba(255, 255, 255, .1);
  border-radius: 4px;
  color: #FFD16B;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
}

.plv-iar-product__item__desc {
  font-size: 12px;
  color: #fff;
  opacity: .6;
  @include text-singleline;
}
.plv-iar-product__item__desc--pr {
  padding-right: 84px;
}

.plv-iar-product__item__bottom {
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
}
.plv-iar-product__item__price {
  color: #FF6666;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
}
.plv-iar-product__item__oldprice {
  color: #B2B2B2;
  font-size: 12px;
  line-height: 16px;
  margin-left: 2px;
  margin-right: 8px;
  text-decoration: line-through;
  flex: 1;
  @include text-singleline;
}

.plv-iar-product__item__btn {
  margin-left: auto;
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

.plv-iar-product__buy-button--disabled {
  .plv-iar-product__item__btn__content {
    background: #CDCDCD;
  }
}

.plv-iar-product__content .plv-iar-product__item--job {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.plv-iar-product .plv-iar-product__item--job {

  .plv-iar-product__buy-button {
    flex: 1;
    overflow: hidden;
    max-width: 96px;
  }

  .plv-iar-product__item__btn {
    display: flex;
    margin-left: 0;
    justify-content: flex-end;
  }

  .plv-iar-product__item__bottom {
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }

  .plv-iar-product__label__content {
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
  }

  .plv-iar-product__item__labels {
    margin-bottom: 8px;
  }

  .plv-iar-product__item__price {
    font-size: 14px;
    align-self: flex-start;
    line-height: 23px;
    margin-bottom: 4px;
    font-family: PingFangSC-Medium;
  }

  .plv-iar-product__item__cover {
    height: 103px;
    width: 103px;
    border-radius: 8px;
    border: 1px solid rgba(51, 51, 51, 0.08);
  }

  .plv-iar-product__item__name {
    margin-bottom: 8px;
  }

  .plv-iar-product__item__name__text {
    font-size: 14px;
    line-height: 22px;
  }

  .plv-iar-product__item__job__detail {
    flex: 1;
    max-width: 64px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 64px;
    height: 24px;
    box-sizing: border-box;
    line-height: 23px;
    padding: 0 4px;
    margin-right: 5px;
    background: transparent;
    border: 1px solid #F15D5D;
    cursor: pointer;
    border-radius: 456px;
    color: #F15D5D;
    font-size: 12px;
    text-align: center;
    margin-bottom: 5px;

    div {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .plv-iar-product__item__btn__content {
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 456px;
    font-size: 12px;
    white-space: nowrap;
    min-width: auto;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.plv-iar-product__item--noCoverJob {
  .plv-iar-product__item__bottom {
    flex-direction: column;
    margin-top: 4px;
  }
}

.plv-iar-product__item__job {
  display: flex;
  width: 100%;
}

.plv-iar-product__item__labels__item--job {
  flex: 1;
  max-width: 80px;
  min-width: auto;
  padding: 0 4px;
  color: #fff;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  background: rgba(255, 255, 255, .1);
}

@media screen and (max-width: 280px) {
  .plv-iar-product .plv-iar-product__item--job .plv-iar-product__item__cover {
    width: 75px;
    height: 75px;
  }
}

</style>
