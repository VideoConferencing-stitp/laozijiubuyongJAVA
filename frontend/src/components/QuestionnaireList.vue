<template>
  <div class="questionnaire-list">
    <QuestionnaireListItem v-for="item of list" :key="item.id" :data="item" @delete="deleteItem"/>
  </div>
</template>
<script>
import QuestionnaireListItem from "./QuestionnaireListItem";
export default {
  name: "QuestionnaireList",
  components: {
    QuestionnaireListItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    deleteItem(payload) {
      const { id } = payload
      this.$store.commit('REMOVE_QUESTIONNAIRE_LIST', id)
    }
  }
};
</script>
<style scoped lang='scss'>
.questionnaire-list {
}
</style>