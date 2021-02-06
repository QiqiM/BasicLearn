// 自己定义的proto文件
const PROTO_PATH = __dirname + '/../proto/employee.proto';

// grpc需要用到的第三方包
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const _ = require('lodash');

let { employees } = require('../data.js');

// 接下来，我们需要加载.proto文件。这是使用protoLoader库的loadSync方法完成的。
let packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

// 接下来，从已加载的原始文件包定义中，我们需要获取所需的包。这是使用以下脚本完成的
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

function getDetails(call, callback) {
  console.log('client call :%j', call)

  callback(null, 
    {
       message: _.find(employees, { id: call.request.id })
    });
}

// 下一段脚本创建并启动GRPC服务器
function main() {
  let server = new grpc.Server();

  // 该脚本表明，我们在employee_proto.Employee Service中添加了getDetails函数。然后，我们将此服务添加到服务器
  server.addService(employee_proto.Employee.service, { getDetails: getDetails });
  server.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();