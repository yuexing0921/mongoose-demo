/**
 * 数据库连接
 */
const mongoose = require('mongoose');
const util     = require("util");

class MongodbConnect{
	constructor(){

	}
	connect(conf,openFun){
		//http://mongoosejs.com/docs/connections.html
		//更多细节参照http://mongodb.github.io/node-mongodb-native/2.1/api/Db.html
		var options = {
			db    : {
				native_parser: true
			},
			server: {
				poolSize      : 3,//默认连接池为5个
				auto_reconnect: true
			},
			j:true,//这里很奇怪，从2.0开始，Journal日志是默认开启的，不知道这个是否有误
			w:'1',//默认安全级别Acknowledged 如果是mongo集群，需要设置成majority
			user  : conf.userid,
			pass  : conf.password
		};
		var uri = conf.uri;
		var connect = function(){
			return mongoose.connect(uri,options).connection;
		};
		//监听关闭事件并重连
		connect()
			.once('open', function(){openFun("数据库连接成功");})
			.on('disconnected', connect)
			.on('close', function (err) {
				console.log('closed');
			});
	}
}
exports = module.exports = new MongodbConnect();
