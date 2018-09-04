### npm install 
### npm run dev
### 结构
├── .babelrc
├── REAMME.MD
├── dist
│   ├── index.html
│   ├── main-2e7be78348cd010103d6.js
│   ├── main-bc4f9e4e325aed76a6e3.js
│   └── styles.css
├── favicon.ico
├── package.json
├── src
│   ├── .DS_Store
│   ├── component
│   │   ├── categroys
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   ├── table
│   │   │   ├── default.js
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   └── tabsController
│   │       ├── index.js
│   │       └── index.scss
│   ├── images
│   │   ├── class_square.png
│   │   ├── rank_more_new.png
│   │   ├── top_newb1.png
│   │   ├── top_newb2.png
│   │   └── top_newb3.png
│   ├── index.html
│   ├── index.js
│   ├── pages
│   │   ├── app.js
│   │   ├── app.scss
│   │   ├── pgc
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   └── sensation
│   │       ├── index.js
│   │       └── index.scss
│   └── utils
│       ├── config.js
│       ├── enum.js
│       └── eventProxy.js
└── webpack.config.js
### 涉及知识
1.react 合成事件的使用，作用于表格上面的导航栏，可单独滑动，可点击滚动;
2.react 兄弟组件间的数据传递，采用发布--订阅的方法实现;
3.webpack4的配置
4.antd-mobile
5.scss
6.index.html文件中引入的外部文件只在解决华为、QQ低版本手机浏览器中会出现的问题
### webpack.config.js配置错误
1.babel-loader需要在全局编写一个.bablerc,然后修改对应的webpack.congfig中的rules;
2.如果使用extract-text-webpack-plugin单独提取css,注意要和webpack4版本兼容，也要升级到4
