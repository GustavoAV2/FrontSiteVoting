<template>
  <div class="home">
    <Header/>
    <Menu/>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import Header from '@/components/Header'

export default {
  components:{Menu, Header},
  name: 'Home',
  beforeCreate(){
    localStorage.clear()
  }
}
</script>

<style scoped>

</style>