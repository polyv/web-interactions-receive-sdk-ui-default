<template>
  <div class="plv-ia-loading-container">
    <div class="plv-ia-loadingio-spinner-pulse">
      <div class="ldio">
        <div></div><div></div><div></div>
      </div>
    </div>
    <div>{{ iarTrans('tuwen.loading') }}</div>
  </div>
</template>

<script>
import basicMixin from '../../assets/mixins/basic';

export default {
  name: 'TuwenLoading',
  mixins: [basicMixin],
};
</script>

<style>
.plv-ia-loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes ldio-1 {
  0% { top: 18px; height: 64px; }
  50% { top: 30px; height: 40px; }
  100% { top: 30px; height: 40px; }
}
@keyframes ldio-2 {
  0% { top: 20.999999999999996px; height: 58.00000000000001px; }
  50% { top: 30px; height: 40px; }
  100% { top: 30px; height: 40px; }
}
@keyframes ldio-3 {
  0% { top: 24px; height: 52px; }
  50% { top: 30px; height: 40px; }
  100% { top: 30px; height: 40px; }
}
.ldio div { position: absolute; width: 15px; }
.ldio div:nth-child(1) {
  left: 17.5px;
  background: #1d3f72;
  animation: ldio-1 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation-delay: -0.2s;
}
.ldio div:nth-child(2) {
  left: 42.5px;
  background: #5699d2;
  animation: ldio-2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation-delay: -0.1s;
}
.ldio div:nth-child(3) {
  left: 67.5px;
  background: #d8ebf9;
  animation: ldio-3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation-delay: undefineds;
}

.plv-ia-loadingio-spinner-pulse {
  width: 24px;
  height: 24px;
  display: inline-block;
  overflow: hidden;
}
.ldio {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.24);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio div { box-sizing: content-box; }
</style>
