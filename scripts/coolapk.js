const url = $request.url;
const body = $response.body;

// 开屏广告和过滤出保留Tab处理
if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/init/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data && Array.isArray(obj.data)) {
        obj.data.forEach(item => {
            if (item.extraDataArr) {
                item.extraDataArr["SplashAd.timeout"] = "0";
                item.extraDataArr["SplashAd.Expires"] = 9999999999;
            }
            if (item.entities && Array.isArray(item.entities)) {
                const allowedEntityIds = new Set([420, 1635, 415, 2261, 1190, 1175]);
                item.entities = item.entities.filter(entity =>
                    allowedEntityIds.has(entity.entityId)
                );
            }
        });
    }
    $done({ body: JSON.stringify(obj) });
}

// 首页精简
if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/indexV8/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data && Array.isArray(obj.data)) {
        const excludedEntityIds = new Set([32557, 13635, 29349]);
        obj.data = obj.data.filter(item => !excludedEntityIds.has(item.entityId));
        obj.data.forEach(item => {
            delete item.extraDataArr;
        });
    }
    $done({ body: JSON.stringify(obj) });
}

// 搜索栏精简
if (/^https?:\/\/api\.coolapk\.com\/v6\/search/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data && Array.isArray(obj.data)) {
        const excludedEntityIds = new Set([20252, 16977]);
        obj.data = obj.data.filter(item => !excludedEntityIds.has(item.entityId));
    }
    $done({ body: JSON.stringify(obj) });
}

// 评论区去广告
if (/^https?:\/\/api\.coolapk\.com\/v6\/page/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data && Array.isArray(obj.data)) {
        const excludedEntityIds = new Set([12315, 8364, 14379, 24309, 35846, 35730, 12889, 20099]);
        obj.data = obj.data.filter(item => !excludedEntityIds.has(item.entityId));
        obj.data.forEach(item => {
            delete item.extraDataArr;
        });
    }
    $done({ body: JSON.stringify(obj) });
}

// 信息流去广告
if (/^https?:\/\/api\.coolapk\.com\/v6\/feed/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data && Array.isArray(obj.data)) {
        obj.data.forEach(item => {
            delete item.extraDataArr;
            delete item.entityTemplate;
        });
    }
    $done({ body: JSON.stringify(obj) });
}

// 账户页面精简
if (/^https?:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data && Array.isArray(obj.data)) {
        const excludedEntityIds = new Set([1002, 1005, 14809, 1004]);
        obj.data = obj.data.filter(item => !excludedEntityIds.has(item.entityId));
    }
    $done({ body: JSON.stringify(obj) });
}

// 默认结束
$done({});
