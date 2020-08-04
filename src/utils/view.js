const changeBarData = ({ data, colors, boundary }) => {
  let max = Math.max(...data.map((val) => val.value));
  return data.map((val, i) => {
    const color = i < boundary ? colors[i] : colors[colors.length - 1];
    const percentage = ~~((val.value / (max + ~~max / 4)) * 100);
    // const percentage = ~~((val.value / (max + ~~max / 4)) * 100);
    return { ...val, color, percentage };
  });
};
export { changeBarData };
