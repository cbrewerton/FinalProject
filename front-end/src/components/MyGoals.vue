<template>
<div class="main">
  <div class="menu">
    <p><a @click="toggleUpload"><i class="fas fa-dumbbell"></i>Add A Goal</a></p>
    <h2>{{user.firstName}} {{user.lastName}} <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></h2>
    <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div>
  <goals-list :goals="goals" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import GoalsList from '@/components/GoalsList.vue';
export default {
  name: 'MyGoals',
  components: {
      Uploader,
      GoalsList
  },
  data() {
    return {
      show: false,
      goals: [],
      error: '',
    }
  },
  created() {
    this.getGoals();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getGoals() {
      try {
        this.response = await axios.get("/api/goals");
        this.goals = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
      this.getGoals;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getGoals();
    },
  },
  
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
}

.menu h2 {
  font-size: 14px;
}
</style>