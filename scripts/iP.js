const { body } = $response;
const { query:ip } = JSON.parse(body);

const title= ``;
const subtitle = `IP地址:${ip}`;

$done({ title,subtitle,ip });
