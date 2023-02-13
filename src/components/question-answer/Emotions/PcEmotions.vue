<template>
  <div
    v-show="visible"
    class="plv-ia-qa-emotions pws-pc-chat-input-panel-bg-color pws-tools-scroll-color pws-que-pc-emotions"
    @click.stop="handleAdd"
  >
    <div ref="emotionsPanel" class="plv-ia-qa-emotions__wrap pws-que-emoji-color"></div>
  </div>
</template>

<script>
import { genDOMList } from '@polyv/emotion-sdk';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.$refs.emotionsPanel.appendChild(genDOMList());
  },

  methods: {
    handleAdd(e) {
      const domTarget = e.target;
      const emotionTitle = domTarget.getAttribute('data-title');
      if (!emotionTitle) {
        return;
      }
      this.$emit('add', emotionTitle);
    }
  }
};
</script>
