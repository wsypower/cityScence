const shareRadioList = [
  {
    default: "watergwbuild",
    options: [
      { value: "watergwbuild", name: "新建供水管网" },
      { value: "watergwupdate", name: "改造供水管网" },
      { value: "watercapacitybuild", name: "新增供水能力" },
      { value: "watercapacitybuildupd", name: "改造供水能力" },
      { value: "tsecondupdatefac", name: "改造二次供水设施" },
      { value: "tcitycountrywater", name: "城乡供水一体化" },
      { value: "rawatharvesting", name: "新建雨水收集系统" },
      { value: "watsaveupdate", name: "改造节水器具" },
      { value: "onehousetable", name: "改造一户一表" },
    ],
  },
  {
    default: "tbuildraintable",
    options: [
      { value: "tbuildraintable", name: "建设雨水管网" },
      { value: "timpovepip", name: "提标改造管网" },
      { value: "train", name: "雨污分流改造管网" },
      { value: "tclear", name: "清淤排水管网" },
      { value: "tequip", name: "新增应急设备" },
      { value: "tbulidpondingtable", name: "积水点改造工程" },
    ],
  },
  {
    default: "gwbuild",
    options: [
      { value: "gwbuild", name: "污水配套管网建设" },
      { value: "gwupdate", name: "污水配套管网改造" },
      { value: "emissionupdate", name: "清洁排放技术改造项目" },
      { value: "sludge", name: "污泥处理处置设施建设" },
      { value: "sewagenewbuild", name: "污水处理厂新扩建" },
      { value: "zemission", name: "污水零直排建设" },
    ],
  },
];

export default shareRadioList;
