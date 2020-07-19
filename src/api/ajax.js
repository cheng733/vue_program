import axios from 'axios'


export default function ajax (url,data={},type='get') {

  if(type === 'get'){
      let urlCompeted = ''
      Object.keys(data).forEach(i =>{
        urlCompeted = `${i}=${data[i]}&`
      })
    if(urlCompeted !== ''){
      urlCompeted = urlCompeted.slice(urlCompeted.lastIndexOf('&'))
      url=url+'?'+urlCompeted
    }
        return axios.get(url)
  }else {
   return axios.post(url,data)
  }
}
