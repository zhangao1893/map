module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  globals: {
    environment: 'readonly', // 框架模式类型
    publicPath: 'readonly', // 配置多级目录访问地址
    jwtToken: 'readonly', // 开发模块下的token传递，模拟登录用到的变量
    httpUrl: 'readonly' // 请求地址（ip+端口）
  },
  plugins: ['babel', 'react'], // Prettier will be automatically injected by plugin:prettier/recommended
  settings: {
    'import/resolver': 'webpack'
  },
  rules: {
    'react/no-string-refs': 'off',
    'no-debugger': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'warn' // 将未使用的变量改为警告
  },
  // extends eslint config
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // integrate eslint-plugin-prettier with eslint-config-prettier
    'prettier/babel',
    'prettier/react',
    'prettier/standard'
  ]
};
