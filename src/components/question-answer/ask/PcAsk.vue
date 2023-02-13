<template>
  <div ref="ask" class="plv-ia-qa-ask">
    <div
      class="plv-ia-qa-ask__main pws-que-bg-color"
      :class="{ 'plv-ia-qa-ask__main--more': emotionsVisible }"
    >
      <div class="plv-ia-qa-ask__ctrl pws-aside-bg-color">
        <div class="plv-ia-qa-ask-input__wrap">
          <textarea
            ref="input"
            v-model.trim="askContent"
            :placeholder="iarTrans('questionAnswer.askPlaceholder')"
            :maxlength="maxLen"
            class="plv-ia-qa-ask-input pws-aside-bg-color pws-que-input-text-color pws-chat-scroll-color"
            @keyup.enter.exact="handleReply"
            @keyup.shift.enter="handleAddLineBreak"
          ></textarea>
        </div>
        <button
          class="plv-ia-qa-ask-emotion iconfont-pc g-icon-pc-emotion pws-que-pc-emotion"
          @click="toggleEmotions"
        ></button>
        <button
          class="plv-ia-qa-ask-send pws-que-pc-send-btn-bg-color pws-que-send-btn-text-color"
          :disabled="!canReply"
          @click="handleReply"
        >
          {{ iarTrans('questionAnswer.send') }}
        </button>
      </div>
      <emotions
        ref="emotions"
        :visible="emotionsVisible"
        @add="handleEmotionAdd"
      />
    </div>
  </div>
</template>

<script>
import { isParent } from '@/assets/utils/dom.js';
import Emotions from '../Emotions/PcEmotions';
import basicMixin from '../../../assets/mixins/basic';
import { BEFORE_DESTROY } from '@/assets/utils/compat';

export default {
  components: {
    emotions: Emotions,
  },
  mixins: [basicMixin],
  props: {
    maxLen: {
      type: Number,
      default: 500
    }
  },

  data() {
    return {
      emotionsVisible: false,
      askContent: '',
    };
  },

  computed: {
    canReply() {
      return this.askContent !== '';
    },
  },

  mounted() {
    document.addEventListener('click', this.hideEmotions);
  },

  [BEFORE_DESTROY]() {
    document.removeEventListener('click', this.hideEmotions);
  },

  methods: {
    hideEmotions(e) {
      if (!this.$refs.emotions) return;
      if (!isParent(e.target, this.$refs.emotions.$el)) {
        this.emotionsVisible = false;
      }
    },

    toggleEmotions(e) {
      e.stopPropagation();
      this.emotionsVisible = !this.emotionsVisible;
    },

    handleReply() {
      if (!this.askContent) return;
      this.$emit('send', this.askContent);
      this.askContent = '';
    },

    // 换行
    handleAddLineBreak() {
      this.askContent += '\n';
    },

    // 选择表情
    handleEmotionAdd(val) {
      this.askContent += `[${val}]`;
      this.emotionsVisible = false;
    },
  }
};
</script>
