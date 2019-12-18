<template>
  <div class='questionnaire-list'>
    <!-- <transition-group name="list" appear> -->
      <QuestionnaireListItem v-for="item of list" :key="item.id" :title="item.title"/>
    <!-- </transition-group> -->
  </div>
</template>
<script>
import QuestionnaireListItem from './QuestionnaireListItem'
  export default {
    name: 'QuestionnaireList',
    components: {
      QuestionnaireListItem
    },
    props: {
      list: {
        type: Array,
        default: () => ([])
      }
    },
    methods: {}
  }
</script>
<style scoped lang='scss'>
.questionnaire-list {
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>