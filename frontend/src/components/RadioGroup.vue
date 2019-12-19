<template>
  <div class="radio-group">
    <el-radio-group v-model="radio">
      <el-radio v-for="(label, index) of labels" :key="index" :label="label">{{ label }}</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: "RadioGroup",
  props: {
    radio: {
      type: Number,
      default: 0
    },
    labels: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {}
};
</script>
<style scoped lang='scss'>
</style>