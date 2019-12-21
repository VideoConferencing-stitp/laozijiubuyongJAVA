<template>
  <div class="bar-chart">
    <chart :options="options" />
  </div>
</template>

<script type="text/ecmascript-6">
import "echarts/lib/chart/pie";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legendScroll";

export default {
  name: "BarChart",
  props: {
    chartData: {
      type: Object,
      default: () => ({
        title: "该数据对应的题目该数据对应的题目该数据对应的题目该数据对应的题目该数据对应的题目该数据对应的题?",
        data: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" }
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
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 0,
          top: 30,
        },
        series: [
          {
            name: "选项",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.chartData.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  }
};
</script>

<style scoped lang="scss"></style>
