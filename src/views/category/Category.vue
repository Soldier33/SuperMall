<template>
  <!-- <div> -->
    <div class="wrapper">
      <ul class="content">
      <button @click="test">test</button>
        <li>1x</li>
        <li>2x</li>
        <li>3x</li>
        <li>4x</li>
        <li>5x</li>
        <li>6x</li>
        <li>7x</li>
        <li>8x</li>
        <li>9x</li>
        <li>10x</li>
        <li>11x</li>
        <li>12x</li>
        <li>13x</li>
        <li>14x</li>
        <li>15x</li>
        <li>16x</li>
        <li>17x</li>
        <li>18x</li>
        <li>19x</li>
        <li>20x</li>
        <li>21x</li>
        <li>22x</li>
        <li>23x</li>
        <li>24x</li>
        <li>25x</li>
        <li>26x</li>
        <li>27x</li>
        <li>28x</li>
        <li>29x</li>
        <li>30x</li>
        <li>31x</li>
        <li>32x</li>
        <li>33x</li>
        <li>34x</li>
        <li>35x</li>
        <li>36x</li>
        <li>37x</li>
        <li>38x</li>
        <li>39x</li>
        <li>40x</li>
        <li>41x</li>
        <li>42x</li>
        <li>43x</li>
        <li>44x</li>
        <li>45x</li>
        <li>46x</li>
        <li>47x</li>
        <li>48x</li>
        <li>49x</li>
        <li>50x</li>
        <li>51x</li>
        <li>52x</li>
        <li>53x</li>
        <li>54x</li>
        <li>55x</li>
        <li>56x</li>
        <li>57x</li>
        <li>58x</li>
        <li>59x</li>
        <li>60x</li>
        <li>61x</li>
        <li>62x</li>
        <li>63x</li>
        <li>64x</li>
        <li>65x</li>
        <li>66x</li>
        <li>67x</li>
        <li>68x</li>
        <li>69x</li>
        <li>70x</li>
        <li>71x</li>
        <li>72x</li>
        <li>73x</li>
        <li>74x</li>
        <li>75x</li>
        <li>76x</li>
        <li>77x</li>
        <li>78x</li>
        <li>79x</li>
        <li>80x</li>
        <li>81x</li>
        <li>82x</li>
        <li>83x</li>
        <li>84x</li>
        <li>85x</li>
        <li>86x</li>
        <li>87x</li>
        <li>88x</li>
        <li>89x</li>
        <li>90x</li>
        <li>91x</li>
        <li>92x</li>
        <li>93x</li>
        <li>94x</li>
        <li>95x</li>
        <li>96x</li>
        <li>97x</li>
        <li>98x</li>
        <li>99x</li>
        <li>100x</li>
      </ul>
    </div>
  <!-- </div> -->
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Category',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'), {
      probeType: 2,
      click: true,
      pullUpLoad: true
    })

    // this.scroll.on('scroll', (position) => {
    //   console.log(position);
    // })

    this.scroll.on('pullingUp', ()=> {
      console.log('上拉加载更多')
      //发送网络请求，请求更多页内容数据

      //添加以下这句，才不会只调用一次
      setTimeout(()=> {
        this.scroll.finishPullUp()
      }, 2000)
    })
  },
  methods: {
    test() {
      console.log('test')
    }
  }
 }
</script>

<style  scoped>
  .wrapper {
    height: 150px;
    background-color: red
  }
</style> 