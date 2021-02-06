本文将对GRPC和协议缓冲区进行基本介绍。接下来，我将展示如何在NodeJS应用程序中使用GRPC和协议缓冲区

### GRPC是什么

GRPC是一个开源高性能RPC框架，那么RPC到底是做什么的呢？请看下面的例子

```js
function getEmployee() {
  return "ABCD";
}
function greetEmployee()
{
  let employee = getEmployee();
  console.log("Greet",employee) 
} 
```

在这里，我们有一个`getEmployee`函数，它返回一个`Employee Name`，另一个函数`greetEmployee`，它调用`getEmployee`并获取该员工的`Name`，然后打印一个`Greeting`。

这里的`greetEmployee`调用`getEmployee`是一个常规函数调用。

现在，如果`getEmployee`和`greetEmployee`函数位于不同的地址空间中，或者它们位于由网络分隔的2个不同的主机中，则该函数调用称为“远程过程调用”(Remote Procedure Call, RPC)。在这里，具有`getEmployee`函数的System充当服务器，而具有`greetEmployee`函数的System充当客户端。

###  什么是Protocol Buffer (协议缓冲区)

协议缓冲区是默认情况下在GRPC中使用的接口定义语言。

+ 它有助于定义服务器提供的各种服务
+ 它有助于定义系统中使用的有效负载的结构
+ 它有助于对消息进行序列化（转换为特殊的二进制格式），并通过服务器和客户端之间的线路进行发送。

在本文后面的部分中，我们将在使用NodeJS应用程序时看到如何使用protocol buffers(协议缓冲区)。

### 支持哪些不同类型的RPC？

#### Unary RPC

这是可用的最简单的RPC。客户端在此处向服务器发送请求消息。服务器处理该请求，然后将响应消息发送回客户端

**在本文中，这是我们将重点介绍的grpc。**

#### Server Streaming RPC

在此RPC中，客户端将请求消息发送到服务器，然后服务器以流方式将一系列消息发送回客户端。

####  Client Streaming RPC

在此RPC中，客户端以流方式向服务器发送一系列消息。然后，服务器处理所有这些请求，然后将响应消息发送回客户端。

#### Bidirectional Streaming RPC

在此RPC中，客户端以流方式向服务器发送一系列消息。然后，服务器处理请求，然后以流方式将一系列消息发送回客户端。

###  如何在NodeJS中使用GRPC和协议缓冲区

使用以下命令创建一个名为grpc-nodejs-demo的文件夹并在其中初始化nodejs

```shell
mkdir grpc-nodejs-demo
cd grpc-nodejs-demo
npm init
```

这将创建一个package.json文件。

#### 修改package.json文件

将package.json文件替换为以下内容

```json
{
  "name": "grpc-nodejs-demo",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "@grpc/proto-loader": "^0.1.0",
    "grpc": "^1.11.0",
    "lodash": "^4.6.1"
  },
  "author": "Name",
  "license": "MIT"
}
```

在这里我们添加了3个依赖项

+ @ grpc / proto_loader和grpc依赖项将帮助我们在应用程序中使用GRPC和协议缓冲区
+ lodash是通用实用程序依赖项。这将有助于简化一些代码逻辑

package.json文件更新后。运行以下命令以安装依赖项

```shell
npm install
```

### 定义协议缓冲区

在此示例中，我们将构建一个将employee  ID作为输入，并提供employee详细信息作为输出的服务。

所需的服务接口和有效负载将在协议缓冲区文件中指定。协议缓冲区文件的扩展名为`.proto`

现在，我们来创建`.proto`文件。

在项目中创建一个名为`proto`的文件夹。在`proto`文件夹中，创建一个名为`employee.proto`的文件，并向其中添加以下代码

```protobuf
syntax = "proto3";

package employee;

service Employee {
  rpc getDetails (EmployeeRequest) returns (EmployeeResponse) {}
}


message EmployeeRequest {
  int32 id = 1;
}

message EmployeeResponse{
  EmployeeDetails message = 1;
}
message EmployeeDetails {
  int32 id = 1;
  string email = 2;
  string firstName = 3; 
  string lastName = 4;
}
```

