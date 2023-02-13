<template>
  <div class="plv-iar-mobile-feed-default plv-feed-sesstion">
    <div class="plv-iar-mobile-feed-default__wrap">
      <div class="plv-iar-mobile-feed-content">
        <div class="plv-feed-back-item">
          <p class="plv-feed-back-item-label required">
            {{ iarTrans("feedBack.feedType") }}
          </p>
          <input-select
            :select-data="selectData"
            :sel-value="selValue"
            color="white"
            @get-value="getValue"
          />
        </div>
        <div class="plv-feed-back-item">
          <p class="plv-feed-back-item-label required">
            {{ iarTrans("feedBack.backType") }}
          </p>
          <div class="plv-feed-back-item-radio-wrap">
            <div
              v-for="item in radioData"
              :key="item.value"
              class="plv-feed-back-item-radio-wrap_item"
            >
              <label :class="{ active: item.value == radioValue }">
                <input
                  v-model="radioValue"
                  type="radio"
                  class="plv-feed-back-item-radio-wrap_radio"
                  :name="item.name"
                  :value="item.value"
                />
                <span class="plv-feed-back-item-radio-wrap_radio__text">{{
                  item.text
                }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="plv-feed-back-item">
          <p class="plv-feed-back-item-label">
            {{ iarTrans("feedBack.feedContentLable") }}
            <span>（{{ iarTrans("feedBack.feedContentNum") }}）</span>
          </p>
          <textarea
            v-model="feedBackContent"
            class="plv-feed-back-item-content"
            :placeholder="iarTrans('feedBack.feedContentContent')"
          ></textarea>
        </div>
        <div class="plv-feed-back-item">
          <p class="plv-feed-back-item-label">
            {{ iarTrans("feedBack.uploadTitle") }}
            <span>（{{ iarTrans("feedBack.uploadTitleMsg") }}）</span>
          </p>
          <uploader ref="uploaderDom" :max-image-length="1" @get-file="getFile" />
        </div>
        <div class="plv-feed-back-item">
          <p class="plv-feed-back-item-label required">
            {{ iarTrans("feedBack.codeTitle") }}
          </p>
          <div class="plv-feed-back-item-code clearfix">
            <input
              v-model="captchaValue"
              class="plv-feed-back-item-code_input"
              type="text"
              onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
              :placeholder="iarTrans('feedBack.codeplaceholder')"
            />
            <p class="plv-feed-back-item-code_img">
              <img
                v-if="captchaObj.captchaDataURI"
                :src="'data:imagejpeg;base64' + captchaObj.captchaDataURI"
                alt=""
                @click="onGetcode"
              />
            </p>
          </div>
        </div>
        <div class="plv-feed-back-item">
          <p class="plv-feed-back-item-label">
            {{ iarTrans("feedBack.phone") }}
          </p>
          <div class="plv-feed-back-item-phone">
            <input
              ref="phoneRef"
              v-model="contact"
              class="plv-feed-back-item-phone_input"
              type="text"
              maxLength="11"
              :placeholder="iarTrans('feedBack.phoneMsg')"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="plv-iar-mobile-feed-default__btn__wrap"
      :style="{
        paddingBottom: `${isIPhoneXSeries ? 34 : 20}px`,
      }"
    >
      <iar-button
        :disabled="isDisabled"
        :style="{ padding: '10px 20px' }"
        @click="feedBackHand"
      >
        {{ iarTrans("feedBack.feedBackBtn") }}
      </iar-button>
      <toast
        :visible="showalertInfo"
        :duration="2"
        :text="showalertText"
        class="toast-wrap"
        @hidden="handleToastHidden"
      />
    </div>
  </div>
</template>

<script>
import IarButton from '../../components/common/button/MobileButton';
import InputSelect from '../../components/feed-back/select/MobileSelect';
import uploader from '../../components/feed-back/uploader/uploader';
import Toast from '../../components/common/toast/Toast.vue';
import mixin from './mixin';
import { isIPhoneXSeries } from '../../assets/utils/browser';

export default {
  components: {
    IarButton,
    InputSelect,
    uploader,
    Toast,
  },
  mixins: [mixin],
  data() {
    return {
      isIPhoneXSeries: isIPhoneXSeries(),
    };
  },
};
</script>
<style lang="scss">
$requiredColor: #ff3636;
$backgroundColor: #f6f6f6;
$activeColor: #3082fe;
.plv-iar-mobile-feed-default {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  padding: 20px 16px 10px;

  input {
    outline: none;
    border: none;
    background: $backgroundColor;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    width: 100%;
    padding-left: 16px;
    box-sizing: border-box;
  }
  .plv-iar-mobile-feed-content {
    font-size: 14px;
    color: #666;
    text-align: left;
    margin-bottom: 15px;
    .plv-feed-back-item {
      text-align: left;
      margin-bottom: 20px;
      .plv-feed-back-item-code {
        position: relative;
        .plv-feed-back-item-code_img {
          margin: 0;
          padding: 0;
          position: absolute;
          right: 0;
          top: 4px;
          width: 132px;
          height: 32px;
          line-height: 32px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 20px;
          }
        }
      }
      .plv-feed-back-item-label {
        color: #333;
        margin: 0;
        margin-bottom: 10px;
        &.required::before {
          content: '*';
          width: 10px;
          height: 10px;
          color: $requiredColor;
        }
        span {
          font-size: 12px;
          color: #9e9e9e;
        }
      }
      .plv-feed-back-item-radio-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .plv-feed-back-item-radio-wrap_item {
          display: table-cell;
          width: 31%;
          margin-bottom: 10px;
          box-sizing: border-box;
          text-align: center;
          label {
            display: block;
            width: 100%;
            background: $backgroundColor;
            padding: 8px 0;
            border-radius: 16px;
            cursor: pointer;
            border: 1px solid transparent;
            transition: 0.15s all ease-in-out;
            &.active {
              border-color: $activeColor;
              background: rgba(33, 150, 243, 0.1);
              .plv-feed-back-item-radio-wrap_radio__text {
                color: $activeColor;
              }
            }
            .plv-feed-back-item-radio-wrap_radio {
              display: none;
            }
          }
        }
      }
      .plv-feed-back-item-content {
        box-sizing: border-box;
        outline: none;
        resize: none;
        border: none;
        width: 100%;
        height: 80px;
        border-radius: 8px;
        padding: 10px;
        background: $backgroundColor;
        &::-webkit-input-placeholder {
          color: #9e9e9e;
        }
        &:-moz-placeholder {
          color: #9e9e9e;
        }
        &::-moz-placeholder {
          color: #9e9e9e;
        }
        &::-ms-input-placeholder {
          color: #9e9e9e;
        }
      }
    }
  }
}
</style>
