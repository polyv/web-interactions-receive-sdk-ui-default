import basicMixin from '../../../assets/mixins/basic';
import VTable from '../../common/table/Table';

// 默认观众头像
const defaultUserAvatar = 'https://s1.videocc.net/default-img/avatar/viewer.png';

export default {
  components: {
    VTable,
  },
  mixins: [basicMixin],
  props: {
    questionRank: {
      type: Array,
      default: () => {
        return [];
      }
    },
    userRank: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  computed: {
    titleImage() {
      return this.lang === 'zh_CN' ? require('./imgs/rank-text.svg') : require('./imgs/rank-text-en.svg');
    },
    userRankArr({ userRank }) {
      if (!userRank || !(userRank.rank)) return [];
      return [{
        ...userRank,
        costTimeStr: this.getCostTime(userRank.costTime),
        rankIndex: userRank.rank,
        avatar: userRank.avatar ?? defaultUserAvatar
      }];
    },
    rankIcon({ topResults }) {
      let rankIcon = [];
      if (topResults.length === 1) {
        rankIcon = [
          require('./imgs/rank-icon1.svg'),
        ];
      } else {
        rankIcon = [
          require('./imgs/rank-icon2.svg'),
          require('./imgs/rank-icon1.svg'),
          require('./imgs/rank-icon3.svg'),
        ];
      }
      return rankIcon;
    },
    topResults({ questionRank }) {
      const topResults = Array(3).fill({
        hasUser: false
      }).map((item, index) => {
        const rankItem = questionRank[index];
        if (rankItem) {
          return {
            ...rankItem,
            hasUser: true,
            avatar: rankItem.avatar ?? defaultUserAvatar,
            costTimeStr: this.getCostTime(rankItem.costTime)
          };
        } else {
          return {
            nickname: '虚位以待',
            avatar: defaultUserAvatar,
          };
        }
      });

      // 展示上, 第一二位置对调
      [topResults[0], topResults[1]] = [topResults[1], topResults[0]];

      return topResults;
    },
    bottomResults({ questionRank, topResults }) {
      const len = topResults.length > 3 ? 3 : 0;
      const rankStart = len > 0 ? len : 1;
      return questionRank.slice(len).map((item, index) => {
        return {
          rankIndex: rankStart + index,
          avatar: item.avatar ?? defaultUserAvatar,
          costTimeStr: this.getCostTime(item.costTime),
          ...item
        };
      });
    }
  },
  methods: {
    getCostTime(time) {
      const addZero = (num) => (num < 10 ? '0' + num : num);
      const hour = addZero(parseInt(time / 60 / 60 % 24));
      const minute = addZero(parseInt(time / 60 % 60));
      const second = addZero(parseInt(time % 60));
      return `${hour}:${minute}:${second}`;
    }
  },
};
