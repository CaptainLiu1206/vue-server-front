<template>
    <div class="home">
        <!-- <h3>{{ title }}</h3> -->
        <Header />
        <div>
            <div class="ll">home page</div>
            <el-button @click="fetchUserInfo">拉取用户信息</el-button>
        </div>
        <Footer />
    </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import Header from '../layout/Header.vue'
import Footer from '../layout/Footer.vue'
import Main from '../layout/Main.vue'

export default {
    name: 'Home',
    asyncData ({ store, route }) {},
    data () {
        return {
            title: 'This is Home Page'
        }
    },
    computed: {},
    methods: {
        addNotify () {
            this.$notify({
                content: 'notification',
                autoClose: 5000
            })
        },
        toLogin () {
            this.$router.push({path: '/login'})
        },
        fetchUserInfo () {
            this.$store.dispatch('fetchUserInfo').then(resp => {
                if (resp.success) {
                    this.$message.success('拉去数据成功')
                } else {
                    this.$notify({
                        message: resp.message || '拉去数据失败',
                        type: 'error'
                    })
                }
            })
        }
    },
    components: {
        Header,
        Footer,
        Main
    }
}
</script>
<style>
</style>
