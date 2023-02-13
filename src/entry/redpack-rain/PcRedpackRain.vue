<template>
  <div class="plv-ia-c-redpack-rain">
    <redpack-rain-modal
      :visible="isRedpackRainVisible"
      :custom-img-config="customImgConfig"
      @close="handleClose"
    >
      <div class="plv-ia-c-redpack-rain__main">
        <div class="plv-ia-c-redpack-rain__main__teacher">
          <teacher
            :nickname="nickname"
            :avatar="avatar"
          />
        </div>
        <p class="plv-ia-c-redpack-rain__main__blessings">{{ greeting }}</p>
        <div class="plv-ia-c-redpack-rain__main__qrcode">
          <img :src="codeUrl" />
        </div>
        <p class="plv-ia-c-redpack-rain__main__tips">{{ iarTrans('redpackRain.tips') }}</p>
      </div>
    </redpack-rain-modal>
  </div>
</template>

<script>
import Modal from '../../components/redpack-rain/pc-comp/modal';
import Teacher from '../../components/redpack-rain/pc-comp/teacher';
import Mixin from './mixin';

export default {
  components: {
    RedpackRainModal: Modal,
    Teacher,
  },

  mixins: [Mixin],
};
</script>

<style lang="scss" scoped>
.plv-ia-c-redpack-rain__main__teacher {
  position: absolute;
  top: -32px;
  left: 0;
  width: 100%;
}
.plv-ia-c-redpack-rain__main__blessings {
  padding-top: 84px;
  font-size: 20px;
  color: #FCEEBC;
  line-height: 28px;
  text-align: center;
}
.plv-ia-c-redpack-rain__main__qrcode {
  width: 120px;
  height: 120px;
  border-radius: 4px;
  margin: 32px auto 0;
  overflow: hidden;
  img {
    width: 140px;
    height: 140px;
    margin-left: -10px;
    margin-top: -10px;
  }
}
.plv-ia-c-redpack-rain__main__tips {
  color: #FCEEBC;
  font-size: 14px;
  margin-top: 16px;
  text-align: center;
  word-break: keep-all;
}
</style>
