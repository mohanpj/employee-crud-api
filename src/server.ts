import 'reflect-metadata';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as crypto from 'crypto';
import * as path from 'path';

import TYPES from './constants/types';
import { EmployeeService } from './services/employee.service';
import './controllers/employee.controller';
import { EmployeeController } from './controllers/employee.controller';

// load everything needed to the Container
const container = new Container();

// container.bind<interfaces.Controller>(TYPE.Controller).to(EmployeeController).whenTargetNamed('EmployeeController');
container.bind<EmployeeService>(TYPES.EmployeeService).to(EmployeeService);

// start the server
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(cors());
    app.use(bodyParser.urlencoded({
        // tslint:disable-next-line:trailing-comma
        extended: true
    }));
    app.use(bodyParser.json());
});

const serverInstance = server.build();
serverInstance.listen(3000);

console.log('Server started on port 3000 :)');