import service from "@/api/axios.js";

export function getTjsxfl(data = {}) {
  return service({
    url: `sjg/bigScreen/getTjsxfl`,
    method: "get",
    params: data,
  });
}

export function getZhsj(data = {}) {
  return service({
    url: `sjg/bigScreen/getZhsj`,
    method: "get",
    params: data,
  });
}

export function getTjfx(data = {}) {
  return service({
    url: `sjg/bigScreen/getTjfx`,
    method: "get",
    params: data,
  });
}

export function getSxTop5(data = {}) {
  return service({
    url: `sjg/bigScreen/getSxTop5`,
    method: "get",
    params: data,
  });
}

export function getBjqs(data = {}) {
  return service({
    url: `sjg/bigScreen/getBjqs`,
    method: "get",
    params: data,
  });
}

export function getBmplTop10(data = {}) {
  return service({
    url: `sjg/bigScreen/getBmplTop10`,
    method: "get",
    params: data,
  });
}
