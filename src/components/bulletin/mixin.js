import { formatDate } from '@polyv/utils/src/date';
import basicMixin from '../../assets/mixins/basic';

export default {
  mixins: [basicMixin],
  methods: {
    convertTime(timestamp) {
      const now = new Date();
      const target = new Date(timestamp);
      const ny = now.getFullYear();
      const nm = now.getMonth();
      const nd = now.getDate();
      const ty = target.getFullYear();
      const tm = target.getMonth();
      const td = target.getDate();
      const tf = formatDate(timestamp, 'hh:mm');
      if (ny === ty && nm === tm && nd === td) {
        return this.iarTrans('bulletin.today') + tf;
      } else if (ny === ty && nm === tm && nd - td === 1) {
        return this.iarTrans('bulletin.yesterday') + tf;
      } else {
        return formatDate(timestamp, 'YYYY-MM-DD hh:mm');
      }
    },
    formatContent(content) {
      return content.replace(/<img.*?>/gi, `[${this.iarTrans('bulletin.image')}]`);
    },
  }
};
