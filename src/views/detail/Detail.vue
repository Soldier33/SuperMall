<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="nav">
    </detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './ChildComps/DetailNavBar'
import DetailSwiper from './ChildComps/DetailSwiper'
import DetailBaseInfo from './ChildComps/DetailBaseInfo'
import DetailShopInfo from './ChildComps/DetailShopInfo'
import DetailGoodsInfo from './ChildComps/DetailGoodsInfo'
import DetailParamInfo from './ChildComps/DetailParamInfo'
import DetailCommentInfo from './ChildComps/DetailCommentInfo'
import DetailBottomBar from './ChildComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
import {debounce} from "common/utils"
import {itemListenerMixin, backTopMixin} from "common/mixin"
import {BACK_POSITION} from "common/const"

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      data: [],
      goods: {},
      shop:{},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // itemImgListener: null,
      themeTopYs: [0, 1000, 2000, 3000],
      getThemeTopY: null,
      currentIndex: 0,
      message: '',
      isShow: false
    }
  },
  methods: {
    ...mapActions(['addCart']),
    addToCart() {
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 错误
      // this.$store.cartList.push(product)

      // this.$store.commit('addToCart', product)

      //方式一:Promise
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res)
      // })

      // 方式二:mapActions
      this.addCart(product).then(res => {
        this.$toast.show(res, 2000)
      })
    },
    detailImageLoad(){
        // 无防抖
        // this.$refs.scroll.refresh()
        // 有防抖
        this.refresh();
        this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      const positionY = -position.y
      
      let length = this.themeTopYs.length
      
      for(let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.listenShowBackTop(position)
    }
  },
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res=> {
      const data = res.result
      this.topImages = res.result.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //获取商品详细信息
      this.detailInfo = data.detailInfo;
      //获取店铺商品信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0];
      }
    })

    //获取推荐信息
    getRecommend().then(res => {
      this.recommends = res.data.list;
    })

    this.getThemeTopY = debounce(()=> {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_SAFE_INTEGER)
    }, 100)
  },
  // 混入代替
  // mounted() {
  //   // 1.图片加载完成事件监听
  //   const refresh = debounce(this.$refs.scroll.refresh, 500)

  //   this.itemImgListener = () => {
  //     refresh()
  //   }

  //   this.$bus.$on('itemImageLoad', this.itemImgListener)
  // },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
 }
</script>

<style  scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px)
    /* position: absolute;
    top: 44px;
    bottom: 60px; */
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style> 