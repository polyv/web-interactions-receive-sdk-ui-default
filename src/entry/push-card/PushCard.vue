<!-- 卡片推送 -->
<template>
  <div :class="['plv-iar-push-card', `plv-iar-push-card--${cardStyle}`]">
    <!-- 卡片入口 -->
    <div
      v-if="entryVisible"
      class="plv-iar-push-card__entrance"
    >
      <pendant
        :icon-url="iconUrl"
        :time="popUpLeftTime"
        :tooltip="countdownMsg || iarTrans('pushCard.defaultCountdownMsg')"
        :show-tooltip="!isPushCondition && countdownMsgHideLeftTime > 0"
        :tooltip-position="tipPosition"
        @click="handleEntrance"
        @countdown="handleCountdown"
        @countdown-end="handleCountdownEnd"
      />
    </div>
    <div
      ref="cardModal"
    >
      <div
        v-if="visible"
        class="plv-iar-push-card__modal"
        :class="['plv-iar-push-card', `plv-iar-push-card--${cardStyle}`]"
      >
        <div class="plv-iar-push-card__modal__body">
          <div
            class="plv-iar-push-card__modal__content"
            :style="isCustomType ? `background-image: url(${cardImage})` : ''"
            @click="openLink"
          >
            <div
              v-show="hasCountDown"
              class="plv-iar-push-card__content__time"
            >
              <!-- 圆环倒计时 -->
              <svg
                x="0px"
                y="0px"
                width="30px"
                height="30px"
                viewBox="0 0 30 30"
              >
                <circle
                  class="plv-iar-push-card__content__time-bg"
                  stroke="#FF3F19"
                  fill="none"
                  stroke-width="2"
                  cx="15"
                  cy="15"
                  r="13"
                />
                <circle
                  ref="cardCirclePath"
                  class="plv-iar-push-card__content__time-path"
                  stroke="#FED66C"
                  fill="none"
                  stroke-width="2"
                  cx="15"
                  cy="15"
                  r="13"
                />
              </svg>
              <span class="plv-iar-push-card__content__time-number">{{ remainingTime }}</span>
            </div>
            <div
              v-if="cardStyle === 'redpack'"
              class="plv-iar-push-card__content__open"
              :class="[_useLang === 'zh_CN' ? 'plv-iar-push-card__content__open--cn' : 'plv-iar-push-card__content__open--en']"
            ></div>
            <p
              class="plv-iar-push-card__content__text"
            >
              {{ content }}
            </p>
            <button v-if="cardStyle === 'giftbox'" class="plv-iar-push-card__content__btn">{{ iarTrans('pushCard.getNow') }}</button>
          </div>
          <!-- 竖屏关闭按钮-->
          <div class="plv-iar-push-card__modal__close">
            <div class="plv-iar-push-card__modal__close-line"></div>
            <div class="plv-iar-push-card__modal__close-btn" @click="handleClose"></div>
          </div>
          <!-- 横屏关闭按钮-->
          <div class="plv-iar-push-card__modal__close--horizontal">
            <div class="plv-iar-push-card__modal__close-btn" @click="handleClose"></div>
          </div>
        </div>
      </div>
      <template v-if="iframeVisible">
        <mobile-modal
          v-if="isMobile"
          class="plv-iar-push-card__modal plv-iar-push-card__modal__iframe--mobile"
          :width="iframeSize.mobW"
          :height="iframeSize.mobH"
        >
          <iframe
            class="plv-iar-push-card__iframe"
            frameborder="0"
            :src="iframeLink"
          ></iframe>
          <div
            class="plv-iar-push-card__iframe__close"
            @click="handleIframeClose"
          ></div>
        </mobile-modal>
        <pc-modal
          v-else
          class="plv-iar-push-card__modal"
          :width="iframeSize.pcW"
          :height="iframeSize.pcH"
        >
          <iframe
            class="plv-iar-push-card__iframe"
            frameborder="0"
            :src="iframeLink"
          ></iframe>
          <div
            class="plv-iar-push-card__iframe__close"
            @click="handleIframeClose"
          ></div>
        </pc-modal>
      </template>
    </div>
  </div>
</template>

<script>
import Pendant from '@/components/pendant/pendant.vue';
import PcModal from '@/components/common/modal/PcModal.vue';
import MobileModal from '@/components/common/modal/MobileModal.vue';
import mixin from './mixin';

export default {
  components: {
    Pendant,
    PcModal,
    MobileModal,
  },
  mixins: [mixin],
};

