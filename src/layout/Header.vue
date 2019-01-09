<template>
    <div class="head">{{user.username}}</div>
</template>
<script>
import { mapGetters } from 'vuex' 

export default {
    name: 'Header',
    computed: {
        ...mapGetters(['user'])
    }
}
</script>
<style lang="scss">

</style>
