    const url = $request.url;
    const body = $response.body;

    let obj;
    try {
        obj = JSON.parse(body);
    } catch (e) {
        $done({});
        return;
    }

    if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/init/.test(url)) {
        if (obj.data && Array.isArray(obj.data)) {
            obj.data.forEach(item => {
                if (item.extraDataArr) {
                    item.extraDataArr["SplashAd.timeout"] = "0";
                    item.extraDataArr["SplashAd.Expires"] = 9999999999;
                }
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
        return;
    }

    if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/indexV8/.test(url)) {
        if (obj.data && Array.isArray(obj.data)) {
            obj.data = obj.data.filter(item =>
                item.entityId !== 32557 &&
                item.entityId !== 13635 &&
                item.entityId !== 29349
            );
            obj.data.forEach(item => {
                delete item.extraDataArr;
            });
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }

    if (/^https?:\/\/api\.coolapk\.com\/v6\/search/.test(url)) {
        if (obj.data && Array.isArray(obj.data)) {
            obj.data = obj.data.filter(item =>
                item.entityId !== 20252 &&
                item.entityId !== 16977
            );
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }

    if (/^https?:\/\/api\.coolapk\.com\/v6\/page/.test(url)) {
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
            obj.data.forEach(item => {
                delete item.extraDataArr;
            });
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }

    if (/^https?:\/\/api\.coolapk\.com\/v6\/feed/.test(url)) {
        if (obj.data && Array.isArray(obj.data)) {
            obj.data.forEach(item => {
                delete item.extraDataArr;
                delete item.entityTemplate;
            });
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }

    if (/^https?:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(url)) {
        if (obj.data && Array.isArray(obj.data)) {
            obj.data = obj.data.filter(item =>
                item.entityId !== 1002 &&
                item.entityId !== 1005 &&
                item.entityId !== 14809 &&
                item.entityId !== 1004
            );
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }

    $done({});
