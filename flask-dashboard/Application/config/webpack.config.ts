 import * as path from 'path';
 import * as webpack from 'webpack';

 const projectRootPath = path.resolve(__dirname, '../');
 const assetsPath = path.resolve(projectRootPath, '../static');

 const config: webpack.Configuration = {
     context: path.resolve(__dirname, '..'),
     entry: './src/App.tsx',
     output: {
         path: assetsPath,
         publicPath: "/static/",
         filename: 'bundle.js'
     },
     devtool: '#source-map',
     resolve: {
         extensions: [ '*', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
     },
     module: {
         loaders: [
             {
                 test: /\.tsx?$/,
                 loader: 'ts-loader'
             }
         ]
     }
 }

 export default config;