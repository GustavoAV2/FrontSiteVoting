<template>
    <div :class="`alert alert-${status} container`" role="alert">
        {{msg}}
    </div>
</template>

<script>
export default {
    props:{
        msg: {
            default: 'Error server',
            type: String
        },
        status:{
            default: 'danger',
            type: String   
        }
    },
}
</script>

<style scoped>
.alert{
    margin-top: 10px;
    width: 600px;
}
</style>