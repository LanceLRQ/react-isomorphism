import webpack from 'webpack';
import merge from 'webpack-merge';
import { buildWebpackBaseConfig } from './common';
import { buildLodaers } from './loader';
import HtmlWebpackPlugin from "html-webpack-plugin";
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';


export const buildDevelopmentWebpackConfigration = (morePlugins = []) => {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'BUILD_ENV': JSON.stringify({
          version: process.env['BRANCH_NAME'],
          commit: process.env['GIT_COMMIT'],
          build: process.env['BUILD'],
        }),
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HardSourceWebpackPlugin.ExcludeModulePlugin([{
      // HardSource works with mini-css-extract-plugin but due to how
      // mini-css emits assets, assets are not emitted on repeated builds with
      // mini-css and hard-source together. Ignoring the mini-css loader
      // modules, but not the other css loader modules, excludes the modules
      // that mini-css needs rebuilt to output assets every time.
      test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
    }]),
    ...morePlugins,
  ];
  return merge(
    buildWebpackBaseConfig({
      name: 'index:',
      path: './src/index.js',
      plugin: [
        'react-hot-loader/patch',
        '@babel/polyfill',
      ],
    }, plugins, {}, true),
    buildLodaers(),

  )
};
