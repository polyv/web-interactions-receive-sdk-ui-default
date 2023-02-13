<template>
  <div
    class="plv-ia-qa plv-ia-qa--mob pws-aside-bg-color"
    :class="[`plv-ia-qa--${theme}`, {
      'plv-ia-qa--compatible': isIOSCompatible
    }]"
  >
    <div v-show="showFilter" class="plv-ia-qa-filter pws-aside-bg-border-color pws-aside-bg-color">
      <div v-if="list.length" class="plv-ia-qa-filter__left pws-body-font-color3">{{ iarTrans('questionAnswer.count1') }}{{ list.length }}{{ iarTrans('questionAnswer.count2') }}</div>
      <div v-else class="plv-ia-qa-filter__left pws-body-font-color3">{{ iarTrans('questionAnswer.noData') }}</div>
      <qa-select
        v-model.number="getSelf"
        :options-data="FILTER_ONLY_SELF"
        @change="handleGetSelfChange"
      />
    </div>
    <div class="plv-ia-qa-contents" :class="{'plv-ia-qa-contents--hide-filter': !showFilter}">
      <div v-show="tips" class="plv-ia-qa-tips">
        <span>{{ tips }}</span>
      </div>
      <div v-show="isLoading" class="plv-ia-qa-list-loading">
        <span>{{ iarTrans('questionAnswer.tipsLoading') }}</span>
      </div>
      <div id="plvIaQaList" ref="qa-list-wrap" class="plv-ia-qa-contents__wrap">
        <div
          v-show="!isLoading && (!list || !list.length)"
          class="plv-ia-qa-list-tips pws-plv-ia-qa-list-tips plv-ia-qa-list-tips--no-data pws-aside-bg-color pws-body-font-color3 pws-plv-ia-qa-no-data"
        >
          {{ iarTrans('questionAnswer.tipsNoData') }}
        </div>
        <div
          v-for="qaItem in list"
          :key="qaItem.question.id"
          class="plv-ia-qa-item pws-body-font-color"
          :data-id="qaItem.question.id"
        >
          <div class="plv-ia-qa-question pws-que-bg-color">
            <span class="plv-ia-qa-question__main__label plv-ia-qa-question__main__label--ask"></span>
            <div class="plv-ia-qa__item__main">
              <div class="plv-ia-qa-question__main">
                <multi-line-wrap
                  custom-font-class="pws-hightlight-font-color"
                  custom-bg-class="pws-que-bg-color"
                >
                  <span v-html="qaItem.question.content"></span>
                </multi-line-wrap>
              </div>
              <div class="plv-ia-qa-question__bottom">
                <span class="plv-ia-qa-question-info pws-body-font-color3">
                  <span :class="{'plv-ia-qa-question-info--self-nick': qaItem.isCurrent}">{{ qaItem.question.user.nick }}{{ qaItem.isCurrent? iarTrans('questionAnswer.me') : '' }}</span>
                  <span>{{ formatTime(qaItem.question.timestamp) }}</span>
                  <span
                    v-if="qaItem.isCurrent && qaItem.answers && qaItem.answers.length > 0"
                    class="plv-ia-qa-question-info-me"
                  >
                    {{ iarTrans('questionAnswer.aboutMe') }}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div v-if="qaItem.answers && qaItem.answers.length > 0" class="plv-ia-qa-answer">
            <div
              v-for="(answerItem) in qaItem.answers"
              :key="`${qaItem.question.id}${answerItem.id}`"
              class="plv-ia-qa-answer__item pws-que-bg-color"
              :data-id="`${qaItem.question.id}_${answerItem.id}`"
            >
              <div class="plv-ia-qa__item__main pws-aside-bg-border-color">
                <div class="plv-ia-qa-answer__main">
                  <img
                    v-if="answerItem.imgInfo"
                    class="plv-ia-qa-img"
                    :src="answerItem.imgInfo.url"
                    :alt="iarTrans('questionAnswer.pictureReply')"
                    @click="handlePreview(answerItem.imgInfo)"
                  />
                  <multi-line-wrap
                    v-else
                    custom-font-class="pws-hightlight-font-color"
                    custom-bg-class="pws-que-bg-color"
                  >
                    <span v-html="answerItem.content"></span>
                  </multi-line-wrap>
                </div>
                <div class="plv-ia-qa-answer__bottom">
                  <span class="plv-ia-qa-answer-info pws-body-font-color3">
                    <span>{{ answerItem.user.actor ? answerItem.user.actor + '-' + answerItem.user.nick : answerItem.user.nick }}</span>
                    <span>{{ formatTime(answerItem.timestamp) }}</span>
                    <span>{{ answerItem.isPublic === 'N' ? `(${iarTrans('questionAnswer.notPublic')})` : '' }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="list && list.length && isBottomEnd" class="plv-ia-qa-list-tips pws-plv-ia-qa-list-tips">{{ iarTrans('questionAnswer.tipsBottom') }}</div>
      </div>
    </div>

    <qa-ask
      :has-nick="hasNick"
      @send="handleSend"
      @set-nick="$emit('set-nick')"
    />

    <div
      v-show="news.length && !newsAboutMe.length && !inViewArea"
      class="plv-ia-qa-news pws-que-new-msg-bg-color pws-que-new-msg-text-color"
      @click="showNews()"
    >
      {{ iarTrans('questionAnswer.news') }}
    </div>
    <div
      v-show="newsAboutMe.length && !inViewArea"
      class="plv-ia-qa-news pws-que-new-msg-bg-color pws-que-new-msg-text-color"
      @click="showNews(true)"
    >
      {{ iarTrans('questionAnswer.newsAboutMe') }}
    </div>
  </div>
</template>

<script>
import qaMixin from './mixin';
import Ask from '../../components/question-answer/ask/MobileAsk';
import Select from '../../components/question-answer/select/MobileSelect';
import MultiLineWrap from '../../components/common/multi-line-wrap/MultiLineWrap';
import { isWeixin, isIOS } from '@polyv/utils/src/browser';
import { isMoreThanIPhoneX } from '@/assets/utils/utils';
export default {

  components: {
    'qa-ask': Ask,
    'qa-select': Select,
    MultiLineWrap,
  },
  mixins: [qaMixin],
  data() {
    return {
      isIOSCompatible: isMoreThanIPhoneX() && isWeixin() && window.history.length <= 1,
      showFilter: false, // 是否显示条件选择部分
      scrollClock: null, // 滑动定时器
      latestScrollTop: 0, // 记录上次滚动的位置
      notHandlerScroll: false, // 是否处理滚动事件
      isMobile: true,
    };
  },
  watch: {
    list(newVal) {
      this.clearClock();
      // 当有数据或者选择了与自己相关的问答时显示条件选择
      this.showFilter = newVal.length !== 0 || this.getSelf === 1;
    },
    scrollTop(newVal) {
      // 隐藏条件栏时，高度增加，触发滚动，不做处理
      // 显示条件栏时，高度减少，触发滚动，不做处理
      // 目前测得ios不会
      if (this.notHandlerScroll) {
        this.notHandlerScroll = false;
        return;
      }
      this.clearClock();
      const el = this.eleList;
      const clientHeight = el.clientHeight;
      const scrollHeight = el.scrollHeight;
      const isBottom = newVal + clientHeight >= scrollHeight;
      // 向上滑动时显示条件选择
      // 向上滑动到顶部，真机会出现scrollTop小于0的情况(ios)，当停止滑动，newVal为0，大于上一次的scrollTop，此时也应该显示条件选择栏
      // 向下滑到底部，真机滑块缩小，会造成newVal增大，回弹的时候，newVal会比上一次scrollTop小，此时应该隐藏条件选择栏
      this.showFilter = newVal <= 0 || (newVal < this.latestScrollTop && !isBottom);
      if (!this.showFilter) {
        if (!isIOS()) {
          this.notHandlerScroll = true;
        }
        this.scrollClock = setTimeout(() => {
          this.clearClock();
          this.showFilter = true;
          if (!isIOS()) {
            this.notHandlerScroll = true;
          }
        }, 5000);
      }
      this.latestScrollTop = newVal;
    }
  },
  methods: {
    clearClock() {
      clearTimeout(this.scrollClock);
      this.scrollClock = null;
    },
  }
};
</script>

<style lang="scss">
@import './style/mobile';
@import './style/black-mob';
@import './style/white-mob';
.plv-ia-qa {
  height: 100%;
}
</style>
