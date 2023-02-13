<template>
  <div class="plv-iar-bulletin__top-banner pws-bulletin-top-banner-bg-color">
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      version="1.1"
      class="plv-iar-bulletin__top-banner__icon-radio"
    >
      <g
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g transform="translate(1.000000, 1.000000)" class="plv-iar-bulletin__top-banner__icon-radio__bg-color pws-bulletin-top-banner-icon-radio-bg-color">
          <polygon points="2.15884065 10.1880716 0 10.1880716 0 5.46026883 2.15884065 5.46026883" />
          <path d="M9.77897838,17.2760375 C9.47426437,18.0847041 7.45453773,17.997233 7.45453773,17.997233 C5.13024006,15.0906436 4.81423109,12.3152091 4.81423109,12.3152091 L7.01449854,12.3152091 C7.31377952,14.2383279 9.14435115,15.7357909 9.35019841,16.0522377 C9.99329688,16.740584 9.77897838,17.2760375 9.77897838,17.2760375 L9.77897838,17.2760375 Z" />
          <path d="M14.903428,14.52421 C14.903428,14.52421 12.3196319,11.2790205 3.41747927,10.8855215 L3.41519168,4.83010973 C3.41519168,4.83010973 10.9299573,4.56420025 14.8717592,0.0186087848 L14.8717592,0.0185741702 C14.8717592,0.0185741702 18.2432722,-0.76208928 17.9859899,7.79869387 C17.985847,7.79872849 18.3447125,13.6937708 14.9034995,14.52421 L14.903428,14.52421 Z" />
        </g>
      </g>
    </svg>
    <div class="plv-iar-bulletin__top-banner__content pws-bulletin-top-banner-content-font-color" @click="onClickContent" v-html="formatContent(content)"></div>
    <div v-if="!isMobile" class="plv-iar-bulletin__top-banner__view-details pws-bulletin-top-banner-content-font-color" @click="$emit('look')"><span>{{ iarTrans('bulletin.viewDetails') }}</span></div>
    <span class="plv-iar-bulletin__top-banner__close pws-bulletin-top-banner-content-font-color" @click="$emit('close')">&times;</span>
  </div>
</template>

<script>
import { isMobile } from '@polyv/utils/src/browser';
import mixin from './mixin';

export default {
  mixins: [mixin],
  props: {
    content: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      isMobile: isMobile(),
    };
  },
  methods: {
    onClickContent() {
      if (this.isMobile) {
        this.$emit('look');
      }
    },
  },
};
</script>

<style lang="scss">
.plv-iar-bulletin__top-banner {
  position: relative;
  width: 100%;
  padding: 8px 32px 8px 40px;
  background-color: #366BEE;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .04);
  box-sizing: border-box;
  &:hover {
    .plv-iar-bulletin__top-banner__view-details {
      display: block;
    }
  }
}
.plv-iar-bulletin__top-banner__icon-radio {
  position: absolute;
  top: 50%;
  left: 12px;
  width: 20px;
  height: 20px;
  margin-top: -10px;
}
.plv-iar-bulletin__top-banner__icon-radio__bg-color {
  fill: #fff;
}
.plv-iar-bulletin__top-banner__view-details {
  display: none;
  position: absolute;
  top: 0;
  right: 32px;
  height: 100%;
  padding-left: 8px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  background-color: inherit;
  >span {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
  }
}
.plv-iar-bulletin__top-banner__close {
  position: absolute;
  top: 50%;
  right: 8px;
  margin-top: -7px;
  color: #fff;
  opacity: .6;
  line-height: 12px;
  font-size: 20px;
  cursor: pointer;
}
.plv-iar-bulletin__top-banner__content {
  max-height: 34px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  * {
    line-height: 17px;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #fff;
  }
}
</style>
