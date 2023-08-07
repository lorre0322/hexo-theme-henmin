```
   __ __               _    
  / // /__ ___  __ _  (_)__  
 / _  / -_) _ \/  ' \/ / _ \ 
/_//_/\__/_//_/_/_/_/_/_//_/ 

| theme:   henmin     |
| Author:  lorre_0322 |
| version: 1.0        |
```
[中文文档](README.md) | [README](README_en.md)

### 开发日志 ヽ(#`Д´)ノ┴─────┴
2023-08-05  增加了瞬间面板
2023-08-04  修改了pjax提示
2023-07-30  添加了pjax和搜索
2023-07-25  写好了大部分的页面和样式
2023-07-24  搭建好页面路由跳转

# 快速开始

## git clone 
```bash
cd hexo
git clone https://github.com/lorre0322/hexo-theme-henmin.git  ./theme/henmin
```
## 把主题下的_page文件夹移动到source下
```
cp -r themes/henmin/_page/ source/
```

# 安装依赖
```bash
# 搜索 | 字数 | 压缩
npm i hexo-generator-search hexo-wordcount hexo-minify
```

## 打开`_config.yml`，把主题修改为henmin 
```
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: hexo-theme-mengd
```
## 修改主题内的`_config.yml`默认设置