那么，我们在这里到底做了什么？

`syntax="proto3"`;表示我们要使用Protocol Buffer version 3。

`package employee;` 表示我们正在创建一个名为`employee`的程序包，我们将在其中定义我们的services

```protobuf
service Employee {
  rpc getDetails (EmployeeRequest) returns (EmployeeResponse) {}
}
```

上述脚本表明我们正在创建一个称为`Employee`的服务。在此服务中，我们正在创建一个名为`getDetails`的函数（rpc），该函数接受`EmployeeRequest`类型的输入并以`EmployeeResponse`格式提供响应

接下来，我们需要定义`EmployeeRequest`和`EmployeeResponse`。这是在以下脚本中完成的

```protobuf
message EmployeeRequest {
  int32 id = 1;
}

message EmployeeResponse{
  EmployeeDetails message = 1;
}
message EmployeeDetails {
  int32 id = 1;
  string email = 2;
  string firstName = 3; 
  string lastName = 4;
}
```

在这里，我们看到消息`EmployeeRequest`具有单个类型为`int32`和名称`id`的字段。此处分配的数字`1`是字段号，它在消息的编码和解码过程中提供帮助。定义的每个字段应具有`唯一的字段号`

我们还看到`EmployeeResponse`有一个类型为`EmployeeDetails`的自定义字段，并且名称消息的字段编号为`1`。这意味着甚至也必须定义`EmployeeDetails`，如上所示。

`EmployeeDetails`具有4个字段，包括类型`int32`和`string`。它们都有唯一的字段编号(**unique field numbers**)

*Field numbers between 1 -15 use 1 byte of space during encoding. and field numbers from 2 - 2047 uses 2 bytes for encoding and hence will take up more space. So try to design in such a way that the field numbers are between 1 - 15 as much as possible*

1 -15之间的编号在编码过程中使用1个字节的空间。并且2-2047的字段编号使用2个字节进行编码，因此会占用更多空间。因此，请尝试以尽可能多的字段编号介于1到15之间的方式进行设计

### Creating the GRPC Server

创建一个名为**server.js**的文件

首先，让我们包括我们需要的所有库，并定义**.proto**文件所在的位置

```js
const PROTO_PATH = __dirname + '/proto/employee.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const _ = require('lodash');
```

接下来，我们需要加载**.proto**文件。这是使用**protoLoader**库的**loadSync**方法完成的。

```js
let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    }
);
```

接下来，从已加载的原始文件包定义中，我们需要获取所需的包。这是使用以下脚本完成的

```js
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;
```

在这里，我们将**employee**包放入**employee_proto**变量中。

**employee_proto**现在将具有所有原型定义。

接下来，我们需要创建一些虚拟employees数据供服务器使用。创建一个名为**data.js**的文件，并将以下脚本添加到其中

```js
let employees = [{
    id: 1,
    email: "abcd@abcd.com",
    firstName: "First1",
    lastName: "Last1"   
},
{
    id: 2,
    email: "xyz@xyz.com",
    firstName: "First2",
    lastName: "Last2"   
},
{
    id: 3,
    email: "temp@temp.com",
    firstName: "First3",
    lastName: "Last3"   
},
];

exports.employees = employees;
```

接下来，我们需要将**data.js**导入**server.js**。为此，在**server.js**中添加以下脚本

```js
function main() {
  let server = new grpc.Server();
  server.addService(employee_proto.Employee.service, {getDetails: getDetails});
  server.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure());
  server.start();
}
```

`let server = new grpc.Server();` 

是创建新**GRPC Server**的脚本 

在**.proto**文件中，我们注意到在**Employee Service**内部有一个名为**getDetails**的函数。

`server.addService（employee_proto.Employee.service，{getDetails：getDetails}）;`

是我们在其中添加Service实现的脚本。该脚本表明，我们在**employee_proto.Employee** Service中添加了**getDetails**函数。然后，我们将此服务添加到服务器。

