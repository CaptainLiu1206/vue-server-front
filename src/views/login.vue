<template>
    <div class="login container">
        <el-form class="form" label-width="70px">
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
        </el-form>
    </div>
</template>
<script>
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
        background: url('../assets/img/loginBg.jpg') center no-repeat;
        background-size: cover;
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
    }
</style>
