<template>
  <div
    :class="['plv-ia-qa-select', {
      'plv-ia-qa-select--focus': isFocus,
    }]"
  >
    <div class="plv-ia-qa-select__result" @touchend="show">
      <div class="plv-ia-qa-select__result__content pws-body-font-color2">{{ optionsData[modelValue] }}</div>
      <i class="plv-ia-qa-select__arrow__ico pws-que-top-arrow-color"></i>
    </div>

    <div class="plv-ia-qa-select__options">
      <div v-show="isFocus" class="plv-ia-qa-select__options__bg" @touchend="hide"></div>
      <div class="plv-ia-qa-select__options__wrap">
        <div class="plv-ia-qa-select__options__list" @touchend.prevent="handleChoose">
          <div
            v-for="(item, index) in options"
            :key="`option${index}`"
            :class="['plv-ia-qa-select__options-item', {
              'plv-ia-qa-select__options-item--active': item.value === modelValue.toString()
            }]"
            :data-value="item.value"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="plv-ia-qa-select__options__cancel" @touchend="hide">{{ iarTrans('questionAnswer.cancel') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
export default {

  mixins: [basicMixin],
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
      value: 0,
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

  methods: {
    show(e) {
      e.preventDefault();
      this.isFocus = true;
    },

    hide(e) {
      e.preventDefault();
      this.isFocus = false;
    },

    handleChoose(e) {
      const value = e.target.getAttribute('data-value');
      if (value === null) return;
      this.isFocus = false;

      this.$emit('change', value);
    },
  }
};
</script>
