<!-- @file 桌面端反馈组件 -->

<template>
  <div class="plv-feed-back-default plv-feed-sesstion" :data-lang="_useLang">
    <div class="plv-feed-back-default__wrap">
      <div class="plv-feed-back-default__content plv-iar-module-container-default__body" @scroll.passive="getScroll($event)">
        <div class="plv-feed-back-item">
          <p class="plv-feed-back-item-label required">{{ iarTrans('feedBack.feedType') }}</p>
          <input-select
            :select-data="selectData"
            :sel-value="selValue"
            color="white"
            @get-value="getValue"
          />
        </div>
        <div class="plv-feed-back-item">
          <p class="plv-feed-back-item-label required">{{ iarTrans('feedBack.backType') }}</p>
          <div class="plv-feed-back-item-radio-wrap">
            <div v-for="item in radioData" :key="item.value" class="plv-feed-back-item-radio-wrap_item">
              <label>
                <input
                  v-model="radioValue"
                  type="radio"
                  class="plv-feed-back-item-radio-wrap_radio"
                  :name="item.name"
                  :value="item.value"
                />
                <span class="plv-feed-back-item-radio-wrap_radio__dot"></span>
                <span class="plv-feed-back-item-radio-wrap_radio__text">{{ item.text }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="plv-feed-back-item">
          <p class="plv-feed-back-item-label">{{ iarTrans('feedBack.feedContentLable') }} <span>（{{ iarTrans('feedBack.feedContentNum') }}）</span></p>
          <textarea v-model="feedBackContent" class="plv-feed-back-item-content" :placeholder="iarTrans('feedBack.feedContentContent')"></textarea>
        </div>
        <div class="plv-feed-back-item">
          <p class="plv-feed-back-item-label">{{ iarTrans('feedBack.uploadTitle') }} <span>（{{ iarTrans('feedBack.uploadTitleMsg') }}）</span></p>
          <uploader ref="uploaderDom" :max-image-length="1" @get-file="getFile" />
        </div>
        <div class="plv-feed-back-item">
          <p class="plv-feed-back-item-label required">{{ iarTrans('feedBack.codeTitle') }}</p>
          <div class="plv-feed-back-item-code clearfix">
            <input
              v-model="captchaValue"
              class="plv-feed-back-item-code_input"
              onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
              type="text"
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
          <p class="plv-feed-back-item-label">{{ iarTrans('feedBack.phone') }}</p>
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
      <div class="plv-iar-module-container-default__footer plv-feed-back-btn-wrap">
        <div class="plv-iar-pc-feed-back-default__footer" :class="{'plv-box-shadow': !isScrollBottom}">
          <iar-button
            :disabled="isDisabled"
            :btn-style="{ padding: '9px 30px' }"
            @click="feedBackHand"
          >
            {{ iarTrans("feedBack.feedBackBtn") }}
          </iar-button>
        </div>
      </div>
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
import IarButton from '../../components/common/button/PcButton';
import InputSelect from '../../components/feed-back/select/PcSelect';
import uploader from '../../components/feed-back/uploader/uploader';
import Toast from '../../components/common/toast/Toast.vue';
import mixin from './mixin';

export default {
  components: {
    IarButton,
    InputSelect,
    uploader,
    Toast
  },
  mixins: [mixin],
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/basic.scss';
$requiredColor: #ff3636;
$borderColor: #D8D8D8;
$activeColor: #2196F3;
input {
  outline: none;
  border: 1px solid $borderColor;
  height: 40px;
  line-height: 40px;
  border-radius: 3px;
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
}
.plv-iar-pc-feed-back-default__footer {
  padding: 20px 0 20px;
  text-align: center;
  border-top: 1px solid #ECEFF1;
}
.plv-box-shadow {
  box-shadow: 0 -40px 30px -20px #fff;
}
.plv-feed-back-default__content {
  padding: 20px 50px;
  text-align: center;
  height: 500px;
  overflow: auto;
  font-size: 14px;
  color: #666;
  .plv-feed-back-item {
    text-align: left;
    margin-bottom: 20px;
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
        color: #9E9E9E;
      }
    }
    .plv-feed-back-item-content {
      outline: none;
      resize: none;
      width: 100%;
      height: 90px;
      border: 1px solid $borderColor;
      border-radius: 3px;
      padding: 10px;
      box-sizing: border-box;
      font-family: '微软雅黑';
      &::-webkit-input-placeholder {
        color: #9E9E9E;
      }
      &:-moz-placeholder {
        color: #9E9E9E;
      }
      &::-moz-placeholder {
        color: #9E9E9E;
      }
      &::-ms-input-placeholder {
        color: #9E9E9E;
      }
    }
    .plv-feed-back-item-code {
      .plv-feed-back-item-code_input {
        display: inline-block;
        width: 65%;
        float: left;
      }
      .plv-feed-back-item-code_img {
        display: inline-block;
        margin: 0;
        width: 31%;
        float: right;
        height: 38px;
        line-height: 38px;
        margin-top: 1px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .plv-feed-back-item-radio-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .plv-feed-back-item-radio-wrap_item {
        display: table-cell;
        padding-bottom: 2px;
        width: 33%;
        label {
          position: relative;
          display: block;
          padding: 5px 0;
          cursor: pointer;
          line-height: 1;
          .plv-feed-back-item-radio-wrap_radio {
            display: none;
            &:checked+span, &:checked+span:hover {
              border: 5px solid #2196F3;
            }
          }
          .plv-feed-back-item-radio-wrap_radio__dot {
            display: inline-block;
            width: 15px;
            height: 15px;
            box-sizing: border-box;
            transition: 0.15s all ease-in-out;
            border: 1px solid #CFD8DC;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 5px;
            &:hover {
              border: 1px solid $activeColor;
            }
          }
          .plv-feed-back-item-radio-wrap_radio__text {
            display: inline-block;
            line-height: 18px;
            vertical-align: middle;
            word-break: break-word;
          }
        }
      }
    }
    .plv-feed-back-item-radio-wrap_item:nth-child(2), .plv-feed-back-item-radio-wrap_item:nth-child(5) {
      label {
        padding-left: 20px;
        .plv-feed-back-item-radio-wrap_radio__dot {
          left: 25px;
        }
      }
    }
    .plv-feed-back-item-radio-wrap_item:nth-child(3n) {
      label {
        .plv-feed-back-item-radio-wrap_radio__dot {
          left: 50px;
        }
      }
    }
  }
}
.clearfix:before, .clearfix:after {
  content: ' ';
  display: table;
}
.clearfix:after {
  clear: both;
}
.toast-wrap {
  z-index: 99;
}
.plv-feed-back-default[data-lang='zh_CN'] {
  .plv-feed-back-item-radio-wrap_item:nth-child(3n) {
    padding-left: 30px;
    box-sizing: border-box;
    label {
      .plv-feed-back-item-radio-wrap_radio__dot {
        left: 50px;
      }
    }
  }
}
</style>
