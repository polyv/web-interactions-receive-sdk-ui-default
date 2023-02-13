<template>
  <div class="plv-ia-no-more-container">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
};
</script>

<style>
.plv-ia-no-more-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #95a5a6;
}
</style>
