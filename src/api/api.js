import axios from 'axios'
import GB from '../global.vue'

let base = GB.srvurl;

export const login = params => {return axios.post(`${base}/login`,params).then(res => res.data);};
export const getDxjl = params => {return axios.post(`${base}/dxjl`,params).then(res => res.data);};
export const getYxyx = params => {return axios.post(`${base}/yxyx`,params).then(res => res.data);};
export const getDxd = params => {return axios.post(`${base}/dxd`,params).then(res => res.data);};
export const addDxd = params => {return axios.post(`${base}/adddxd`,params).then(res => res.data);};
export const delDxd = params => {return axios.post(`${base}/deldxd`,params).then(res => res.data);};
export const getGk = params => {return axios.post(`${base}/gk`,params).then(res => res.data);};
export const getGks = params => {return axios.post(`${base}/gks`,params).then(res => res.data);};
export const sqdk = params => {return axios.post(`${base}/sqdk`,params).then(res => res.data);};
export const qxdk = params => {return axios.post(`${base}/qxdk`,params).then(res => res.data);};
export const qryHz = params => {return axios.post(`${base}/qryhz`,params).then(res => res.data);};
export const hz = params => {return axios.post(`${base}/hz`,params).then(res => res.data);};
export const getDks = params => {return axios.post(`${base}/qrydks`,params).then(res => res.data);};
export const dk = params => {return axios.post(`${base}/dk`,params).then(res => res.data);};
export const getDkHis = params => {return axios.post(`${base}/dkhis`,params).then(res => res.data);};
export const getNxjl = params => {return axios.post(`${base}/nxhis`,params).then(res => res.data);};
export const getNxgk = params => {return axios.post(`${base}/nxgk`,params).then(res => res.data);};
export const ljjs = params => {return axios.post(`${base}/ljjs`,params).then(res => res.data);};
export const dxjz = params => {return axios.post(`${base}/dxjz`,params).then(res => res.data);};
