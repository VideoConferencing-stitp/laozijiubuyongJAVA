<template>
  <div class="visualize">
    <div class="header">
      <el-page-header @back="() => $router.back()" content="问卷题目"></el-page-header>
    </div>
    <div class="charts-container">
      <template v-for="(chartData, index) of chartDatas">
        <div class="charts-wrapper" :key="index" >
          <BarChart v-if="chartData.chartType === 'bar'" :chartData="chartData"/>
          <PieChart v-else-if="chartData.chartType === 'pie'" :chartData="chartData" />
        </div>
      </template>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

export default {
  components: {
    BarChart,
    PieChart
  },
  name: "Visualize",
  data() {
    return {
      chartDatas: [
        {
          chartType: "bar",
          title:
            "该数据对应的题目该目该数据对应的题目该数据对应的题目该数据对应的题目该数据对应的题?",
          data: [
            { value: 10, name: "A" },
            { value: 90, name: "B" },
            { value: 202, name: "C" },
            { value: 430, name: "D" },
            { value: 22, name: "F" },
            { value: 1290, name: "G" }
          ]
        },
        {
          chartType: "pie",
          title: "该数据对应的题目该数据对应的题目该数据对应的题目据对应的题?",
          data: [
            { value: 10, name: "A" },
            { value: 90, name: "B" },
            { value: 202, name: "C" },
            { value: 430, name: "D" }
          ]
        }
      ]
    };
  },
  mounted() {
    
  },
  methods: {
    // updateChartType(index) {
    //   this.chartDatas.data[index] = 
    // }
  }
};
</script>

<style scoped lang="scss">
.header {
  padding: 1.5rem 2rem;
  border-bottom: solid 1px #e6e6e6;
  margin-bottom: 1rem;
}

.charts-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.charts-wrapper {
  margin: 1.5rem 0;
}
</style>
