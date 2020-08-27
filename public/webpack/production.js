import webpack from 'webpack';
import merge from 'webpack-merge';
import { buildWebpackBaseConfig } from './common';
import { buildLodaers } from './loader';
import HtmlWebpackPlugin from "html-webpack-plugin";
import { ROOT } from './paths';
import { buildWebpackDevServer } from './dev_server';
import { WebsiteBaseInfo } from './constant';
import AssetsPlugin from 'assets-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';


export const buildDevelopmentWebpackConfiguration = (morePlugins = []) => {
  const plugins = [
    new AssetsPlugin({
      path: ROOT.DIST.BUILD,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: '',
      hash: false,
      inject: false,                    // 不自动注入文件，需要在模板里设定对应输出
      template: ROOT.DIST.INDEX_HTML,
      minify: {                         // 压缩HTML文件
        removeComments: true,           // 移除HTML中的注释
        collapseWhitespace: true,       // 删除空白符与换行符
        minifyCSS: true,                // 压缩css
        minifyJS: true,                 // 压缩js
      },
      website: WebsiteBaseInfo,
    }),
    new OptimizeCSSAssetsPlugin(),
    ...morePlugins,
  ];
  return merge(
    buildWebpackBaseConfig([], plugins, {}, false),
    buildLodaers(),
    {
      mode: "production",
      // 用eval-source-map时，启动时慢一些，热更新时很快，浏览器里可以看到原本的代码。（发布到生产时不可以用这个！）
      devtool: 'source-map',
      // 根据React的要求，开发环境要将react-dom重定向到@hot-loader/react-dom
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom'
        },
      },
      stats: "normal",
      optimization: {
        minimize: true,
      },
    }
  )
};
