import fs from 'fs';
import path from 'path';
import AutoPrefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackLoaderBuilder } from './utils';


export const buildLodaers = (dev = true) => {
  const builder = new WebpackLoaderBuilder();
  // 解析.babelrc文件
  const babelRcFile = fs.readFileSync(path.resolve('.babelrc'));
  const babelRc = JSON.parse(babelRcFile.toString());


  const babelPlugins = [
    // AntDesign的东西：
    // ["import", { "libraryName": "antd", "style": true }],
    // Lodash的按需加载：
    ['lodash', { 'id': ['lodash'] }],
    // Babel插件
    ...babelRc.plugins,
  ];
  if (dev) babelPlugins.push(['react-hot-loader/babel']);

  // 注册Babel的Loader
  const BABEL_LOADER = builder.registerHappyPackLoader('babel@7', [{
    loader: 'babel-loader',
    options: {
      plugins: babelPlugins,
      presets: [
        ['env', {
          "modules": false,
          "targets": {
            "browsers": [
              "chrome >= 43",
              "safari >= 7",
              "ie >= 11",
              "firefox >= 48"
            ]
          }
        }],
        ['react']
      ],
    },
  }], 2);

  const LESS_LOADER = builder.registerHappyPackLoader('less-loader', [{
    loader: 'less-loader',
    options: {
      // modifyVars: antdTheme,
      javascriptEnabled: true,
    },
  }], 2);

  const SASS_LOADER = builder.registerHappyPackLoader('sass@10', [{
    loader: 'sass-loader',
    options: {
      // sourceMap: true,
      // data: "@import '@/styles/themes/index.scss';",
    },
  }], 2);

  // Babel Loader
  builder.registerLoader({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [builder.getHappyPackLoaderName(BABEL_LOADER)]
  });

  // TypeScript Loader
  builder.registerLoader({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: ['ts-loader']
  }, true);


  // Static File Loader
  builder.registerLoader({
    test: /\.(jpe?g|png|gif|tiff|webp|ttf|woff|woff2|eot)$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: dev ? '[hash].[ext]?debug=[path][name]' : '[hash].[ext]',
        outputPath: 'static',
        publicPath: function(path){
          return '/static/' + path;   // 输出到网站的 /static 目录下
        }
      },
    }]
  });

  // Less Loader
  builder.registerLoader({
    test: /\.less$/,
    // include: [antd],
    use: [
      // { loader: 'cache-loader' },
      'style-loader',
      'css-loader',
      builder.getHappyPackLoaderName(LESS_LOADER),
    ],
  });

  // Sass Loader
  builder.registerLoader({
    test: /\.(scss|sass|css)$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [
              AutoPrefixer({
                browsers: ['chrome >= 43', 'safari >= 7', 'firefox >= 48'],
                cascade: false,
              })
            ];
          },
        },
      },
      builder.getHappyPackLoaderName(SASS_LOADER)
    ],
  });

  return builder.webpackConfigs;
};
