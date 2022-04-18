# aliyun-dns-auto-setter
Aliyun dns auto setter

# install
```
npm i aliyun-dns-auto-setter -S
```

# usage
```js
const { createTask } = require('aliyun-dns-auto-setter')
const config = {
  "accessKey":"YOUR_ALIYUN_ACCESS_KEY",
  "secretKey":"YOUR_ALIYUN_SECRET_KEY",
  "url":"https://s3.example.com/ddns/a.example.com",
  "domain":"a.example.com",
  intervalWithMinutes:5
}

const task = createTask(config)
```
or
```js
const { createTask } = require('aliyun-dns-auto-setter')
const config = {
  "accessKey":"YOUR_ALIYUN_ACCESS_KEY",
  "secretKey":"YOUR_ALIYUN_SECRET_KEY",
  "type":"from-url-list",
  "urlList":[
    {
      "url":"https://s3.example.com/ddns/a.example.com",
      "domain":"a.example.com"
    }
  ],
  intervalWithMinutes:5
}

const task = createTask(config)
```
