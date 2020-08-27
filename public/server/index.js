import Koa from 'koa';
import path from 'path';
import KoaStatic from 'koa-static';
import { Template } from './util';
import { ROOT } from '../paths';
import { Startup } from '../../src/scripts/server.jsx';

const app = new Koa();

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

  if (url.endsWith('.map') > -1) { return } // map文件要404
  console.log("AAA");

  const htmlBody = new Template(path.join(process.cwd(), 'dist/build/index.html'));
  ctx.body = htmlBody.render({
    root: Startup()
  });

}).use(KoaStatic(ROOT.DIST.BUILD)).listen(5000);

console.log("Server is running...");
