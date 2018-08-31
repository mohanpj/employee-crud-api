import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import TYPES from './constants/types';
import { EmployeeService } from './services/employee.service';
import './controllers/employee.controller';

const container = new Container();

container.bind<EmployeeService>(TYPES.EmployeeService).to(EmployeeService);

const server = new InversifyExpressServer(container);
const port = 3000;
server.setConfig((app) => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
});
server.setErrorConfig((app) => {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Error while processing the request!');
    });
});

const serverInstance = server.build();
serverInstance.listen(port);

console.log(`Server is listening on http://localhost:${port}/api`),
console.log('Press CTRL-C to stop');

// console.log('API URL Details:');
// console.log(`GET: http://localhost:${port}/api/employees`);
// console.log(`POST: http://localhost:${port}/api/employee`);
// console.log(`PUT: http://localhost:${port}/api/employee/:id`);
// console.log(`DELETE: http://localhost:${port}/api/employee/:id`);
