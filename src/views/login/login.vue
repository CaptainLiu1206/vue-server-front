<template>
    <div class="login container">
        <div class="x-mark">
            <div class="container">
                <div class="left"></div>
                <div class="right"></div>
            </div>
        </div>
        <div class="intro-container">
            
            <h1>ONE WITH AN EVERLASTING DESIRE <br> FOR THE UNKNOWN & UNTOLD</h1>

            <div class="button shift-camera-button">
                <div class="border">
                    <div class="left-plane"></div>
                    <div class="right-plane"></div>
                </div>	
                <div class="text">点击进入</div>
            </div>
        </div>
        <div class="sky-container">
            <div class="test-form"></div>
            <!-- <div class="text-right sky-container__left">
                <h2 class="portfolio">
                    PORTFOLIO
                </h2>
                <h2 class="resurrection">
                    resurrection	
                </h2>
            </div>
            <div class="text-left sky-container__right">
                <h2 class="08">
                    08
                </h2>
                <h2 class="thirty-one">
                    31
                </h2>
                <h2 class="2016">
                    2016
                </h2>
            </div> -->
        </div>
        <!-- <el-form class="form" label-width="70px">
            <h3 class="title">{{title}}</h3>
            <el-form-item label="用户名">
                <el-input placeholder="请填写用户名" v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input placeholder="请填写密码" autocomplete="new-password" type="password" v-model="userInfo.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" v-if="!isLogin">
                <el-input placeholder="请确认密码" autocomplete="new-password" type="password" v-model="userInfo.confirmPWD"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" v-if="!isLogin">
                <el-input placeholder="请填写邮箱" v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item label-width="0">
                <el-button class="btn" size="medium" type="primary" @click="onSub">{{btnText}}</el-button>
                <a class="label" @click="onToggle">{{label}}</a>
            </el-form-item>
        </el-form> -->
    </div>
</template>
<script>
import * as THREE from 'three'
import { TweenLite, Power3, TimelineMax  } from 'gsap'
import createAnimation from './createLoginAnimation'

