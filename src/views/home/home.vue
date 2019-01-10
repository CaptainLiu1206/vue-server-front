<template>
    <div class="home">
        <!-- <Header /> -->
        <div>
            <div id="slider">
                <div class="slider-inner">
                    <div id="slider-content">
                        <div class="meta">Species</div>
                        <h2 id="slide-title">Amur <br>Leopard</h2>
                        <span data-slide-title="0">Amur <br>Leopard</span>
                        <span data-slide-title="1">Asiatic <br>Lion</span>
                        <span data-slide-title="2">Siberian <br>Tiger</span>
                        <span data-slide-title="3">Brown <br>Bear</span>
                        <div class="meta">Status</div>
                        <div id="slide-status">Critically Endangered</div>
                        <span data-slide-status="0">Critically Endangered</span>
                        <span data-slide-status="1">Endangered</span>
                        <span data-slide-status="2">Endangered</span>
                        <span data-slide-status="3">Least Concern</span>
                    </div>
                </div>
                <img v-for="(item, idx) in imgs" :key="`img_${idx}`" :src="item" alt="">
                <div id="pagination">
                    <button data-slide="0" class="active"></button>
                    <button data-slide="1"></button>
                    <button data-slide="2"></button>
                    <button data-slide="3"></button>
                </div>
            </div>
        </div>
        <!-- <Footer /> -->
    </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import Header from '../../layout/Header.vue'
import Footer from '../../layout/Footer.vue'
import Main from '../../layout/Main.vue'

import * as THREE from 'three'
import { TweenLite } from 'gsap'
import ImagesLoaded from 'imagesloaded'
import SliderAnimation from './render'

export default {
    name: 'Home',
    asyncData ({ store, route }) {},
    data () {
        return {
            title: 'This is Home Page',
            imgs: [
                require('../../assets/img/a1.jpg'),
                require('../../assets/img/a2.jpg'),
                require('../../assets/img/a3.jpg'),
                require('../../assets/img/a4.jpg')
            ]
        }
    },
    computed: {},
    mounted () {
        this.$nextTick(() => {
            this.initAnimation()
        })
    },
    methods: {
        initAnimation () {
            ImagesLoaded(document.querySelectorAll('img'), function () {
                document.body.classList.remove('loading')
                var el = document.getElementById('slider')
                var imgs = Array.from(el.querySelectorAll('img'))
                new SliderAnimation({
                    parent: el,
                    images: imgs
                }, THREE, TweenLite)
            })
        },
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
    @import url('./style.css');
</style>
