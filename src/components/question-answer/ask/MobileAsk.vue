<template>
  <div ref="ask" class="plv-ia-qa-ask">
    <div
      v-show="!inputVisible"
      class="plv-ia-qa-ask__entry pws-plv-ia-qa-ask-entry"
      @touchend="handleInputShow"
    ></div>
    <div
      v-show="inputVisible"
      class="plv-ia-qa-ask__ctrl pws-sidebar-top-bottom-bg"
      :class="{
        'plv-ia-qa-ask__ctrl--more': emotionsVisible,
        'plv-ia-qa-ask__ctrl--focus': isFocus,
      }"
    >
      <div class="plv-ia-qa-ask__ctrl__input-wrap">
        <textarea
          ref="input"
          v-model.trim="askContent"
          :placeholder="iarTrans('questionAnswer.askPlaceholder')"
          :maxlength="maxLen"
          class="plv-ia-qa-ask-input pws-que-input-bg-color pws-que-input-text-color"
          @blur="handleBlur"
          @focus="handleFocus"
        ></textarea>
        <span
          class="plv-ia-qa-ask-emotion iconfont-mob g-icon-mob-emotion pws-que-mob-emotion"
          @touchend.stop.prevent="toggleEmotions"
        ></span>
        <span
          class="plv-ia-qa-ask-send pws-que-send-btn-text-color"
          @touchend="handleReply"
        >{{ iarTrans('questionAnswer.send') }}</span>
      </div>
      <emotions
        ref="emotions"
        :visible="emotionsVisible"
        class="plv-ia-qa-ask__ctrl__emotions pws-plv-ia-qa-ask-ctrl-emotions"
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
    hasNick: {
      type: Boolean,
      default: true
    },
    maxLen: {
      type: Number,
      default: 500
    }
  },

  data() {
    return {
      inputVisible: false,
      emotionsVisible: false,
      askContent: '',
      isFocus: false,
    };
  },

  computed: {
    canReply() {
      return this.askContent !== '';
    },
  },

  watch: {
    inputVisible(bool) {
      this.$emit('visible', bool);
    },
    hasNick(nv) {
      if (nv) {
        this.handleInputShow();
      }
    }
  },

  mounted() {
    document.addEventListener('touchend', this.hideEmotions);
    document.addEventListener('touchend', this.handleInputHide);
  },

  [BEFORE_DESTROY]() {
    document.removeEventListener('touchend', this.hideEmotions);
    document.removeEventListener('touchend', this.handleInputHide);
  },

  methods: {
    hideEmotions(e) {
      if (!this.$refs.emotions) return;
      if (!isParent(e.target, this.$refs.emotions.$el)) {
        this.emotionsVisible = false;
      }
      if (e.target.tagName === 'TEXTAREA') {
        this.inputFocus();
      }
    },

    toggleEmotions() {
      this.emotionsVisible = !this.emotionsVisible;
      if (this.emotionsVisible) {
        this.inputBlur();
      }
    },

    handleReply() {
      if (!this.canReply) return;
      this.$emit('send', this.askContent);
      this.askContent = '';
      this.inputVisible = false;
      this.inputBlur();
    },

    inputBlur() {
      this.$nextTick(() => {
        this.$refs.input?.blur();
      });
    },

    handleBlur() {
      this.isFocus = false;
      setTimeout(() => {
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },

    inputFocus() {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    handleFocus() {
      this.isFocus = true;
      const el = this.$refs.input;
      // 修复iphone6，点击展开问答的输入框时，输入框没有显示，只显示了输入法。 LIVE-26276
      const val = el.value;
      el.value = '';
      el.value = val;
      window.scrollTo(0, document.body.clientHeight);
    },

    // 选择表情
    handleEmotionAdd(val) {
      this.askContent += `[${val}]`;
    },

    handleInputShow(e) {
      e && e.preventDefault();
      if (!this.hasNick) {
        this.$emit('set-nick');
      } else {
        this.inputVisible = true;
        this.inputFocus();
      }
    },

    handleInputHide(e) {
      if (!isParent(e.target, this.$refs.ask)) {
        this.inputVisible = false;
        this.inputBlur();
      }
    },
  }
};
</script>
