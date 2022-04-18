const cron = require('node-cron');
const axios = require('axios');
const Core = require('@alicloud/pop-core');
const { setDns } = require('aliyun-dns-setter')

const assert = require('assert');
function createTask({
  accessKey,
  secretKey,
  
  intervalWithMinutes = 5,
  type = 'from-url',
  url,
  domain
}){
  assert(type === 'from-url' , 'type must be from-url for now');
  assert(intervalWithMinutes > 0, 'intervalWithMinutes must be greater than 0');
  assert(url, 'url must be provided');
  assert(domain, 'domain must be provided');
  assert(accessKey, 'accessKey must be provided');
  assert(secretKey, 'secretKey must be provided');


  const client = new Core({
    accessKeyId: accessKey,
    accessKeySecret: secretKey,
    endpoint: 'https://alidns.aliyuncs.com',
    apiVersion: '2015-01-09'
  })

  const data = axios.get(url).then(res => res.data);

  const c = cron.schedule(`*/${intervalWithMinutes} * * * * *`, () => {
    


    // console.log(c);



  });
}


module.exports = {
  createTask
}

