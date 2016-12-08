export function saveTolLocal(id, key, value) {
    let seller = window.localStorage.__seller__;
    if(!seller) {
        // 如果selle为空就初始化seller
        seller = {};
        seller[id] = {};
        seller[id][key] = value;
    } else {
        // 否则取出seller
        seller = JSON.parse(seller);
        if(!seller[id]) {
            // 如果当前商家未点过收藏，就初始化商家收藏状态
            seller[id] = {};
        }
    }
    // 存取value
    seller[id][key] = value;
    // 转成字符串存进localStorage
    window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, def) {
    // 获取本地存储
    let seller = window.localStorage.__seller__;
    if(!seller) {
    // 如果没有返回默认值
        return def;
    }
    // 如果有，就获取__seller__里的[id]对象
    seller = JSON.parse(seller)[id];
    if(!seller) {
        // 如果没有这个id返回默认值
        return def;
    }
    // 如果有则返回
    let ret = seller[key];
    return ret || def;
}