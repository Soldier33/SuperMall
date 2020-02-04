<template>
  <div id="shopcart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>

    <cart-list/>

    <cart-bottom-bar/>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';

import { mapGetters } from 'vuex'


export default {
  name: 'Shopcart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //1
    ...mapGetters(['cartCount'])
    //2
    // ...mapGetters({
    //   count: 'cartCount',
    //   list: 'cartList'
    // })
  }
 }
</script>

<style  scoped>
  #shopcart {
    height: 100vh;
  }
  .nav-bar {
    background: var(--color-tint);
    font-weight: 700;
    color: #fff
  }
</style>