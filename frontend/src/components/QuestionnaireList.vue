<template>
  <div class='questionnaire-list'>
    <QuestionnaireListItem v-for="item of list" :key="item.id" :title="item.title"/>
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
</style>