<!-- 模拟 Login 逻辑(获取频道、用户信息及SDK token) -->

<template>
  <div class="plv-demo-login-default">
    <h2> demo 调试</h2>
    <div class="plv-demo-login-default__field">
      <label>appId</label>
      <input
        v-model.trim="appId"
        name="appId"
        autocomplete="on"
        type="text"
        required
      />
    </div>
    <div class="plv-demo-login-default__field">
      <label>appSecret</label>
      <input
        v-model.trim="appSecret"
        name="appSecret"
        autocomplete="on"
        type="text"
        required
      />
    </div>
    <div class="plv-demo-login-default__field">
      <label>accountId</label>
      <input
        v-model.trim="channelInfo.accountId"
        name="accountId"
        autocomplete="on"
        type="text"
        required
      />
    </div>
    <div class="plv-demo-login-default__field">
      <label>channelId</label>
      <input
        v-model.trim="channelInfo.channelId"
        name="channelId"
        autocomplete="on"
        type="text"
        required
      />
    </div>
    <div class="plv-demo-login-default__field">
      <label>roomId</label>
      <input
        v-model.trim="channelInfo.roomId"
        name="roomId"
        autocomplete="on"
        type="text"
        required
      />
    </div>
    <div class="plv-demo-login-default__field">
      <label>sessionId</label>
      <input
        v-model.trim="channelInfo.sessionId"
        name="sessionId"
        autocomplete="on"
        type="text"
        required
      />
    </div>
    <div class="plv-demo-login-default__field">
      <label>userId</label>
      <input
        v-model.trim="userInfo.userId"
        name="userId"
        autocomplete="on"
        type="text"
        required
      />
    </div>
    <div class="plv-demo-login-default__field">
      <label>用户名</label>
      <input
        v-model.trim="userInfo.nick"
        name="nick"
        autocomplete="on"
        type="text"
        required
      />
    </div>
    <button class="plv-demo-login-default__field__more-btn" @click="isShowMoreOptions = !isShowMoreOptions">{{ isShowMoreOptions ? '收起' : '展开' }}更多信息 +</button>
    <div v-show="isShowMoreOptions" class="plv-demo-login-default__field__wrap">
      <div class="plv-demo-login-default__field">
        <label>用户身份</label>
        <select v-model="userInfo.userType" name="userType">
          <option
            v-for="type in userTypes"
            :key="type.value"
            :value="type.value"
          >
            {{ type.name }}
          </option>
        </select>
      </div>
      <div class="plv-demo-login-default__field">
        <label>头衔actor</label>
        <input
          v-model.trim="userInfo.actor"
          name="actor"
          autocomplete="on"
          type="text"
          placeholder="可选"
        />
      </div>
    </div>
    <p class="plv-demo-login-default__tips">*为便于调试，以上信息在填写并获取token成功后，<br />会暂存在浏览器 sessionStorage 中</p>
    <div>
      <button class="plv-demo-login-default__btn" @click="onClickEnter">进入</button>
    </div>

    <div v-if="isLoading" class="plv-demo-login-default__loading">
      <p>正在获取数据...</p>
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
.plv-demo-login-default {
  position: relative;
  padding: 20px;
  height: 100vh;
  h2 {
    text-align: center;
  }
}
.plv-demo-login-default__loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  line-height: 100%;
  background: rgba(#000, 0.5);
  color: #fff;
  p {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
}

.plv-demo-login-default__tips {
  width: 350px;
  text-align: center;
  font-size: 12px;
}

.plv-demo-login-default__field {
  position: relative;
  margin: 25px auto;
  padding-left: 100px;
  height: 30px;
  line-height: 30px;
  label {
    width: 100px;
    position: absolute;
    top: 0;
    left: 0;
    text-align: left;
    padding-right: 20px;
    box-sizing: border-box;
  }
  input {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    width: 250px;
    height: 30px;
    box-sizing: border-box;
  }
}
.plv-demo-login-default__field__more-btn {
  display: block;
  margin: 0 auto;
  outline: none;
  background: transparent;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid #ccc;
}
.plv-demo-login-default__btn {
  border: none;
  background: transparent;
  display: block;
  margin: 0 auto;
  box-shadow: 0 0 3px #ccc;
  padding: 8px 18px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
