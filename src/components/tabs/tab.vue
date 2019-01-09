<script>
export default {
    name: 'Tab',
    props: {
        index: {
            type: [Number, String],
            required: true
        },
        label: {
            type: String,
            default: 'tab'
        }
    },
    computed: {
        active () {
            return false
        }
    },
    render () {
        const tab = this.$slots.label || <span>{this.label}</span>
        const classNames = {
            tab: true,
            active: this.active
        }
        return (
            <li class={classNames}>{tab}</li>
        )
    }
}
</script>
<style lang="stylus" scoped>

</style>

