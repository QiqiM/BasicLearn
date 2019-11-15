#### Socket作用
> `Socket`主要作用是实现客户端与服务端的实时通信，它不像`ajax`请求，每次对话完成后都会把连接断开。Socket通信在Node中实现很简单，重要API,监听事件: `socket.on('event',function(){})`,触发事件:`socket.emit('event',function(){})`

#### 服务端常用API:

+ socket.emit():向建立该连接的客户端发送消息
+ socket.on(): 监听客户端发送消息
+ io.to(socketid).emit(): 向指定客户端发送消息
+ io.sockets.socket(soketid).emit():向指定客户端发送消息，新版本使用io.sockets[socketid].emit(),数组访问
+ socket.broadcast.emit():向除去建立该链接的客户端的其他客户端广播
+ io.sockets.emit():向所有客户端广播


#### 客户端常用API:
socket.emit():向服务端发送消息
socket.on() 监听服务端发来的消息

#### 参考网站
+ [Vue-qq](https://github.com/lensh/vue-qq)
+ [N-chat](https://github.com/nswbmw/N-chat/wiki/%E7%AC%AC%E4%B8%80%E7%AB%A0-socket.io-%E7%AE%80%E4%BB%8B%E5%8F%8A%E4%BD%BF%E7%94%A8)