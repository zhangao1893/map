/**
 * 工具
 */
const fs = require('fs');
const path = require('path');
const jsZip = require('jszip');
const globalVariable = require('../env/commonEnv'); // 获取公共配置
const publicPathName = JSON.parse(globalVariable.publicPath);
const distUrl = path.join(__dirname, `../../dist`); // dist文件夹
/**
 * 替换服务，主要是为了替换已抽离图片访问路径字符
 * @param sourceRegx，需要被替换字符
 * @param targetStr，替换字符
 * @param regExp，需要过滤的文件类型
 */
exports.replaceSpecialString = (
  sourceRegx = '/excludeStatic/',
  targetStr = `${publicPathName}excludeStatic/`,
  regExp = /\.(js|css)$/
) => {
  /**
   * 读取文件，并且替换文件中指定的字符串
   */
  let replaceFile = (filePath, sourceRegx, targetStr) => {
    try {
      const data = fs.readFileSync(filePath);
      if (data) {
        let str = data.toString();
        const replacer = new RegExp(sourceRegx, 'g');
        str = str.replace(replacer, targetStr);
        fs.writeFileSync(filePath, str);
      }
    } catch (e) {
      console.log('\x1b[95m', e);
    }
  };
  /**
   * 读取文件
   */
  const findJsonFile = distUrl => {
    let files = fs.readdirSync(distUrl);
    files.forEach(item => {
      const fPath = path.join(distUrl, item);
      try {
        const stat = fs.statSync(fPath);
        if (stat.isDirectory() === true) {
          findJsonFile(fPath);
        }
        if (stat.isFile() === true) {
          if (item.match(new RegExp(regExp))) {
            replaceFile(fPath, sourceRegx, targetStr);
          }
        }
      } catch (e) {
        console.log('\x1b[95m', e);
      }
    });
  };
  // 读取文件
  findJsonFile(distUrl);
};
/**
 * 文件夹压缩服务
 * @param folderPath 压缩文件夹路径
 * @param ptName 压缩完成之后的文件别名
 */
exports.zipFolderServer = (folderPath = distUrl, ptName = 'dist.zip') => {
  const zip = new jsZip();
  /**
   * 读取文件夹并且开始压缩
   */
  const readDir = (zip, dirPath) => {
    // 读取dist下的根文件目录
    const files = fs.readdirSync(dirPath);
    files.forEach(fileName => {
      const fillPath = dirPath + '/' + fileName;
      const file = fs.statSync(fillPath);
      // 如果是文件夹的话需要递归遍历下面的子文件
      if (file.isDirectory()) {
        const dirZip = zip.folder(fileName);
        readDir(dirZip, fillPath);
      } else {
        // 读取每个文件为buffer存到zip中
        zip.file(fileName, fs.readFileSync(fillPath));
      }
    });
  };
  // 读取文件夹并且开始压缩
  readDir(zip, folderPath);
  zip
    .generateAsync({
      type: 'nodebuffer', // 压缩类型
      compression: 'DEFLATE', // 压缩算法
      compressionOptions: {
        // 压缩级别
        level: 9
      }
    })
    .then(function (content) {
      const distZip = path.resolve(__dirname, folderPath, '../', ptName);
      if (fs.existsSync(distZip)) {
        // 删除旧包
        fs.unlinkSync(distZip);
      }
      // 把zip包写到硬盘中，这个content现在是一段buffer
      fs.writeFileSync(distZip, content);
    });
};
