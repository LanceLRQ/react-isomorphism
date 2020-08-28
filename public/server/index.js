import Koa from 'koa';
import path from 'path';
import KoaStatic from 'koa-static';
import nodeWatch from 'node-watch';
import { Template } from './util';
import { ROOT } from '../paths';
import { Startup } from '../../src/scripts/server.jsx';

const app = new Koa();
const indexFilePath = path.join(process.cwd(), 'dist/build/index.html');

let htmlBody = new Template(indexFilePath);
nodeWatch(indexFilePath, {
  persistent: false,  // 文件被监听时进程是否继续，默认true
  recursive: false,   // 是否监控所有子目录，默认false 即当前目录，true为所有子目录。
  encoding: 'utf-8',  // 指定传递给回调事件的文件名称，默认utf8
}, () => {
  // 重新载入
  console.log("Index file changed! reloading...");
  htmlBody = new Template(indexFilePath);
});

app.use(async (ctx, next) => {
  const { url } = ctx;

  if (
    url.endsWith('.js') ||
    url.endsWith('.css') ||
    url.endsWith('.ico') ||
    ctx.path.startsWith('/static')
  ) {  // 处理静态文件
    await next();
    return;
  }

  if (url.endsWith('.map')) { return } // map文件要404

  // 渲染index.html
  ctx.body = htmlBody.render({
    root: Startup(ctx.path)
  });

}).use(KoaStatic(ROOT.DIST.BUILD)).listen(5000);

console.log("Server is running...");
