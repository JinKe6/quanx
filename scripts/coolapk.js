// 2024.11.15
const url = $request.url;
const body = $response.body;

// 处理初始化配置
if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/init/.test(url)) {  
    let obj = JSON.parse(body);
    // 修改开屏广告相关属性
    if (obj.data && Array.isArray(obj.data)) {
        obj.data.forEach(item => {
            if (item.extraDataArr) {
                item.extraDataArr["SplashAd.timeout"] = "0"; // 设置广告持续时间为0
                item.extraDataArr["SplashAd.Expires"] = 9999999999; // 设置广告过期超长时间，防止显示
            }
            // 修改Tab标签页，仅保留特定的标签
            if (item.entities && Array.isArray(item.entities)) {
                item.entities = item.entities.filter(entity =>
                    entity.entityId === 420 || 
                    entity.entityId === 1635 || 
                    entity.entityId === 415 ||  
                    entity.entityId === 2261 || 
                    entity.entityId === 1190 || 
                    entity.entityId === 1175   
                );
            }
        });
    }
    $done({ body: JSON.stringify(obj) });
}

// 处理首页内容
if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/indexV8/.test(url)) {  
    let obj = JSON.parse(body);
    // 过滤首页广告，仅保留非广告内容
    if (obj.data && Array.isArray(obj.data)) {
        obj.data = obj.data.filter(item =>
            item.entityId !== 32557 && 
            item.entityId !== 13635 &&
            item.entityId !== 29349
        );

        // 删除多余的数据字段
        obj.data.forEach(item => {
            delete item.extraDataArr;
        });
    }
    $done({ body: JSON.stringify(obj) });
}

// 处理搜索页
if (/^https?:\/\/api\.coolapk\.com\/v6\/search/.test(url)) {  
    let obj = JSON.parse(body);
    // 过滤搜索推荐内容，仅保留非广告部分
    if (obj.data && Array.isArray(obj.data)) {
        obj.data = obj.data.filter(item =>
            item.entityId !== 20252 && 
            item.entityId !== 16977
        );
    }
    $done({ body: JSON.stringify(obj) });
}

// 处理信息流
if (/^https?:\/\/api\.coolapk\.com\/v6\/page/.test(url)) {  
    let obj = JSON.parse(body);
    // 过滤信息流中的广告内容
    if (obj.data && Array.isArray(obj.data)) {
        obj.data = obj.data.filter(item =>
            item.entityId !== 12315 && 
            item.entityId !== 8364 &&
            item.entityId !== 14379 &&
            item.entityId !== 24309 &&
            item.entityId !== 35846 &&
            item.entityId !== 35730 &&
            item.entityId !== 12889 &&
            item.entityId !== 20099
        );

        // 删除广告相关的额外数据字段
        obj.data.forEach(item => {
            delete item.extraDataArr;
        });
    }
    $done({ body: JSON.stringify(obj) });
}

// 处理评论区
if (/^https?:\/\/api\.coolapk\.com\/v6\/feed/.test(url)) {  
    let obj = JSON.parse(body);
    // 删除评论区广告相关字段
    if (obj.data && Array.isArray(obj.data)) {
        obj.data.forEach(item => {
            delete item.extraDataArr;  
            delete item.entityTemplate;  
        });
    }
    $done({ body: JSON.stringify(obj) });
}

// 处理我的页面配置
if (/^https?:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(url)) {  
    let obj = JSON.parse(body);
    // 过滤我的页面中的特定项目
    if (obj.data && Array.isArray(obj.data)) {
        obj.data = obj.data.filter(item =>
            item.entityId !== 1002 &&  
            item.entityId !== 1005 && 
            item.entityId !== 14809 && 
            item.entityId !== 1004 
        );
    }
    $done({ body: JSON.stringify(obj) });
}
