<template>
  <div class="questionnaire-list-item">
    <span class="questionnaire-list-item__title">{{ title }}</span>
    <div class="questionnaire-list-item__controler">
      <el-button type="primary" size="mini">编辑问卷</el-button>
      <el-button type="danger" size="mini" plain>删除问卷</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "QuestionnaireListItem",
  props: {
    title: {
      type: String,
      default: 'null'
    }
  },
  methods: {}
};
</script>
<style scoped lang='scss'>
.questionnaire-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem;
}

.questionnaire-list-item__title {
  
}

.questionnaire-list-item__controler { 
  
}
</style>