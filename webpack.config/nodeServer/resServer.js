/**
 * node资源服务集合
 */
const path = require('path');
const fs = require('fs');
/**
 * 静态资源的服务
 */
exports.staticServer = [
  // 抽离出来的静态资源访问
  {
    url: '/excludeStatic/*',
    server: (req, res) => {
      let parsedUrl = decodeURI(req.url);
      const mkdirPathname = path.join(__dirname, `../../${parsedUrl}`); // 附件文件夹地址
      res.sendFile(mkdirPathname);
    }
  }
];
/**
 * mock服务
 */
exports.mockServer = callBack => {
  const mockPath = path.resolve(__dirname, '../../mock');
  const file = fs.statSync(mockPath);
  if (file.isDirectory()) {
    /**
     * 解析mock的json文件
     */
    const analysisJson = folderPath => {
      const files = fs.readdirSync(folderPath);
      files.forEach(fileName => {
        const fillPath = folderPath + '/' + fileName;
        const file = fs.statSync(fillPath);
        // 如果是文件夹的话需要递归遍历下面的子文件
        if (file.isDirectory()) {
          analysisJson(fillPath);
        } else {
          const data = fs.readFileSync(fillPath, 'utf8');
          if (data) {
            const result = JSON.parse(data); //读取的值
            if (typeof result === 'object' && result.servers instanceof Array) {
              callBack(result.servers);
            }
          }
        }
      });
    };
    // 解析mock文件夹里的json文件
    analysisJson(mockPath);
  } else {
    console.log('\x1b[95m', 'mock服务文件资源不存在');
  }
};
