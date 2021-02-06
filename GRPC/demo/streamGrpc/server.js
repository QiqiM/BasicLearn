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
let employee_stream_proto = grpc.loadPackageDefinition(packageDefinition).employee_stream

let { paySalary } = require('./pay_salary.js');
let { generateReport } = require('./generate_report.js');

function main() {
  let server = new grpc.Server();
  server.addService(employee_stream_proto.EmployeeStream.service, 
    { 
      paySalary: paySalary,
      generateReport: generateReport
    }
  );
  server.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();