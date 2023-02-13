<template>
  <div
    class="plv-ia-multiline"
    :class="{
      'plv-ia-multiline--wrap': isWrap
    }"
  >
    <div
      v-if="$slots.default"
      ref="content"
      class="plv-ia-multiline__content"
      :class="{
        'plv-ia-multiline__content--wrap': isWrap
      }"
    >
      <slot></slot>
    </div>
    <p
      v-else-if="html"
      ref="content"
      class="plv-ia-multiline__content"
      :class="{
        'plv-ia-multiline__content--wrap': isWrap
      }"
      v-html="html"
    ></p>
    <p
      v-else
      ref="content"
      class="plv-ia-multiline__content"
      :class="{
        'plv-ia-multiline__content--wrap': isWrap
      }"
    >
      {{ text }}
    </p>
    <span
      v-show="needWrap"
      class="plv-ia-multiline__expand-btn__wrap pws-plv-ia-multiline-expand-wrap"
      :class="[customBgClass]"
      :style="{ background: `rgba(${bgColor}, .8)` }"
    >
      <span v-show="isWrap" class="plv-ia-multiline__expand-btn__ellipsis"></span>
      <span class="plv-ia-multiline__expand-btn" :class="[customFontClass]" @click="toggleExpand">{{ transBtnText }}</span>
      <i class="plv-ia-multiline__expand-btn__arrow pws-ia-multiline-expand-btn-arrow"></i>
    </span>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
export default {
  mixins: [basicMixin],
  props: {
    html: {
      type: String,
      default: ''
    },

    text: {
      type: String,
      default: ''
    },

    btnText: {
      type: String,
      default: ''
    },

    bgColor: {
      type: String,
      default: ''
    },

    customFontClass: {
      type: String,
      default: ''
    },

    customBgClass: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      needWrap: false,
      // 是否被折起
      isWrap: true,
    };
  },

  computed: {
    transBtnText() {
      if (this.btnText) { return this.btnText; }
      return this.isWrap ? this.iarTrans('questionAnswer.expand') : this.iarTrans('questionAnswer.shrink');
    },
  },

  mounted() {
    const contentEl = this.$refs.content;
    if (contentEl.scrollHeight - contentEl.clientHeight > 1) {
      this.needWrap = true;
      this.isWrap = true;
    } else {
      this.needWrap = false;
      this.isWrap = false;
    }
  },

  methods: {
    toggleExpand() {
      if (this.needWrap) {
        this.isWrap = !this.isWrap;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.plv-ia-multiline {
  position: relative;
  &--wrap {
    .plv-ia-multiline__expand-btn__arrow {
      transform: rotate(315deg);
    }
  }
}
.plv-ia-multiline__content {
  display: inline-block;
  &--wrap {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.plv-ia-multiline__expand-btn__wrap {
  position: absolute;
  right: 0;
  bottom: 0;
  padding-right: 16px;
  box-sizing: border-box;
  background-color: rgba($color: #f6f8ff, $alpha: .99);
  span {
    display: block;
  }
}
.plv-ia-multiline__expand-btn {
  color: #78A7ED;
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
  margin-right: -4px;
}
.plv-ia-multiline__expand-btn__arrow {
  position: absolute;
  top: 5px;
  right: 0;
  width: 6px;
  height: 6px;
  display: inline-block;
  border: 1px solid #78A7ED;
  border-right: none;
  border-top: none;
  transform: rotate(135deg) translateY(-3px);
  transition: transform 0.5s;
}
.plv-ia-multiline__expand-btn__ellipsis {
  position: absolute;
  right: 100%;
  display: inline-block;
  width: 16px;
  height: 18px;
  vertical-align: middle;
}
</style>
