import { Product } from '@polyv/interactions-receive-sdk';

export default {
  data() {
    return {
      /** 商品库 sdk 实例 */
      productSdk: null,

      visible: false,

      jobDetail: {
        cover: '',
        name: '',
        tags: [],
        params: ''
      },

      logoImg: 'https://liveimages.videocc.net/assets/wimages/pc_images/logo.png?x-oss-process=image/resize,mfit,w_100,h_100,limit_1',
      title: '招聘魔女职业招聘魔女职业招聘魔女职业招聘魔女职业招聘魔女职业招聘魔女职业招聘魔女职业招聘魔女职业招聘魔女职业招聘魔女职业招聘魔女职业',
      tags: ['3-5年', '学历不限', '包吃住'],
      salary: '7-8K',
      textareaContent: `
        <p>大当家啊实打实asdadasdasdasdasdasdasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd<p/>
        <img src="https://liveimages.videocc.net/assets/wimages/pc_images/logo.png?x-oss-process=image/resize,mfit,w_100,h_100,limit_1" />
        <p>大当家啊实打实<p/>
        <img src="https://liveimages.videocc.net/assets/wimages/pc_images/logo.png?x-oss-process=image/resize,mfit,w_100,h_100,limit_1" />
        <p>大当家啊实打实<p/>
        <img src="https://liveimages.videocc.net/assets/wimages/pc_images/logo.png?x-oss-process=image/resize,mfit,w_100,h_100,limit_1" />
        <p>大当家啊实打实<p/>
        <img src="https://liveimages.videocc.net/assets/wimages/pc_images/logo.png?x-oss-process=image/resize,mfit,w_100,h_100,limit_1" />
        <p>大当家啊实打实<p/>
        <img src="https://liveimages.videocc.net/assets/wimages/pc_images/logo.png?x-oss-process=image/resize,mfit,w_100,h_100,limit_1" />
        <p>大当家啊实打实<p/>
        <img src="https://liveimages.videocc.net/assets/wimages/pc_images/logo.png?x-oss-process=image/resize,mfit,w_100,h_100,limit_1" />
        <p>大当家啊实打实<p/>
        <img src="https://liveimages.videocc.net/assets/wimages/pc_images/logo.png?x-oss-process=image/resize,mfit,w_100,h_100,limit_1" />
        <p>大当家啊实打实<p/>
        <img src="https://liveimages.videocc.net/assets/wimages/pc_images/logo.png?x-oss-process=image/resize,mfit,w_100,h_100,limit_1" />
        <p>大当家啊实打实<p/>
        <img src="https://liveimages.videocc.net/assets/wimages/pc_images/logo.png?x-oss-process=image/resize,mfit,w_100,h_100,limit_1" />
        <p>大当家啊实打实<p/>
        <img src="https://liveimages.videocc.net/assets/wimages/pc_images/logo.png?x-oss-process=image/resize,mfit,w_100,h_100,limit_1" />
      `
    };
  },
  mounted() {
    this.productSdk = new Product();
  },

  methods: {
    hideJobDetail() {
      this.visible = false;
    },

    handleShowJobDetail(data) {
      this.$set(this, 'jobDetail', data);
      this.visible = true;
    },
  }
};
