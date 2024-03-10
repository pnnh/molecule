### 配置说明

运行时配置默认放置于runtime目录，需要从源码树中排除

需要区分客户端和服务端配置，并且文件名包含环境信息

#### 客户端配置示例格式

非真实配置信息

```javascript
// runtime/client.development.ts

export const clientConfig = {
  SERVER: 'https://portal.huable.com/authorize',
  SELF_URL: 'https://portal.huable.com',
  AUTH_SERVER: 'https://portal.huable.com/authorize',
  SIGN: {
    PASSWORD: {
      ENABLE: true,
    },
    WEBAUTHN: {
      ENABLE: true,
    },
    EMAIL: {
      ENABLE: true,
    },
  }
}
```


#### 服务端配置示例格式

非真实配置信息

```javascript
// runtime/server.development.ts

import 'server-only'

export const serverConfig = {
  ENV: 'development',
  SELF_URL: 'https://portal.huable.com',
  SERVER: 'https://portal.huable.com/authorize',
  RESOURCE_SERVER: 'https://fields.huable.com', 
  AES_KEY: '6EBcXnBGvWj9vCw3fi6s4maG1ptNZRYw',
  AES_IV: 'Y1AZKSVa1xN32FKz',
  REDIS: 'redis://127.0.0.1:6379/0',
  REDIS_PASSWORD: 'Fs4daKDExlW96aVT',
  AUTH_SERVER: 'https://portal.huable.com/authorize'
}


```