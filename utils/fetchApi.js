import axios from 'axios'

export const baseUrl='https://bayut.p.rapidapi.com'


  export const fetchApi=async(url)=>{
    const {data}=await axios.get((url),{
        headers: {
            'X-RapidAPI-Key': 'd1902faab4mshdd7fa1e3935529dp1cbbb7jsndf440f537faf',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    })
    return data;
  }
