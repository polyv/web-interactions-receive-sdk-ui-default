<template>
  <div
    ref="select"
    :class="['plv-ia-qa-select', {
      'plv-ia-qa-select--focus': isFocus,
    }]"
  >
    <div class="plv-ia-qa-select__result" @click="toggle">
      <div class="plv-ia-qa-select__result__content pws-body-font-color2">{{ optionsData[modelValue] }}</div>
      <i class="plv-ia-qa-select__arrow__ico pws-que-top-arrow-color"></i>
    </div>

    <div v-show="isFocus" class="plv-ia-qa-select__options pws-bg-color">
      <div class="plv-ia-qa-select__options__list" @click="handleChoose">
        <div
          v-for="(item, index) in options"
          :key="`option${index}`"
          :class="['plv-ia-qa-select__options-item','pws-que-select-border-color', 'pws-que-select-text-color', {
            'plv-ia-qa-select__options-item--active pws-que-select-check-text-color': item.value === modelValue.toString()
          }]"
          :data-value="item.value"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isParent } from '@/assets/utils/dom.js';
import { BEFORE_DESTROY } from '@/assets/utils/compat';

export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },

  props: {
    modelValue: undefined,

    optionsData: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      value: '',
      isFocus: false,
    };
  },

  computed: {
    options() {
      const list = [];
      for (const key in this.optionsData) {
        const label = this.optionsData[key];
        list.push({
          value: key,
          label,
        });
      }
      return list;
    }
  },

  watch: {
    modelValue(newVal) {
      this.value = newVal;
    }
  },

  mounted() {
    document.addEventListener('click', this.hideOptions);
  },

  [BEFORE_DESTROY]() {
    document.removeEventListener('click', this.hideOptions);
  },

  methods: {
    toggle() {
      this.isFocus = !this.isFocus;
    },

    handleChoose(e) {
      const value = e.target.getAttribute('data-value');
      if (value === null) return;
      this.isFocus = false;

      this.$emit('change', value);
    },

    hideOptions(e) {
      if (!this.isFocus) return;
      e.stopPropagation();
      if (!this.$refs.select) return;
      if (!isParent(e.target, this.$refs.select)) {
        this.isFocus = false;
      }
    },
  }
};
</script>
