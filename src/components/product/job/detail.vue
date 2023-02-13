<template>
  <div class="plv-iar-product-job-detail pws-iar-product-job-detail">
    <div class="plv-iar-product-job-detail__main">
      <!-- 头部 岗位简单信息 -->
      <div class="plv-iar-product-job-detail__simple-info">
        <!-- logo -->
        <div v-show="logoImg" class="plv-iar-product-job-detail__simple-info__logo">
          <img :src="logoImg" alt="" />
        </div>
        <!-- info -->
        <div class="plv-iar-product-job-detail__simple-info__info">
          <!-- 职位信息 -->
          <div class="plv-iar-product-job-detail__simple-info__info__title" :title="title">{{ title }}</div>

          <!-- 其他信息 -->
          <div class="plv-iar-product-job-detail__simple-info__info__detail">
            <div v-if="tags.length > 0" class="plv-iar-product-job-detail__simple-info__info__detail__tags">
              <span v-for="item, index in tagsArr" :key="item + index" class="plv-iar-product-job-detail__tags">{{ item }}</span>
            </div>

            <div class="plv-iar-product-job-detail__simple-info__info__detail__salary">{{ salary }}</div>
          </div>
        </div>
      </div>
      <!-- 中间 岗位详情 -->
      <div class="plv-iar-product-job-detail__info-detail">
        <div class="plv-iar-product-job-detail__info-detail__title">{{ iarTrans('product.jobDetail') }}</div>

        <div class="plv-iar-product-job-detail__info-detail__textarea" v-html="textareaContent">
        </div>
      </div>
    </div>

    <!-- 底部 投递按钮 -->
    <div class="plv-iar-product-job-detail__bottom-fixed">
      <slot name="send-btn"></slot>
    </div>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
export default {
  mixins: [basicMixin],

  props: {
    logoImg: {
      default: '',
      type: String
    },

    title: {
      default: '',
      type: String
    },

    tags: {
      default: () => [],
      type: Array
    },

    salary: {
      default: '',
      type: String
    },

    textareaContent: {
      default: '',
      type: String
    }
  },

  computed: {
    tagsArr() {
      return this.tags.filter((item) => {
        return item;
      });
    }
  }
};
</script>

<style lang="scss">
.plv-iar-product-job-detail {
  display: flex;
  flex-direction: column;
  flex: 1;
  word-break: break-word;
  box-sizing: border-box;
  max-height: 450px;
  width: 100%;
}

.plv-iar-product-job-detail__main {
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0 24px;
  flex: 1;
  overflow: auto;
  line-height: initial;
  box-sizing: border-box;
  width: 100%;
}

.plv-iar-product-job-detail__bottom-fixed {
  position: relative;
  height: 80px;
  width: 100%;
  flex-shrink: 0;
  padding: 24px 24px 0 24px;
  box-sizing: border-box;

  &::before {
    content: '';
    height: 16px;
    width: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: -15px;
    background: linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
  }

  // box-shadow: 0 -2px 2px -2px #00000029;

  .plv-iar-product-job-detail__bottom-fixed__btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 96px;
    height: 32px;
    line-height: 32px;
    background: #F15D5D;
    border-radius: 16px;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      opacity: 0.8;
    }
  }
}

.plv-iar-product-job-detail__simple-info {
  display: flex;
  flex-direction: row;
  // height: 65px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(51, 51, 51, 0.08);

  .plv-iar-product-job-detail__simple-info__logo {
    height: 103px;
    width: 103px;
    margin-right: 8px;
    background: rgba(0, 0, 0, .4);
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    border: 1px solid rgba(51, 51, 51, 0.08);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .plv-iar-product-job-detail__simple-info__info {
    display: flex;
    flex-direction: column;
    flex: 1;
    // background: rgba(0, 0, 0, .4);

    .plv-iar-product-job-detail__simple-info__info__title {
      display: -webkit-box;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 8px;
      word-break: break-all;
    }

    .plv-iar-product-job-detail__simple-info__info__detail {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: flex-start;
    }

    .plv-iar-product-job-detail__simple-info__info__detail__tags {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-bottom: 8px;
      flex-wrap: wrap;

      .plv-iar-product-job-detail__tags {
        margin-top: 2px;
        margin-right: 8px;
        user-select: none;
        padding: 0 5px;
        height: 18px;
        line-height: 18px;
        display: inline-block;
        flex-shrink: 0;
        position: relative;
        font-size: 12px;
        cursor: default;
        text-align: center;
        background: #EEEEEE;
        border-radius: 4px;
        color: #333;
        white-space: nowrap;
      }
    }

    .plv-iar-product-job-detail__simple-info__info__detail__salary {
      font-size: 16px;
      color: #F15D5D;
    }
  }
}

.plv-iar-product-job-detail__info-detail {
  display: flex;
  flex-direction: column;
  flex: 1;
  // background: rgba(0, 0, 0, .4);

  .plv-iar-product-job-detail__info-detail__title {
    font-size: 14px;
    margin-bottom: 10px;
    line-height: 22px;
    color: #333;
    -webkit-text-stroke: 0.1px #333;
  }

  .plv-iar-product-job-detail__info-detail__textarea {
    flex: 1;
    word-break: break-word;

    p {
      margin: 10px 0;
      color: #333;
      line-height: 22px;
    }

    img {
      max-width: 100%;
    }

    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }

    ul {
      list-style-type: disc;
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}

.plv-iar-product-job__btn {
  height: 32px;
  line-height: 32px;
  background: #F15D5D;
  border-radius: 16px;
  display: block;
  min-width: 96px;
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  outline: none;
  position: relative;
  padding: 0 8px;
  box-sizing: border-box;
  text-align: center;
}

.plv-iar-product__buy-button--disabled {
  .plv-iar-product-job__btn {
    background: #CDCDCD;
  }
}

.plv-iar-product-job-detail__tags {
  height: 16px;
  border-radius: 5px;
}
</style>