</script>
<style lang="scss">
.plv-iar-push-card__modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
}
.plv-iar-push-card__modal__body {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.plv-iar-push-card__modal__content {
  width: 188px;
  height: 256px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(./images/hongbao-bg.png);
  border-radius: 4px;
  cursor: pointer;
}
.plv-iar-push-card__content__text {
  position: absolute;
  top: 139px;
  width: 157px;
  height: 56px;
  font-size: 18px;
  margin: 0;
  padding: 0 16px;
  text-align: center;
  font-weight: 400;
  color: #FFF5D6;
  line-height: 25px;
  text-shadow: 0 1px 0 #C80200;
}
.plv-iar-push-card__content__time {
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
  position: absolute;
  text-align: center;
  line-height: 30px;

  & svg {
    transform: rotate(-90deg);
  }
}
.plv-iar-push-card__content__time-bg {
  stroke: #FF3F19;
}
.plv-iar-push-card__content__time-path {
  stroke: #FED66C;
  transition: stroke-dashoffset 1s linear;
}
.plv-iar-push-card__content__time-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: #FED66C;
}
.plv-iar-push-card__content__open {
  background-image: url(./images/btn-open.png);
  width: 78px;
  height: 78px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 46px;
  background-repeat: no-repeat;
  background-size: contain;
}
.plv-iar-push-card__content__open--en {
  background-image: url(./images/btn-open-en.png);
}
.plv-iar-push-card__content__btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 92px;
  height: 32px;
  background: linear-gradient(90deg, #FFD89D 0%, #FFB168 100%);
  border-radius: 19px;
  border: none;
  top: 100px;
  cursor: pointer;
  outline: none;

  font-size: 14px;
  font-family: 'PingFangSC-Medium, PingFang SC';
  font-weight: 500;
  color: #AF4500;
  letter-spacing: 1px;
}
.plv-iar-push-card__modal__close {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}
.plv-iar-push-card__modal__close-btn {
  cursor: pointer;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(./images/btn-close.png);
}
.plv-iar-push-card__modal__close-line {
  width: 1px;
  height: 34px;
  background: rgba(255, 255, 255, 0.8);
}
.plv-iar-push-card {
  .plv-iar-pendant__tooltip {
    color: #fff;
    border-color: #FD7232;
  }
  .plv-iar-pendant__tooltip--left {
    background: linear-gradient(231deg, #FF9D4D 0%, #F65F49 100%);
    &::before {
      border-left-color: #FD7232;
    }
    &::after {
      border-left-color: #FF9D4D;
    }
  }
  .plv-iar-pendant__tooltip--right {
    background: linear-gradient(231deg, #F65F49 0%, #FF9D4D 100%);
    &::before {
      border-right-color: #FD7232;
    }
    &::after {
      border-right-color: #FF9D4D;
    }
  }
  .plv-iar-pendant__countdown {
    color: rgba(255, 255, 255, 0.8);
  }
}
.plv-iar-push-card--redpack {
  .plv-iar-push-card__modal__content {
    background-image: url(./images/hongbao-bg.png);
  }
}
.plv-iar-push-card--giftbox {
  .plv-iar-pendant__tooltip--left {
    background: linear-gradient(231deg, #F6A125 0%, #FD8121 100%);
  }
  .plv-iar-pendant__tooltip--right {
    background: linear-gradient(231deg, #FD8121 0%, #F6A125 100%);
    &::after {
      border-right-color: #F6A125;
    }
  }
  .plv-iar-push-card__modal__content {
    background-image: url(./images/gift-box-bg.png);
  }
  .plv-iar-push-card__content__text {
    top: 46px;
    font-size: 16px;
    color: #E94D00;
    text-shadow: none;
  }
  .plv-iar-push-card__content__time-path {
    stroke: #FFC94B;
  }
  .plv-iar-push-card__content__time-bg {
    stroke: #FFE2C7;
  }
  .plv-iar-push-card__content__time-number {
    color: #FB9B26;
  }
}
.plv-iar-push-card__modal__close--horizontal {
  display: none;
  position: absolute;
  right: -47px;
  top: 0;
}
@media screen and (min-aspect-ratio: 4/3) {
  .plv-iar-push-card__modal__close {
    display: none;
  }
  .plv-iar-push-card__modal__close--horizontal {
    display: block;
  }
}
.plv-iar-push-card__iframe {
  width: 100%;
  height: 100%;
  position: relative;
  outline: none;
}
.plv-iar-push-card__iframe__close {
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 100%;
  width: 32px;
  height: 32px;
  background: url(./images/btn-close.png);
  background-size: 100% 100%;
  cursor: pointer;
}
.plv-iar-push-card__modal__iframe--mobile {
  .plv-iar-modal__main {
    transform: none;
    top: initial;
  }
}
</style>
