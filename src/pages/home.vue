<style lang="less" scoped>

</style>

<template>
    <div>
        <a @click="vuejsGrid">vuejsGrid-vuejs网格</a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            vuejsGrid() {
                this.$router.push({
                    path: '/Grid'
                })
            }
        }
    }
</script>


