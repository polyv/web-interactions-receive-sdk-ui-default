<template>
  <div ref="tip" class="plv-iar-vote__tip">{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  },
};
</script>

<style lang="scss">
.plv-iar-vote__tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 16px;
  font-size: 16px;
  line-height: 22px;
  color: #fff;
  background-color: rgba(0, 0, 0, .6);
  border-radius: 2px;
  white-space: nowrap;
}
</style>
