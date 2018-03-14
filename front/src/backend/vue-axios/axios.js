import axios from 'axios'
var config = require('../../../../config')

const DEV_URL = 'http://'+config.host+':'+config.restPort
const API_URL = process.env.API_URL || DEV_URL

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  //  'Authorization': localStorage.token
  }
})