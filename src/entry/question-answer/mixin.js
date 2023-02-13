
import { formatDate } from '@polyv/utils/src/date';
import { escapeHTML, nl2br } from '@polyv/utils/src/string';
import entryMixin from '../../assets/mixins/entry';
import langs from '../../assets/locale/lang/question-answer';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
const emotion = require('@polyv/emotion-sdk');

const TIPS_TYPE = {
  DANGER: 'danger',
  SUCCESS: 'success',
};

const DEFAULT_PAGE_SIZE = 10;
const Q_MAX_LEN = 500;

export default {
  langs,
  props: {
    // 主题色：black / white
    theme: {
      type: String,
      default: 'black'
    },
    questionAnswerSdk: {
      type: Object,
      default: null
    },
    hasNick: {
      type: Boolean,
      default: true
    }
  },
  mixins: [entryMixin],

  watch: {
    questionAnswerSdk: {
      immediate: true,
      handler(val) {
        if (val) {
          this.fetchList();
          this.initEvents();
        }
      }
    }
  },

  data() {
    return {
      Q_MAX_LEN,
      DEFAULT_PAGE_SIZE,
      getSelf: 0,
      tips: '', // 绝对定位在顶部的提示
      tipsType: '', // 提示的类型：danger/success
      isLoading: false,
      isTopEnd: true, // 已经加载到顶部了
      isBottomEnd: false, // 已经加载到底部了
      news: [], // 新消息
      newsAboutMe: [], // 与我相关的新消息
      list: [],
      scrollTop: 0, // 滚动条高度
      currentItemTop: 0, // 当前收到回复的消息距离顶部高度
      inViewArea: false, // 是否在可视区域内
    };
  },

  computed: {
    FILTER_ONLY_SELF() {
      return {
        1: this.iarTrans('questionAnswer.relatedToMe'),
        0: this.iarTrans('questionAnswer.allMsg'),
      };
    },

    qaIdList() {
      return this.list.map((item) => item.question.id);
    },
    userInfo() {
      return this.questionAnswerSdk.userInfo;
    },

    eleList() {
      return this.$refs['qa-list-wrap'];
    },

    clientHeight() {
      return this.eleList.clientHeight;
    }
  },

  mounted() {
    this.eleList.addEventListener('scroll', this.handleScroll);
  },

  [BEFORE_DESTROY]() {
    this.eleList.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    formatTime(timestamp) {
      const today = formatDate(Date.now(), 'YYYYMMDD');
      const startDate = formatDate(timestamp, 'YYYYMMDD');
      return formatDate(timestamp, today === startDate ? 'hh:mm' : 'YYYY/MM/DD');
    },
    parseContent(str) {
      return nl2br(emotion.parseEmotions(escapeHTML(str)));
    },
    parseImgContent(str) {
      try {
        return JSON.parse(str);
      } catch (error) {
        return {
          url: '',
          width: 500,
          height: 500,
        };
      }
    },
    /**
     * 获取问答列表数据。
     */
    async fetchList(filters = {}) {
      if (typeof filters.getSelf === 'undefined') {
        filters.getSelf = this.getSelf;
      }
      this.isLoading = true;
      try {
        const res = await this.questionAnswerSdk.fetchList(filters);
        let list = res.data.reverse();
        list = list.map((qaItem) => {
          qaItem.isCurrent = qaItem.question.user.userId === this.questionAnswerSdk.userInfo.userId;
          qaItem.question.user = JSON.parse(qaItem.question.user);
          qaItem.question.content = this.parseContent(qaItem.question.content);
          qaItem.answers = qaItem.answers.map((answerItem) => {
            answerItem.user = JSON.parse(answerItem.user);
            if (answerItem.msgType === 'image') {
              answerItem.imgInfo = this.parseImgContent(answerItem.content);
            } else {
              answerItem.content = this.parseContent(answerItem.content);
            }
            return answerItem;
          });
          return qaItem;
        });
        this.changeEndStatus(list, filters);
        if (!filters.id) {
          this.list = list;
        } else if (filters.getCurrent) {
          this.list = list;
        } else {
          this.list = filters.order ? [...list, ...this.list] : [...this.list, ...list];
        }
        if (filters.order) {
          this.scrollIntoView(filters.id);
        }
      } catch (error) {
        this.toggleTips(error.message || error, TIPS_TYPE.DANGER);
      } finally {
        this.isLoading = false;
      }
    },

    reset() {
      this.getSelf = 0;
      this.isTopEnd = true; // 已经加载到顶部了
      this.isBottomEnd = false; // 已经加载到底部了
      this.news = []; // 新消息
      this.newsAboutMe = []; // 与我相关的新消息
      this.list = [];
      this.fetchList();
    },

    changeEndStatus(list, filters) {
      if (list.length < (filters.size || DEFAULT_PAGE_SIZE)) {
        filters.order ? this.isTopEnd = true : this.isBottomEnd = true;
      } else {
        filters.order ? this.isTopEnd = false : this.isBottomEnd = false;
      }
    },

    initEvents() {
      const { questionAnswerSdk } = this;
      if (!questionAnswerSdk) return;
      this.questionAnswerSdk
        .on(questionAnswerSdk.events.ANSWER, this.handleSocketAnswer)
        .on(questionAnswerSdk.events.DELETE_ANSWER, this.handleSocketDelAnswer)
        .on(questionAnswerSdk.events.UPDATE_SESSIONID, this.handleSessionIdChange);
    },

    // sessionId 改变
    handleSessionIdChange() {
      this.reset();
    },

    // 收到回复消息
    handleSocketAnswer({ data }) {
      const { question, answers } = data;
      const answerItem = answers[0];
      if (answerItem.msgType === 'image') {
        answerItem.imgInfo = this.parseImgContent(answerItem.content);
      } else {
        answerItem.content = this.parseContent(answerItem.content);
      }
      this.addNews(question.id, answerItem.id, question.userId === this.questionAnswerSdk.userInfo.userId ? 'newsAboutMe' : 'news');
      if (this.qaIdList.includes(question.id)) {
        const qaIndex = this.qaIdList.indexOf(question.id);
        const qaItem = this.list[qaIndex];
        if (!qaItem.answers) qaItem.answers = [];
        qaItem.answers.push(answerItem);
        this.list.splice(qaIndex, 1, qaItem);
      } else {
        this.isTopEnd = false;
        this.isBottomEnd = false;
      }
    },

    // 收到删除回答的消息
    handleSocketDelAnswer(msg) {
      const { questionId, id: answerId } = msg;
      if (this.qaIdList.includes(questionId)) {
        const qaIndex = this.qaIdList.indexOf(questionId);
        const qaItem = this.list[qaIndex];
        qaItem.answers = qaItem.answers.filter(item => item.id !== answerId);
        if (qaItem.question.userId !== this.questionAnswerSdk.userInfo.userId && !qaItem.answers.length) { // 移除不是自己发起且0回复的提问
          this.list.splice(qaIndex, 1);
        } else {
          this.list.splice(qaIndex, 1, qaItem);
        }
      }
      this.removeNews(questionId, answerId);
    },

    addNews(questionId, answerId, listName) {
      if (this[listName].filter(item => item.id === questionId).length > 0) {
        this[listName] = this[listName].map((item) => {
          if (item.id === questionId) {
            return {
              id: item.id,
              count: item.count + 1,
              answerIdList: [...item.answerIdList, answerId],
            };
          }
          return item;
        });
      } else {
        this[listName].push({
          id: questionId,
          count: 1,
          answerIdList: [answerId],
        });
      }
      this.$nextTick(() => {
        const ele = this.getCurrentEle(questionId, answerId);
        if (!ele) {
          this.inViewArea = false;
        } else {
          this.currentItemTop = ele.offsetTop;
          this.inViewArea = this.judgeItemInVisibleArea();
        }
      });
      this.emitNews();
    },

    removeNews(questionId, answerId) {
      // 要考虑同一条问题下有两条新回复，但只删除了其中一条回复的情况。
      // newsAboutMe 中不仅要存放提及我的问题id，还要存放每个问题id的新回复数量。
      // news 也一样。
      function remove(list, id) {
        if (list.filter(item => item.id === id).length === 0) return list;

        const newList = [];
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          if (item.id !== id) {
            newList.push(item);
            continue;
          }
          item.count -= 1;
          if (item.answerIdList.includes(answerId)) {
            item.answerIdList.splice(item.answerIdList.indexOf(answerId), 1);
          }
          if (item.count > 0) {
            newList.push(item);
          }
        }

        return newList;
      }
      this.newsAboutMe = remove(this.newsAboutMe, questionId);
      this.news = remove(this.news, questionId);
      this.emitNews();
    },

    // 返回新消息条数
    emitNews() {
      this.$emit('news', this.news.length + this.newsAboutMe.length);
    },

    toggleTips(val, type = TIPS_TYPE.SUCCESS) {
      this.tips = val;
      this.tipsType = type;
      let timer = setTimeout(() => {
        this.tips = '';
        this.tipsType = TIPS_TYPE.SUCCESS;
        clearTimeout(timer);
        timer = null;
      }, 3000);
    },

    // 切换“全部”/“与我相关”
    handleGetSelfChange(value) {
      value = parseInt(value, 10);
      this.fetchList({ getSelf: value });
    },

    // 发起提问
    async handleSend(content) {
      content = content.trim();
      if (!content) {
        this.toggleTips(this.iarTrans('questionAnswer.noQuestionContent'), TIPS_TYPE.DANGER);
        return;
      }
      const res = await this.questionAnswerSdk.sendQuestion(content);
      if (res.code !== 200) {
        this.toggleTips(res.message, TIPS_TYPE.DANGER);
        return;
      }
      const data = res.data;
      data.question.content = this.parseContent(data.question.content);
      data.isCurrent = data.question.user.userId === this.questionAnswerSdk.userInfo.userId;
      this.list.unshift(data);
      if (this.isMobile) {
        this.toggleTips(this.iarTrans('questionAnswer.sendSuccess'));
      } else {
        this.eleList.scrollTop = 0;
      }
    },

    // 滑动到底部/顶部加载更多
    handleScroll() {
      const el = this.eleList;

      const scrollTop = el.scrollTop;
      const clientHeight = el.clientHeight;
      const scrollHeight = el.scrollHeight;
      this.scrollTop = scrollTop;
      if (!this.isLoading) {
        if (scrollTop + clientHeight >= scrollHeight - 30 && !this.isBottomEnd) { // 向下加载更多
          this.fetchList({
            id: this.qaIdList[this.qaIdList.length - 1],
            order: 0,
          });
        } else if (scrollTop <= 0 && !this.isTopEnd) { // 向上加载更多
          this.fetchList({
            id: this.qaIdList[0],
            order: 1,
          });
        }
      }
    },

    async showNews(isAboutMe) {
      const list = isAboutMe ? this.newsAboutMe : this.news;
      const { id: questionId, answerIdList } = list.pop();
      const answerId = answerIdList.pop();
      this.newsAboutMe = [];
      this.news = [];
      if (!isAboutMe && Number(this.getSelf) === 1) {
        this.getSelf = 0;
      }
      await this.fetchList({
        id: questionId,
        getCurrent: 1,
      });
      if (this.list.length < DEFAULT_PAGE_SIZE) {
        await this.fetchList({
          id: questionId,
          order: 1,
          size: DEFAULT_PAGE_SIZE - this.list.length
        });
      }
      this.scrollIntoView(questionId, answerId);
    },

    getCurrentEle(questionId, answerId) {
      const selector = answerId ? `[data-id="${questionId}_${answerId}"]` : `[data-id="${questionId}"]`;
      return this.eleList.querySelector(selector);
    },

    scrollIntoView(questionId, answerId) {
      this.$nextTick(() => {
        this.eleList.scrollTop = this.getCurrentEle(questionId, answerId).offsetTop;
      });
    },
    // 判断新增的回答是否在可视区域内
    judgeItemInVisibleArea() {
      const { clientHeight, scrollTop, currentItemTop } = this;
      return currentItemTop >= scrollTop - 20 && currentItemTop <= scrollTop + clientHeight - 40;
    },

    // 图片预览
    handlePreview(imgData) {
      this.$emit('preview', imgData); // { url, width, heigth }
    },
  }
};
