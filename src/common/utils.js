import axios from 'axios'
const baseURL = process.env.REACT_APP_BASE_URL;
console.log("baseURL ", baseURL)


export const getHeader = () => {
  try{
    const user = JSON.parse( localStorage.getItem('user') )
    return { Authorization: `Token ${user.token}`}
  }catch(e){
    return {}
  }
}

export const axiosInstance = axios.create({
  //baseURL: process.env.REACT_APP_API_URL,
  baseURL,
  timeout: 50000,
})

axiosInstance.interceptors.request.use(function (config) {
  config.headers = getHeader();
  return config;
}, function(err) {
  return Promise.reject(err)
})


axiosInstance.interceptors.response.use(function (response) {
  // toast.success(response.data.info);
  const { statusText } = response;
  if(statusText) {
    // toast.success(t(statusText) || statusText);
  }
  return response;
}, function (error) {
  
  console.log("Request failed ", error)
  // window.location = '/'
  // const { status, statusText } = error.response;
  // console.log("statusText", statusText)
  // if(statusText) {
  //   const s = Math.floor(status / 100);
  //   switch (s) {
  //     case 5:
  //       toast.error(t(statusText) || statusText);
  //       break;
  //     case 4:
  //     case 3:
  //       toast.warning(t(statusText) || statusText);
  //       break;
  //     default:
  //       break;
  //   }
  // }
  return Promise.reject(error);
})
