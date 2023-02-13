<!-- 红包封面 -->
<template>
  <div class="plv-iar-red-envelope__cover">
    <div
      class="plv-iar-red-envelope__cover__top"
      :class="{'plv-iar-red-envelope__cover__top--custom-cover' : !!coverImg}"
      :style="{'background-image': `url(${coverImg || coverDefault})`}"
    >
      <div class="plv-iar-red-envelope__cover__top__inner">
        <div>
          <p
            class="plv-iar-red-envelope__sender__pic"
            :style="{'background-image': `url(${sender.pic})`}"
          ></p>
          <p class="plv-iar-red-envelope__sender__nick">{{ sender.nick }}</p>
        </div>
        <slot name="slot1"></slot>
        <div v-if="coverText" class="plv-iar-red-envelope__cover__text">
          <span>{{ coverText }}</span>
        </div>
        <slot name="slot2"></slot>
      </div>
    </div>
    <div class="plv-iar-red-envelope__cover__bottom"></div>
    <div class="plv-iar-red-envelope__cover__open" @click="$emit('open')"></div>
  </div>
</template>

<script>
import coverDefault from '../imgs/cover-top-default.png';
export default {
  props: {
    sender: {
      type: Object,
      default: null
    },
    coverImg: {
      type: [String, null],
      default: null
    },
    coverText: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      coverDefault,
    };
  },
};
</script>

<style lang="scss">
.plv-iar-red-envelope__cover {
  position: relative;
  width: 270px;
  height: 380px;
}
.plv-iar-red-envelope__cover__top {
  height: 312px;
  background-size: cover;
  border-radius: 18px 18px 0 0;
  box-sizing: border-box;
  color: #FCEEBC;
  text-align: center;
  text-shadow: 0 1px 1px rgba(106, 27, 0, .8);
}
.plv-iar-red-envelope__cover__top__inner {
  height: 100%;
  padding-top: 56px;
  box-sizing: border-box;
}
.plv-iar-red-envelope__cover__top--custom-cover {
  color: #fff;
  .plv-iar-red-envelope__cover__top__inner {
    background-image: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, 0));
  }
}
.plv-iar-red-envelope__cover__bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 128px;
  background-image: url(../imgs/cover-bottom-default.png);
  background-size: cover;
}
.plv-iar-red-envelope__cover__open {
  position: absolute;
  bottom: 28px;
  left: 50%;
  margin-left: -52px;
  width: 104px;
  height: 104px;
  background-image: url(../imgs/btn-open.png);
  background-size: cover;
}
.plv-iar-red-envelope__sender__pic {
  width: 44px;
  height: 44px;
  margin: 0 auto;
  background-size: contain;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, .1);
  border-radius: 50%;
}
.plv-iar-red-envelope__sender__nick {
  margin: 4px 0 0;
  font-size: 14px;
  line-height: 20px;
}
.plv-iar-red-envelope__cover__text {
  position: relative;
  width: 200px;
  min-height: 56px;
  margin: 8px auto;
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  word-break: break-all;
  >span {
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
