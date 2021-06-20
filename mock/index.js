const delay = require('mocker-api/lib/delay');

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

function loadData(data) {
  const result = {};
  Object.keys(data).forEach((key) => {
    result[key] = require(data[key]);
  });
  return result;
}

const proxy = loadData({
  'POST /api/getList': './data/scrollLoad',
  'POST /api/register': './data/formCase',
  'GET /api/getMetadataOption': './data/factorialTable'
});

module.exports = (noProxy ? {} : delay(proxy, 1000));