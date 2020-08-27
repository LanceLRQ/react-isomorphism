import Koa from 'koa';
import path from 'path';
import KoaStatic from 'koa-static';
import { Startup } from '@/scripts/server.jsx';
import { Template } from './util';
import { ROOT } from '../paths';

const app = new Koa();
const htmlBody = new Template(path.join(process.cwd(), 'dist/build/index.html'));

app.use(async (ctx, next) => {
  const { path, url } = ctx;

  if (url.indexOf('.') > -1) {  // 加个简单处理
    await next();
    return;
  }
  ctx.body = htmlBody.render({
    root: Startup()
  });

}).use(KoaStatic(ROOT.DIST.BUILD)).listen(5000);

console.log("Server is running...");
