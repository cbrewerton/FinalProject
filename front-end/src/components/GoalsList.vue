<template>
<div>
  <section class="container">
    <div class="goal" v-for="goal in goals" v-bind:key="goal._id">
      <div class="goalInfo">
        <p class="goalTitle">{{goal.goal}}:  </p>
        <p class="goalDescription">{{goal.description}}</p>
        <p class="goalDescription">Complete by: {{goal.dateToComplete}}</p>
        <p class="goalDate">{{goal.user.firstName}} {{goal.user.lastName}}</p>
        <editor :show="show" @close="close" />
      </div>
      <p class="goalDate">{{formatDate(goal.created)}}</p>
      <a @click="toggleEdit"><i class="fas fa-edit"></i></a>
      <a @click="deleteGoal(goal)"><i class="fas fa-trash"></i></a>
      <br><br>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';
import Editor from './Editor.vue';
import axios from 'axios';
export default {
  components: { Editor },
  name: 'GoalGallery',
  props: {
    goals: Array
  },
  data(){
    return{
    show: false,
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    close() {
      this.show = false;
    },
    toggleEdit() {
      this.show = true;
    },
    async deleteGoal(goal) {
      try {
        await axios.delete("/api/goals/" + goal.id);
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.goalInfo {
  display: block;
  justify-content:left;
  font-size: 1.5em;
}

.goalTitle{
  font-weight: bolder;

}

.goalInfo p {
  margin: 0px;
}

.goalDate {
  font-size: 0.5em;
  font-weight: lighter;
}

p {
  margin: 0px;
}

.container {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  padding: 12px 8px 12px 40px;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;
}

</style>