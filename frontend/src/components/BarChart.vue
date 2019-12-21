<template>
  <div class="bar-chart">
    <chart :options="options" />
  </div>
</template>

<script type="text/ecmascript-6">
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";

export default {
  name: "BarChart",
  props: {
    chartData: {
      type: Object,
      default: () => ({
          title: "该数据对应的题目该数据对应的题目该数据对应的题目该数据对应的题目该数据对应的题目该数据对应的题?",
          data: [
            { value: 10, name: 'A' },
            { value: 90, name: 'B' },
            { value: 202, name: 'C' },
            { value: 430, name: 'D' },
            { value: 22, name: 'F' },
            { value: 1290, name: 'G' },
          ]
      })
    }
  },
  data() {
    return {
      options: {
        title: {
          text: [
            ...this.chartData.title
          ]
            .map((s, index) => (index % 30 >= 29 ? `${s}\n` : s))
            .join(""),
          x: "center",
          textStyle: {
            fontSize: 14,
            lineHeight: 20
          }
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.chartData.data.map(item => item.name), // 问卷的选项
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: "50%",
            barGap: 0,
            data: this.chartData.data.map(item => item.value)
          }
        ]
      }
    };
  }
};
</script>

<style scoped lang="scss"></style>
