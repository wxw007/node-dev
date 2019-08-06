<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {users} from '../api/index.js'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted(){
    // this.HTTPusers()
  },
  methods:{
    HTTPusers(){
      users({a:123}).then( res=>{
        console.log(res);
      })
      .catch( err => {
        console.log(err)
      })
    }
  }
}
</script>
