export default {
  tooltip: {
    trigger: "item",
  },
  dataRange: {
    min: 0,
    max: 2500,
    x: "left",
    y: "bottom",
    text: ["max", "min"],
    calculable: true,
  },
  toolbox: {
    show: true,
    orient: "vertical",
    x: "right",
    y: "center",
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  roamController: {
    show: false,
    x: "right",
    mapTypeControl: {
      china: false,
    },
  },
  series: [
    {
      type: "map",
      mapType: "浙江",
      roam: false,
      itemStyle: {
        normal: { label: { show: true } },
        emphasis: { label: { show: true } },
      },
    },
  ],
};
