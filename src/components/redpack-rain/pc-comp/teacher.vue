<template>
  <div class="plv-ia-c-redpack-rain-teacher">
    <div class="plv-ia-c-redpack-rain-teacher__avatar__wrap">
      <div
        class="plv-ia-c-redpack-rain-teacher__avatar"
        :style="{
          backgroundImage: `url(${avatar})`,
        }"
      ></div>
    </div>
    <div class="plv-ia-c-redpack-rain-teacher__info">
      <p>{{ iarTrans('redpackRain.send1') }} <span>{{ nickname }}</span> {{ iarTrans('redpackRain.send2') }}</p>
    </div>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';

export default {
  mixins: [basicMixin],

  props: {
    avatar: {
      type: String,
      default: '',
    },
    nickname: {
      type: String,
      default: '',
    }
  },
};
</script>

<style lang="scss" scoped>
.plv-ia-c-redpack-rain-teacher {
  text-align: center;
}
.plv-ia-c-redpack-rain-teacher__avatar__wrap {
  width: 64px;
  height: 64px;
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 149, 73, 1) 0%, rgba(246, 74, 64, 1) 100%);
  border-radius: 50%;
  overflow: hidden;
  .plv-ia-c-redpack-rain-teacher__avatar {
    display: block;
    width: 56px;
    height: 56px;
    margin-top: 4px;
    margin-left: 4px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.plv-ia-c-redpack-rain-teacher__info {
  margin-top: 4px;
  line-height: 1;
  color: #FCEEBC;
  font-size: 14px;
  span {
    font-weight: 700;
  }
}
</style>
