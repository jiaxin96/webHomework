#实验使用的系统环境为Arch linux
###nodejs 版本为 7.2.1
###npm 的版本为 4.0.5
###上传文件没有包含data文件夹 session文件夹 和node_modules文件夹 运行时的监听端口为8000
###在linux系统上运行时需要依次执行如下命令
###npm install //安装package.jason中的依赖包
###mkdir data //创建一个数据库文件夹
###下面是运行命令
###mongod --dbpath=./data //./data 是上一步创建的数据库文件夹位置
###npm start // or "DEBUG=signin:* npm start"