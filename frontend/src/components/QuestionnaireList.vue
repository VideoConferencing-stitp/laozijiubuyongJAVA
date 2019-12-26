<template>
  <div class="questionnaire-list">
    <QuestionnaireListItem v-for="item of list" :key="item.id" :data="item" @delete="deleteItem" />
  </div>
</template>
<script>
import QuestionnaireListItem from "./QuestionnaireListItem";
import deleteQnApi from "../api/deleteQnApi";
import getQnListApi from "../api/getQnListApi"

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
    async deleteItem(payload) {
      const { id } = payload;
      try {
        const res = await deleteQnApi({ qnId: id });
        const { code, msg } = res;
        if (code === 200) {
          this.$message({
            type: "success",
            message: msg
          });
          await this.loadQnList()
        } else {
          this.$message({
            type: "error",
            message: msg
          });
        }
      } catch (e) {
        this.$message({
          type: "error",
          message: e.message
        });
      }
      this.$store.commit("REMOVE_QUESTIONNAIRE_LIST", id);
    },
    async loadQnList() {
      try {
        const { userId } = this.$store.state.user;
        const res = await getQnListApi({ userId });
        this.$store.commit("SET_QUESTIONNAIRE_LIST", res.qnList);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>
<style scoped lang='scss'>
.questionnaire-list {
}
</style>