import axios from 'axios'
const baseUrl = '/api'

const getPDF = async (properties) => {
  const request = await axios.post(baseUrl, properties)
  return request.data
}

export default {getPDF}