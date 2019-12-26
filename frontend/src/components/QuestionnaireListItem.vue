<template>
  <div class="questionnaire-list-item">
    <span class="questionnaire-list-item__title">{{ data.title }}</span>
    <div class="questionnaire-list-item__controler">
      <el-button type="primary" size="mini" @click="handleClick">数据</el-button>
      <el-button type="danger" size="mini" @click="deleteSelf" plain>删除</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "QuestionnaireListItem",
  props: {
    data: {
      type: Object,
      default: () => ({ title: '标题', id: 0 })
    }
  },
  methods: {
    handleClick() {
      this.$router.push('/visualize')
    },
    deleteSelf() {
      this.$emit('delete', this.data)
    }
  }
};
</script>
<style scoped lang='scss'>
.questionnaire-list-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 10px -2px;
  padding: 2rem;
  border-radius: 4px;
  margin: 1rem;
}

.questionnaire-list-item__title {
  
}

.questionnaire-list-item__controler { 
  
}
</style>