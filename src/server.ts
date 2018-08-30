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

const serverInstance = server.build();
serverInstance.listen(port);

console.log(`Server started on port ${port}...`);