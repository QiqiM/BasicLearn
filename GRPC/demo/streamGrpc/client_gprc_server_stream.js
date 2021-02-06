const PROTO_PATH = __dirname + '/../proto/employee_stream.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

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
let employee_stream_proto = grpc.loadPackageDefinition(packageDefinition).employee_stream;

function main() {
  let client = new employee_stream_proto.EmployeeStream('localhost:4500', grpc.credentials.createInsecure());

  let employeeIdList = [1, 10, 2];
  let call = client.paySalary({ employeeIdList: employeeIdList });

  call.on('data', function (response) {
    console.log(response.message);
  });

  call.on('end', function () {
    console.log('All Salaries have been paid');
  });

}

main();