<!-- 与聊天室组件交互示例 -->

<template>
  <div class="plv-demo-panel-default">
    <div class="plv-demo-panel-default__field">
      <button class="plv-demo-panel-default__setting" @click="$emit('update-setting')">重设基本信息</button>
    </div>
    <div class="plv-demo-panel-default__field">
      <label>
        语言
        <select v-model="lang" name="lang">
          <option value="zh_CN">中文</option>
          <option value="en">英文</option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-demo-panel-default {
  padding: 20px;
}
.plv-demo-panel-default__field {
  margin: 20px auto;
}
</style>
