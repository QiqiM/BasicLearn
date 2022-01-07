#### 为什么要选择VSCode+PicGo+Gitee

主要是平时写文章的平台，要么是收会员费用，要么是本站图片链接只能在本站网站访问，换一个平台，图片就裂了，图片问题困扰我很久，也是经过很多试用，最终选定这个工具组合，之前图片仓库使用的是Github，但是在国内，Github的访问速度简直感人！所以后来就把Github替换成了Gitee，Gitee在国内，访问速度快多了,之前的写文章使用的是Typora，但是现在收费了，就改用VSCode。

#### 安装步骤

##### 1.安装VSCode

+ 去[vscode官网](https://code.visualstudio.com/ "vscode")下载安装包安装即可
+ markdown插件推荐：Markdown Preview Enhanced, office Viewer(MarkDown Editor)

Markdown Preview Enhanced 功能简洁，仅提供预览功能

!![](https://gitee.com/yatok/picture-bed/raw/master/1641526042487.png)

office Viewer(MarkDown Editor)提供了很多功能，类似于Typora，我比较喜欢用这个。

![](https://gitee.com/yatok/picture-bed/raw/master/20220107140158.png)

##### 2.安装PicGo

[PicGo下载地址](https://github.com/Molunerfinn/PicGo/releases)，下载安装即可

安装之后打开主界面

![](https://gitee.com/yatok/picture-bed/raw/master/20220107113236.png)

选择最下面的插件设置，搜索gitee，点击最下方的gitee-uploader开始安装：

![](https://gitee.com/yatok/picture-bed/raw/master/1641526385885.png)

> 这里注意一下，必须要先安装[node.js](https://link.zhihu.com/?target=https://nodejs.org/en/)才能安装插件，没装的自己装一下，然后重启就行，主要是因为PicGO这个软件是基于node.js，用electron做的客户端。

##### 3.建立图床库

[码云](https://gitee.com/)登录自己的账号，点击右上角的+号，新建仓库

![](https://gitee.com/yatok/picture-bed/raw/master/1641526510287.png)

新建仓库的要点如下：

+ 输入一个仓库名称
+ 将仓库设置为公开
+ 勾选使用Readme文件初始化这个仓库

![](https://gitee.com/yatok/picture-bed/raw/master/1641526681757.png)

点击下一步完成创建。

##### 4.配置PicGo

配置插件的要点如下：

![](https://gitee.com/yatok/picture-bed/raw/master/20220107114533.png)

* repo：用户名/仓库名称，比如我自己的仓库yatok/picture-bed，找不到的可以直接复制仓库的url,复制浏览器的仓库地址，而不是页面左上角显示的，容易出现大小写问题

![](https://gitee.com/yatok/picture-bed/raw/master/20220107114643.png)

* branch：分支，这里写上master
* token：填入码云的私人令牌
* path：路径，一般写上img,我默认没填
* customPath：提交消息，这一项和下一项customURL都不用填。在提交到码云后，会显示提交消息，插件默认提交的是 `Upload 图片名 by picGo - 时间`

**这个token怎么获取，登进自己的码云**

1. 点击头像，进入设置

![](https://gitee.com/yatok/picture-bed/raw/master/20220107115511.png)

2. 找到左下角的私人令牌![](https://gitee.com/yatok/picture-bed/raw/master/20220107115559.png)
3. 点击生成新令牌，把projects这一项勾选上，其他的不用勾选，然后提交

![](https://gitee.com/yatok/picture-bed/raw/master/20220107115725.png)

4. 这里需要验证一下密码，验证密码之后会出来一串数字，这一串数字就是你的token，将这串数字复制到刚才的配置里面去。

> 注意：这个令牌只会明文显示一次，建议在配置插件的时候再来生成令牌，直接复制进去，搞丢了又要重新生成一个。

5. 将token填入配置保存即可。

#### 使用

截图然后按`Ctrl+shift+P`上传文件，上传之后剪贴板就有刚上传图片的markdown链接，直接复制到文章对应位置即可。另外，本文的所有图片都是使用这套工具上传的图片。
