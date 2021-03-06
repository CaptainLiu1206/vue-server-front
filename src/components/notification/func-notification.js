import Notification from './notification.vue'

export default {
    extends: Notification,
    computed: {
        style () {
            return {
                position: 'fixed',
                right: '20px',
                bottom: `${this.verticalOffset}px`
            }
        }
    },
    mounted () {
        this.createTimer()
    },
    methods: {
        createTimer () {
            if (this.atuoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false
                }, this.atuoClose)
            }
        },
        clearTimer () {
            if (this.timer) {
                clearTimeout(this.timer)
            }
        },
        afterEnter () {
            this.height = this.$el.offsetHeight
        }
    },
    beforeDestory () {
        this.clearTimer()
    },
    data () {
        return {
            verticalOffset: 0,
            atuoClose: 3000,
            height: 0,
            visible: false
        }
    }
}