export default {
    data () {
        return {
            isLogin: true,
            userInfo: {
                username: '',
                email: '',
                password: '',
                confirmPWD: ''
            }
        }
    },
    computed: {
        title () {
            return this.isLogin ? 'Login' : 'Register'
        },
        label () {
            return this.isLogin ? '没有账号？请注册' : '有账号？请登录'
        },
        btnText () {
            return this.isLogin ? '登录' : '注册'
        }
    },
    mounted () {
        createAnimation(THREE, TweenLite, Power3, TimelineMax, document.querySelector('.container'))
    },
    methods: {
        onToggle () {
            this.isLogin = !this.isLogin
        },
        onSub () {
            const userInfo = this.userInfo
            if (!userInfo.username) {
                this.$message.error('请填写用户名')
                return false
            }
            if (!userInfo.password) {
                this.$message.error('请填写密码')
                return false
            }
            let user = {}
            if (!this.isLogin) {
                if (!userInfo.confirmPWD) {
                    this.$message.error('请填写确认密码')
                    return false
                }
                if (userInfo.confirmPWD !== userInfo.password) {
                    this.$message.error('两次密码不一致')
                    return false
                }
                if (!userInfo.email) {
                    this.$message.error('请填写邮箱')
                    return false
                }
                user.email = userInfo.email
            }
            user.username = userInfo.username
            user.password = userInfo.password
            this.$store.dispatch(this.title.toLocaleLowerCase(), user).then(resp => {
                if (resp.success) {
                    const _path = this.$route.query.redirect || '/home'
                    this.$router.push(_path)
                } else {
                    this.$message.error(resp.message || 'failur')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .login {
        overflow: hidden;
        position: relative;
        // background: url('../assets/img/loginBg.jpg') center no-repeat;
        // background-size: cover;
        margin: 0;
        .form {
            position: absolute;
            top: 40%;
            left: 50%;
            width: 450px;
            height: auto;
            transform: translate3d(-50%, -50%, 0);
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px 20px 20px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
            text-align: center;
            .title {
                font-family:"微软雅黑", "Dosis", sans-serif;
                text-transform: uppercase;
                font-size: 40px;
                font-weight: bold;
                color: #1787FB;
                text-shadow: -2px -2px white, 2px 2px #ccc;
                margin-bottom: 20px;
            }
            .btn {
                width: 100%;
                height: 100%;
                line-height: 26px;
                font-size: 18px;
            }
            .label {
                display: block;
                margin-top: 8px;
                cursor: pointer;
                text-align: right;
                font-size: 12px;
                line-height: 18px;
            }
        }
        .test-form {
            height: 200px;
            width: 400px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -125px;
            margin-left: -205px;
            border: 1px solid #666;
            background: #373737;
        }
        .intro-container {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            text-align: center;
            margin: 0 auto;
            right: 0;
            left: 0;
            }

            h1 {
            font-family: 'brandon-grotesque', sans-serif;
            font-weight: bold;
            margin-top: 0px;
            margin-bottom: 0;
            font-size: 20px;
            }
            @media screen and (min-width: 860px) {
            h1 {
                font-size: 40px;
                line-height: 52px;
            }
            }

            .fancy-text {
            font-family: "adobe-garamond-pro",sans-serif;
            font-style: italic;
            letter-spacing: 1px;
            margin-bottom: 17px;
            }

            .button {
            position: relative;
            cursor: pointer;
            display: inline-block;
            font-family: 'brandon-grotesque', sans-serif;
            text-transform: uppercase;
            min-width: 200px;
            margin-top: 30px;
            }
            .button:hover .border {
            box-shadow: 0px 0px 10px 0px white;
            }
            .button:hover .border .left-plane, .button:hover .border .right-plane {
            transform: translateX(0%);
            }
            .button:hover .text {
            color: #121212;
            }
            .button .border {
            border: 1px solid white;
            transform: skewX(-20deg);
            height: 32px;
            border-radius: 3px;
            overflow: hidden;
            position: relative;
            transition: .10s ease-out;
            }
            .button .border .left-plane, .button .border .right-plane {
            position: absolute;
            background: white;
            height: 32px;
            width: 100px;
            transition: .15s ease-out;
            }
            .button .border .left-plane {
            left: 0;
            transform: translateX(-100%);
            }
            .button .border .right-plane {
            right: 0;
            transform: translateX(100%);
            }
            .button .text {
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            transition: .15s ease-out;
            }

            .x-mark {
            right: 10px;
            top: 10px;
            position: absolute;
            cursor: pointer;
            opacity: 0;
            }
            .x-mark:hover .right {
            transform: rotate(-45deg) scaleY(1.2);
            }
            .x-mark:hover .left {
            transform: rotate(45deg) scaleY(1.2);
            }
            .x-mark .container {
            position: relative;
            width: 20px;
            height: 20px;
            }
            .x-mark .left, .x-mark .right {
            width: 2px;
            height: 20px;
            background: white;
            position: absolute;
            border-radius: 3px;
            transition: .15s ease-out;
            margin: 0 auto;
            left: 0;
            right: 0;
            }
            .x-mark .right {
            transform: rotate(-45deg);
            }
            .x-mark .left {
            transform: rotate(45deg);
            }

            .sky-container {
            position: absolute;
            color: white;
            text-transform: uppercase;
            margin: 0 auto;
            right: 0;
            left: 0;
            top: 2%;
            text-align: center;
            opacity: 0;
            }
            @media screen and (min-width: 860px) {
            .sky-container {
                top: 18%;
                right: 12%;
                left: auto;
            }
            }
            .sky-container__left, .sky-container__right {
            display: inline-block;
            vertical-align: top;
            font-weight: bold;
            }
            .sky-container__left h2, .sky-container__right h2 {
            font-family: 'brandon-grotesque', sans-serif;
            font-size: 26px;
            line-height: 26px;
            margin: 0;
            }
            @media screen and (min-width: 860px) {
            .sky-container__left h2, .sky-container__right h2 {
                font-size: 72px;
                line-height: 68px;
            }
            }
            .sky-container__left {
            margin-right: 5px;
            }
            .sky-container .thirty-one {
            letter-spacing: 4px;
            }

            .text-right {
            text-align: right;
            }

            .text-left {
            text-align: left;
            }

            .twitter:hover a {
            transform: rotate(-45deg) scale(1.05);
            }
            .twitter:hover i {
            color: #21c2ff;
            }
            .twitter a {
            bottom: -40px;
            right: -75px;
            transform: rotate(-45deg);
            }
            .twitter i {
            bottom: 7px;
            right: 7px;
            color: #00ACED;
            }

            .social-icon a {
            position: absolute;
            background: white;
            color: white;
            box-shadow: -1px -1px 20px 0px rgba(0, 0, 0, 0.3);
            display: inline-block;
            width: 150px;
            height: 80px;
            transform-origin: 50% 50%;
            transition: .15s ease-out;
            }
            .social-icon i {
            position: absolute;
            pointer-events: none;
            z-index: 1000;
            transition: .15s ease-out;
            }

            .youtube:hover a {
            transform: rotate(45deg) scale(1.05);
            }
            .youtube:hover i {
            color: #ec4c44;
            }
            .youtube a {
            bottom: -40px;
            left: -75px;
            transform: rotate(45deg);
            }
            .youtube i {
            bottom: 7px;
            left: 7px;
            color: #E62117;
            }
    }
</style>