`server.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure());` 是指示服务器将在端口4500上启动且没有身份验证的脚本

`server.start();` 是实际启动服务器的脚本

现在待处理的主要事情是实现**getDetails**函数。下面的脚本显示了实现

```js
function getDetails(call, callback) {
  callback(null, 
    {
       message: _.find(employees, { id: call.request.id })
    });
}
```

这里的**call**具有请求参数，而回**callback** 是我们需要定义实现的地方。

在callback 内部，我们收到一条消息：`_.find（employees，{id：call.request.id}）`，其中显示以下内容

+ 从Input获取员工ID-call.request.id
+ 搜索employees列表以查找具有该ID的员工
+ Return employee详细信息

这样就完成了服务器的实现。这是**server.js**的完整脚本

```js
const PROTO_PATH = __dirname + '/proto/employee.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const _ = require('lodash');

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

let {employees} = require('./data.js');

function getDetails(call, callback) {
  console.log('client call :%j', call)
  callback(null, 
    {
       message: _.find(employees, { id: call.request.id })
    });
}

function main() {
  let server = new grpc.Server();
  server.addService(employee_proto.Employee.service, {getDetails: getDetails});
  server.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
```

### Creating the GRPC Client

创建一个名为**client.js**的文件 将以下脚本复制到**client.js**

```js
const PROTO_PATH = __dirname + '/proto/employee.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    }
);
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;
```

上面的脚本以与**server.js**中相同的方式将**employee**包加载到**employee_proto**变量中

接下来，我们需要一种可以调用RPC的方式。在这种情况下，我们需要能够调用服务器中实现的**getDetails**函数。

为此，我们需要在客户端中创建一个**存根(stub)**。这是使用以下脚本完成的。

```js
  let client = new employee_proto.Employee('localhost:4500', grpc.credentials.createInsecure());
```

该**client Stub**将帮助我们调用在服务器上运行的**Employee** Service中定义的**getDetails**函数。服务器依次在端口4500上运行。代码行还指示未使用身份验证

最后，我们可以使用以下脚本调用**getDetails**函数

```js
let employeeId = 1;
 client.getDetails({id: employeeId}, function(err, response) {
    console.log('Employee Details for Employee Id:',employeeId,'\n' ,response.message);
  });
```

如前所述，客户端存根可以像正常函数调用一样帮助我们在服务器中调用**getDetails**函数。为此，我们将**employeeId**作为输入。

最后，Response 进入**response** 变量。然后，我们将打印响应消息。

完整的client.js代码如下

```js
const PROTO_PATH = __dirname + '/proto/employee.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

function main() {
  let client = new employee_proto.Employee('localhost:4500',
                                       grpc.credentials.createInsecure());
  let employeeId;
  if (process.argv.length >= 3) {
    employeeId = process.argv[2];
  } else {
    employeeId = 1;
  }
  client.getDetails({id: employeeId}, function(err, response) {
    console.log('Employee Details for Employee Id:',employeeId,'\n' ,response.message);
  });
}

main();
```

### Running The Server and Client

打开命令提示符并使用以下命令运行服务器

```shell
node server.js
```

打开一个新的命令提示符，并使用以下命令运行客户端

```shell
node client.js
```

当我们运行客户端时。它将打印以下输出

```js
Employee Details for Employee Id: 1 
 { id: 1,
  email: 'abcd@abcd.com',
  firstName: 'First1',
  lastName: 'Last1' 
 }
```

### 运行截图

![image-20210205145039887](https://gitee.com/yatok/picture-bed/raw/master/typoraImg/image-20210205145039887.png)

### 原文地址

[How to Easily use GRPC and Protocol Buffers with NodeJS](https://adityasridhar.com/posts/how-to-easily-use-grpc-and-protocol-buffers-with-nodejs )

[关于GRPC Streams in NodeJS参考作者原文](https://adityasridhar.com/posts/how-to-effectively-use-grpc-streams-in-nodejs)

[我的示例源码地址](https://github.com/QiqiM/BasicLearn/tree/master/GRPC )

