import service from "@/api/axios.js";

export function getListRadio(url, data = {}) {
  return service({
    url: `/api/projecthouse/${url}/message`,
    method: "get",
    params: data,
  });
}

// 漏损率
export function getWaterLeakageList(data = {}) {
  return service({
    url: `/api/home/getWaterLeakageList`,
    method: "get",
    params: data,
  });
}

// 再生水
export function getWaterRatioList(data = {}) {
  return service({
    url: `/api/home/getWaterRatioList`,
    method: "get",
    params: data,
  });
}

// 污水检测
export function getWsList(data = {}) {
  return service({
    url: `/api/home/getWsList`,
    method: "get",
    params: data,
  });
}

export function ssscehsi(data = {}) {
  return service({
    url: `sjg/bigScreen/getTjsxfl`,
    method: "get",
    params: data,
  });
}
