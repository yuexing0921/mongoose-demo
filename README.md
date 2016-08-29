
# Nodejs Express Mongoose Demo

这是为了研究nodejs如何操作mongoDB的学习代码，大部分都是参照 [node-express-mongoose-demo](https://github.com/madhums/node-express-mongoose-demo)来写的，在这里先感谢下这么仁兄。

## wiki
* [mongoose API](http://mongoosejs.com/docs/)
* [mongodb API](http://mongodb.github.io/node-mongodb-native/2.1/) 2.1版本


## Requirements

* [NodeJs](http://nodejs.org) >= 6.x 
* [mongodb](http://mongodb.org)

## Install

```sh
$ git clone https://github.com/yuexing0921/mongoose-demo.git
$ npm install
```

then

```sh
$ npm start
```

Then visit [http://localhost:8081/](http://localhost:8081/)

#### 初衷
* 为了学习mongoose是如何操作mongoDb的

#### 思路
1. `展现方式`  web是首选，然后就想到了cnodejs，那么express也是首选，那么自然而然想做一个可以简单登录，可以发帖删贴的简易论坛。
2. 看了下nodeclub源码，发现功能太多,不够简单，然后朋友推荐了node-express-mongoose-demo，很赞，功能简单，但是mongoose的crud功能都有了，还有一些常用的特性


#### 学习过程
1. node-express-mongoose-demo 的源码最喜欢的部分就是server.js的实现方式，它将各个组件分离的方式并且分离的很合理，这点个人非常喜欢。

2. 整体结构，没有完全照搬nexm，而是按照个人爱好做了一定程度的变化，具体结构如下

    - [x]  server.js 整个程序的入口

    - [x]  web目录 
        1. 根目录放置了server.js需要加载的express中间件
        2. `action` 控制器 
        3. `views`  模板
        4. `routers` 路由器
        5. `passport` 认证授权js
        6. `cdn` 静态文件

    - [x] config 项目的各项静态配置文件
    
    - [x] dao 项目的和数据库所有的操作都在这里
    
    - [x] common 项目的一些共通方法和静态类
    
    
3. 开发思想，原来的nexm项目model层和view结合的太紧密了，个人不太喜欢这种方式，所以做了分离，加了一个dao层，方便项目的扩展。
![流程图](https://github.com/yuexing0921/mongoose-demo/blob/master/img/flow-chart.png)
>一般企业级大项目中，为了分离代码的耦合度，让项目能更好的维护，action到dao之间，还有service层和logic层，这里就不展开了。

```
sequenceDiagram
client->>server: 请求一个资源 
server->>middlewares: 中间件拦截，各种验证
middlewares->>router: 请求对应的路由
router->>action: 请求对应的控制器
action->>dao: 请求对应的dao层
dao->>DB: 请求DB，返回数据
DB->>client: 数据原路返回，层层加工，最终展现给用户
```

## License

MIT
