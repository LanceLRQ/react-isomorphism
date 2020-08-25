import path from 'path';

const root = path.resolve(__dirname, '../');

export const ROOT = {
  SRC: {
    SELF: path.join(root, 'src'),
    SCRIPTS: path.join(root, 'src/scripts'),
    STYLES: path.join(root, 'src/styles'),
    STATIC: path.join(root, 'src/static'),
    IMAGES: path.join(root, 'src/images'),
    SVG: path.join(root, 'src/svgs'),
    LOCALES: path.join(root, 'src/locales'),
    PLUGINS: path.join(root, 'src/plugins'),
  },
  DIST: {
    SELF: path.join(root, 'dist'),
    BUILD: path.join(root, 'dist/build'),
    INDEX_HTML: path.join(root, 'dist/index.html'),
  }
};

