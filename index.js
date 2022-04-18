const cron = require('node-cron');
const axios = require('axios');
const Core = require('@alicloud/pop-core');
const { setDns } = require('aliyun-dns-setter')

const assert = require('assert');
function createTask({
  accessKey,
  secretKey,
  
  intervalWithMinutes = 5,
  type = 'from-url', // from-url | from-url-list
  url,
  domain,

  urlList = []
}){
  assert(type === 'from-url' || type === 'from-url-list', 'type must be from-url or from-url-list for now');
  assert(intervalWithMinutes > 0, 'intervalWithMinutes must be greater than 0');
  if(type === 'from-url'){
    assert(url, 'url must be provided');
    assert(domain, 'domain must be provided');
  }
  if(type === 'from-url-list'){
    assert(urlList && (urlList instanceof Array), 'urlList must be an array with at least one element');
  }
  
  assert(accessKey, 'accessKey must be provided');
  assert(secretKey, 'secretKey must be provided');

  


  const client = new Core({
    accessKeyId: accessKey,
    accessKeySecret: secretKey,
    endpoint: 'https://alidns.aliyuncs.com',
    apiVersion: '2015-01-09'
  })

  const schedule = cron.schedule(`*/${intervalWithMinutes} * * * * *`,async () => {
    if(type === 'from-url'){
      try {
        const data = await axios.get(url).then(res => res.data);
        setDns({
          client,
          domain,
          ip:data
        })
      } catch (e) {
        console.error(e);
      } 
      
    }else if(type === 'from-url-list'){
      urlList.forEach(async ({url, domain}) => {
        try {
          const data = await axios.get(url).then(res => res.data);
          setDns({
            client,
            domain,
            ip:data
          })
        } catch (e) {
          console.error(e);
        }
      })
    }


  });

  return schedule
}


module.exports = {
  createTask
}

