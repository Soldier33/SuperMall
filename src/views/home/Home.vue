<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control  class="tab-content"
                  :titles="['流行','新歌','精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  v-show="isTabFixed">
    </tab-control>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            :pullUpLoad="true"
            @scroll="contentScroll"
            @pullingUp= "loadMore" >
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad">
      </home-swiper>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control  :titles="['流行','新歌','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backTop/BackTop'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './ChildComps/HomeSwiper'
import RecommendView from './ChildComps/RecommendView'
import FeatureView from './ChildComps/FeatureView'
import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    console.log('home created');
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY);
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  mounted() {
    // 1.图片加载完成事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500)

    this.itemImgListener = () => {
      refresh()
    }

    this.$bus.$on('itemImageLoad', this.itemImgListener)
    
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    
    backClick() {
      console.log(this.$refs.scroll.message);
      this.$refs.scroll.scrollTo(0, 0)
    },
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000

      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log(this.tabOffsetTop);
    },
    /**
     * 网络请求相关方法
     * 即获取接口数据方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list      
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res=> {
        this.goods[type].list.push(...res.data.list)  
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  }
  
 }
</script>

<style  scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  /* IE不能乱用sticky */
  /* 此块代码在better-scroll不生效 */
  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
  /* 方式一 */
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* 方式二：顶部44+底部49=93 */
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

  /* 此方案失败，因为被better-scroll改变
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
  .tab-content {
    position: relative;
    z-index: 9;
  }
</style> 