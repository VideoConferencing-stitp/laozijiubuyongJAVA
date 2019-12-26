<template>
  <div class="visualize">
    <div class="header">
      <el-page-header @back="() => $router.back()" content="数据分析"></el-page-header>
    </div>
    <div class="charts-container">
      <template v-for="(chartData, index) of chartDatas">
        <div class="charts-wrapper" :key="index">
          <el-dropdown @command="type => changeChartType(type, index)">
            <span class="el-dropdown-link">
              下拉菜单
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="bar">条形图</el-dropdown-item>
              <el-dropdown-item command="pie">饼图</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <BarChart v-if="chartTypes[index] === 'bar'" :chartData="chartData" />
          <PieChart v-else-if="chartTypes[index] === 'pie'" :chartData="chartData" />
        </div>
      </template>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import getQnDataApi from "../api/getQnDataApi";

export default {
  components: {
    BarChart,
    PieChart
  },
  name: "Visualize",
  data() {
    return {
      chartDatas: [],
      chartTypes: [], //存放charts的类型
    };
  },
  created() {
    this.loadChartData();
  },
  watch: {
    chartDatas(newV) {
      this.chartTypes = newV.map(item => Math.random() > 0.5 ? 'bar': 'pie')
    },
    '$store.state.currentQnId'() { // 消除 keep-alive 组件复用不更新请求数据
        this.loadChartData()
    }
  },
  methods: {
    async loadChartData() {
      try {
        const qnId = this.$store.state.currentQnId
        const res = await getQnDataApi({ qnId });
        const { code, msg, data } = res;
        this.chartDatas = data.chartDatas;
      } catch (e) {
        console.error(e)
      }
    },
    changeChartType(type, index) {
      this.chartTypes.splice(index, 1, type)
    }
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
