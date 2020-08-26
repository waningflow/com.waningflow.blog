const fs = require('fs');
const glob = require('glob');
const path = require('path');

const OSS = require('ali-oss');

const REGION = 'oss-cn-hangzhou';
const BUCKET = 'blog-waningflow-com';
const ACCESS_ID = 'LTAI4GJhXAUTd7EKDprYq9Hj';
const ACCESS_SECRET = 'cSnLEoxQ07FqMiFCK9Yz44cp2ddvJC';

const client = new OSS({
  region: REGION,
  accessKeyId: ACCESS_ID,
  accessKeySecret: ACCESS_SECRET,
  bucket: BUCKET,
});

async function putStream(filepath, filename) {
  let stream = fs.createReadStream(filepath);
  await client.putStream(filename, stream);
}

async function upload() {
  const files = glob.sync('public/**/!(precache)*.{js,html,css,png,json,ico,txt,svg,xml,woff,woff2}');
  for (let i = 0; i < files.length; i++) {
    const filename = files[i].replace('public/', '');
    const filepath = path.resolve(__dirname, `../public/${filename}`);
    try {
      await putStream(filepath, filename);
      console.log('upload success:', filename);
    } catch (e) {
      console.log('upload error:', filename, e);
      break;
    }
  }
}

upload();
