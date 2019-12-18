<template>
  <div class="visualize">
    <chart :options="options"/>
  </div>
</template>

<script type="text/ecmascript-6">
import Chart from "vue-echarts/components/ECharts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
export default {
  name: "Visualize",
  components: {
    Chart
  },
  data() {
    return {
      options: {
        title: {
          text: "异步数据加载示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {
          axisLabel: { show: true }
        },
        series: [
          {
            name: "销量",
            data: [5, 20, 36, 10, 10, 20],
            type: "bar"
          }
        ]
      }
    };
  }
};
</script>

<style scoped lang="scss"></style>
