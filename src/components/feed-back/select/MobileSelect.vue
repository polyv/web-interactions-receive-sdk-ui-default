<template>
  <div class="m-select-wrap">
    <input
      v-model="selectName"
      :class="['u-select-input f16', color === 'blue' ? '' : 'white-color']"
      type="text"
      readonly
      @click="openSelect"
      @blur="onBlur"
    />
    <div
      :class="['triangle-down', { rotate: rotate }]"
      @click="openSelect"
    ></div>
    <div
      :class="['m-options-panel f16', showOptions ? 'show' : 'hidden']"
    >
      <p
        v-for="(item, index) in selectData"
        :key="index"
        class="u-option"
        :class="{'active': item.value == selectValue}"
        @mousedown="getValue(item.name, item.value, index)"
      >
        {{ item.name }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // eslint-disable-next-line vue/require-prop-types
    selValue: {
      // 将该prop值作为selV的初始值
      default: undefined,
    },
    color: {
      type: String,
      default: () => {
        return 'blue';
      },
    },
  },
  data() {
    return {
      selectValue: this.selValue,
      rotate: false,
      showOptions: false,
    };
  },
  computed: {
    selectName() {
      for (const item of this.selectData) {
        if (item.value === this.selectValue) {
          return item.name;
        }
      }
      return '';
    },
  },
  methods: {
    openSelect() {
      this.showOptions = !this.showOptions;
      this.rotate = !this.rotate;
    },
    getValue(name, value, index) {
      this.selectValue = value;
      this.$emit('get-value', name, value, index);
    },
    onBlur() {
      this.showOptions = false;
      this.rotate = false;
    },
  },
};
</script>
<style lang="scss" scoped>
$borderColor: #D8D8D8;
$selectColor: #409eff;
input {
  outline: none;
}
.m-select-wrap {
  width: 100%;
  position: relative;
  .u-select-input {
    width: 100%;
    box-sizing: border-box;
    background: $selectColor;
    color: #606266;
    border-radius: 20px;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    cursor: pointer;
    border: none;
  }
  .white-color {
    background: #f6f6f6;
  }
  .triangle-down {
    // 下三角样式
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid $borderColor;
    position: absolute;
    top: 18px;
    right: 15px;
    transition: transform 0.3s ease-in-out;
  }
  .rotate {
    transform: rotate(180deg);
  }
  .m-options-panel {
    box-sizing: border-box;
    padding: 1px;
    position: absolute;
    background: #ffffff;
    border-radius: 5px;
    width: 100%;
    border: 1px solid $borderColor;
    top: 46px;
    left: 0;
    color: #706f94;
    z-index: 9999;
    .u-option {
      margin: 0;
      padding: 10px;
      cursor: pointer;
    }
    .u-option:hover {
      color: $selectColor;
      background: #f5f7fa;
    }
    .active {
      color: $selectColor;
    }
  }
  .show {
    display: block;
  }
  .hidden {
    display: none;
  }
}
</style>
