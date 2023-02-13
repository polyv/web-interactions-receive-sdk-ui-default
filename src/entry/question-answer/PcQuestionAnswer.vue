<template>
  <div
    class="plv-ia-qa plv-ia-qa--pc"
    :class="[`plv-ia-qa--${theme}`]"
  >
    <div class="plv-ia-qa-filter pws-aside-bg-color pws-aside-bg-border-color">
      <qa-select
        v-model="getSelf"
        :options-data="FILTER_ONLY_SELF"
        @change="handleGetSelfChange"
      />
    </div>

    <div class="plv-ia-qa-contents">
      <div v-show="tips" :class="`plv-ia-qa-tips plv-ia-qa-tips--${tipsType}`">
        <span>{{ tips }}</span>
      </div>
      <div v-show="isLoading" class="plv-ia-qa-list-loading">
        <span>{{ iarTrans('questionAnswer.tipsLoading') }}</span>
      </div>
      <div class="plv-ia-qa-contents__wrap pws-aside-bg-color">
        <div id="plvIaQaList" ref="qa-list-wrap" class="plv-ia-qa-list pws-chat-scroll-color">
          <div v-show="!isLoading && (!list || !list.length)" class="plv-ia-qa-none pws-body-font-color3">{{ iarTrans('questionAnswer.tipsNoData') }}</div>
          <div
            v-for="qaItem in list"
            :key="qaItem.question.id"
            class="plv-ia-qa-item pws-body-font-color pws-que-bg-color"
            :data-id="qaItem.question.id"
          >
            <div class="plv-ia-qa-question">
              <span class="plv-ia-qa-question__main__label plv-ia-qa-question__main__label--ask">
                {{ iarTrans('questionAnswer.askLabel') }}
              </span>
              <div class="plv-ia-qa-question__main">
                <div>
                  <multi-line-wrap
                    custom-font-class="pws-hightlight-font-color"
                    custom-bg-class="pws-que-bg-color"
                  >
                    <span v-html="qaItem.question.content"></span>
                  </multi-line-wrap>
                </div>
              </div>
              <div class="plv-ia-qa-question__bottom">
                <span class="plv-ia-qa-question-info pws-body-font-color3">
                  <span class="plv-ia-qa-question-info__item">{{ qaItem.question.user.nick }}{{ qaItem.question.user.userId === userInfo.userId ? iarTrans('questionAnswer.me') : '' }}</span>
                  <span class="plv-ia-qa-question-info__item">{{ formatTime(qaItem.question.timestamp) }}</span>
                  <span
                    v-if="qaItem.question.user.userId === userInfo.userId && qaItem.answers && qaItem.answers.length > 0"
                    class="plv-ia-qa-question-info-me"
                  >
                    {{ iarTrans('questionAnswer.aboutMe') }}
                  </span>
                </span>
              </div>
            </div>
            <div v-if="qaItem.answers && qaItem.answers.length > 0" class="plv-ia-qa-answer">
              <div
                v-for="(answerItem) in qaItem.answers"
                :key="`${qaItem.question.id}${answerItem.id}`"
                class="plv-ia-qa-answer__item pws-aside-bg-border-color"
                :data-id="`${qaItem.question.id}_${answerItem.id}`"
              >
                <div class="plv-ia-qa-answer__main">
                  <span class="plv-ia-qa-question__main__label plv-ia-qa-question__main__label--answer">
                    {{ iarTrans('questionAnswer.answerLabel') }}
                  </span>
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
                    <span class="plv-ia-qa-answer-info__item">{{ answerItem.user.nick }}</span>
                    <span class="plv-ia-qa-answer-info__item">{{ formatTime(answerItem.timestamp) }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>

    <qa-ask
      :max-len="Q_MAX_LEN"
      @send="handleSend"
    />
  </div>
</template>

<script>
import qaMixin from './mixin';
import Ask from '../../components/question-answer/ask/PcAsk';
import Select from '../../components/question-answer/select/PcSelect';
import MultiLineWrap from '../../components/common/multi-line-wrap/MultiLineWrap';

export default {

  components: {
    'qa-ask': Ask,
    'qa-select': Select,
    MultiLineWrap,
  },
  mixins: [qaMixin],
};
</script>

<style lang="scss">
@import './style/pc';
@import './style/black-pc';
@import './style/white-pc';
</style>
