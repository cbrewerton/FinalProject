<template>
<div class="dashboard">
  <MyGoals v-if="user" />
  <Login v-else />
</div>
</template>


<script>
import MyGoals from '@/components/MyGoals.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';
export default {
  name: 'goals',
  components: {
    MyGoals,
    Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding-top: 10px;
}
</style>