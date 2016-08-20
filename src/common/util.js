const _ = require('lodash');

class Util {
	static isEmptyObject(obj) {
		let k;
		for (k in obj)return !1;
		return !0
	}

	/**
	 * 把form对象的属性都复制给to，但是如果to没有的属性，那么就不复制了。
	 * */
	static pick(from,to,toKeys){
		if(this.isEmptyObject(from)){
			return Object.create(null);
		}
		if (this.isEmptyObject(to)){
			return from;
		}
		toKeys = toKeys || Object.keys(to);
		let pickObj = _.pick(from,toKeys),fromKey;
		for(fromKey of Object.keys(pickObj)){
			to[fromKey] = pickObj[fromKey];
		}
		return to;
	}
}
module.exports = Util;