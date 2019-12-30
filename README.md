# 实验周项目

为了保证在有限的时间内(有效时间不到一周)能够比较高质量完成问卷系统的核心功能，我们对于需求进行了一定的裁剪，保证完成的部分能够形成闭环。

### 已实现功能
- [ ] 登录
- [ ] 新建并发布问卷
- [ ] 问卷分享（url、二维码）
- [ ] 删除已有问卷
- [ ] 查看问卷列表
- [ ] 查看已有问卷
- [ ] 查看问卷的统计信息

### 技术栈
- 前端框架：Vue

- 后端框架：Koa

### 项目目录结构
```bash
.
├── README.md
├── backend # 后端代码目录
│   ├── README.md
│   ├── app.js # 服务的入口文件
│   ├── bin
│   │   └── www
│   ├── package-lock.json
│   ├── package.json
│   ├── public # 前端输出的打包文件
│   │   ├── css
│   │   ├── favicon.ico
│   │   ├── fill.html
│   │   ├── fonts
│   │   ├── index.html
│   │   └── js
│   ├── routes # 路由
│   │   ├── index.js
│   │   └── mysql.js
│   └── views # 模版
│       ├── error.pug
│       ├── index.pug
│       └── layout.pug
└── frontend # 前端代码目录
    ├── README.md
    ├── babel.config.js
    ├── dist # 前端打包发布目录
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   └── index.html
    ├── src # 源码目录
    │   ├── App.vue
    │   ├── api # api请求集合
    │   ├── assets
    │   ├── components # 组件
    │   ├── fill # 问卷填写页面源码
    │   ├── lib
    │   ├── main.js
    │   ├── router.js
    │   ├── store.js
    │   ├── utils
    │   └── views # 不同的view页面
    └── vue.config.js
```

### 开发引导
- [前端项目启动doc](./frontend/README.md)
- [后端项目启动doc](./backend/README.md)

**克隆仓库到本地**
```bash
git clone git@github.com:VideoConferencing-stitp/laozijiubuyongJAVA.git
```

**分支管理：**
开发之前先切换到一个新的分支格式如下：
```bash
git checkout -b feature-name
```
开发完了之后，先推送到自己的远程仓库，然后再点击 pull request，合并到主仓库的master分支。

**commit格式规范：**
- bug fix：[!]: 修复的bug描述
- 新功能添加：[+]: 添加的新功能描述
- 常规修改 ：[*]: 修改的内容描述