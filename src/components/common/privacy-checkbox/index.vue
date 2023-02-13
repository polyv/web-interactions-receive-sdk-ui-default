<!-- @file 隐私协议checkbox 组件 -->
<template>
  <div class="plv-iar-privacy-checkbox" :class="{'plv-iar-privacy-checkbox--disabled': disabled}">
    <input
      :id="inputId"
      :checked="checked"
      type="checkbox"
      @change="$emit('change', $event.target.checked)"
    />
    <label class="plv-iar-privacy-checkbox__style" :for="!disabled && inputId"></label>
    <label
      ref="content"
      class="plv-iar-privacy-checkbox__content"
      :for="!disabled && inputId"
    ></label>
  </div>
</template>

<script>
import { interceptLink } from '@/assets/utils/utils';
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },

  props: {
    checked: {
      type: Boolean,
      default: false
    },

    content: {
      type: String,
      default: ''
    },

    inputId: {
      type: String,
      default: 'plv-checkbox-id'
    },

    disabled: {
      type: Boolean,
      default: false
    },
    isWebView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  watch: {
    content: {
      handler() {
        this.$nextTick(() => {
          if (this.$refs.content) {
            this.$refs.content.innerHTML = this.content;
            this.initLinkEvent();
          }
        });
      },
      immediate: true
    }
  },
  mounted() {
    // 拦截a标签的点击事件,如果是webview则不跳转，将跳转事件抛出。
    this.initLinkEvent();
  },
  methods: {
    initLinkEvent() {
      interceptLink(this.$refs.content, this.isWebView, (href, target) => {
        this.$emit('to-link', {
          href,
          target
        });
      });
    }
  }
};
</script>

<style>
.plv-iar-privacy-checkbox {
  display: inline-flex;
  align-items: top;
}

.plv-iar-privacy-checkbox--disabled {
  pointer-events: none;
}

.plv-iar-privacy-checkbox--disabled > input + label {
  border-color: #cfd8dc;
  background: #e9ecee;
  color: #9e9e9e;
}

.plv-iar-privacy-checkbox--disabled > label {
  color: #9e9e9e;
}

.plv-iar-privacy-checkbox > input {
  display: none;
}

.plv-iar-privacy-checkbox__content {
  display: inline-block;
  cursor: pointer;
  flex: 1;
  /** IE flex 1 为 1 1 0% */
  -ms-flex: 1 1 auto;
  word-break: break-all;
  line-height: 18px;
}

.plv-iar-privacy-checkbox__content > p {
  display: inline;
  overflow: hidden;

  margin: 0;
  margin-top: 1px;

  text-overflow: ellipsis;
}

.plv-iar-privacy-checkbox__style {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid #cfd8dc;
  position: relative;
  cursor: pointer;
  justify-items: center;
  margin-right: 8px;
  flex-shrink: 0;
}

.plv-iar-privacy-checkbox__style::before {
  display: inline-block;
  content: ' ';
  width: 8px;
  border: 2px solid #fff;
  height: 3px;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
  top: 5px;
  left: 3px;
  position: absolute;
  opacity: 0;
}

.plv-iar-privacy-checkbox > input:checked + label {
  background: #2196f3;
}

.plv-iar-privacy-checkbox > input:checked + label::before {
  opacity: 1;
  transform: all 0.5s;
  background: #2196f3;
}
</style>
