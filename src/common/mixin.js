import {debounce} from './utils'
import BackTop from 'components/common/backTop/BackTop'
import {BACK_POSITION} from 'common/const'
import {POP, SELL, NEW} from 'common/const'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    mounted() {
        this.refresh = debounce(this.$refs.scroll.refresh, 500)
        this.itemListener = () => {
            this.refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemListener)    
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop,
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = -position.y > BACK_POSITION
        }
    }
}

export const tabControlMixin = {
    data() {
        return {
            currentType: POP
        }
    },
    methods: {
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = POP
                    break
                case 1:
                    this.currentType = NEW
                    break
                case 2:
                    this.currentType = SELL
                    break
            }
        }
    }
}