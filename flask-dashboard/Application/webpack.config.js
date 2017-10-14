require('ts-node').register({
    project: './tsconfig.tsnode.json'
});
module.exports = require('./config/webpack.config').default;