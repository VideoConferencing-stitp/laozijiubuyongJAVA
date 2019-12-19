<template>
  <div class="edit">
    
    <RadioGroup :radio="radio" :labels="labels"/>
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="(lable, index) of labels" :label="lable" :key="index"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
import RadioGroup from '../components/RadioGroup'
export default {
  components: {
    RadioGroup
  },
  name: "Edit",
  props: {},
  data() {
    return {
      radio: 1,
      labels: ['复选框 A', '复选框 B', '复选框 C'],
      checkList: ['复选框 B']
    };
  },
  methods: {}
};
</script>
<style scoped lang='scss'>
</style>