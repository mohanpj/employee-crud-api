import 'reflect-metadata';
import { Request, Response, Application } from 'express';
import * as request from 'supertest';
// import {} from 'jest';
import { expect, should } from 'chai';
import * as http_mocks from 'node-mocks-http';
// import { cleanUpMetadata, InversifyExpressServer } from 'inversify-express-utils';
// import { Container } from 'inversify';

import { EmployeeController } from './../../src/controllers/employee.controller';
// import './../../src/controllers/employee.controller';
import { EmployeeService } from './../../src/services/employee.service';
import * as serverObject from './../../src/server';
import { Employee } from '../../src/models/employee.model';

function buildResponse() {
    return http_mocks.createResponse({ eventEmitter: require('events').EventEmitter })
}

describe('EmployeeController', () => {
    let controller: EmployeeController;
    let employees: Employee[];
    let server;
    let agent;
    // let container: Container;
    // let app: Application;

    // beforeAll((done) => {
    //     const service = new EmployeeService();
    //     controller = new EmployeeController(service);
    //     // cleanUpMetadata();
    //     // container = new Container();
    //     // server = new InversifyExpressServer(container);
    //     // app = server.build();
    //     // agent = request(app);
    //     // done();
    // });

    afterEach((done) => {
        done();
    });

    beforeAll((done) => {
        const service = new EmployeeService();
        controller = new EmployeeController(service);
        employees = [{
            uid: 'LKv8y2C8sAhD-E90MZ6',
            designation: 'Developer',
            email: 'check@mail.com',
            location: 'check',
            name: 'Check',
            salary: 10000,
        }, {
            uid: 'VyZ6tAT1IPQXRW2q',
            designation: 'Developer',
            email: 'check1@mail.com',
            location: 'check1',
            name: 'Check1',
            salary: 10001,
        }];
        // cleanUpMetadata();
        // Clears the cache so a new server instance is used for each test.
        delete require.cache[require.resolve('./../../src/server')];
        server = require('./../../src/server');
        agent = request.agent(server);
        done();
    });

    afterAll((done) => {
        delete require.cache[require.resolve('./../../src/server')];
        server.stop();
        server.close();
        const serverObj: any = serverObject;
        serverObj.close();
        serverObj.stop();
        // setTimeout(() => process.exit(), 1000);
        done();
    });

    it('should return 200 OK', (done) => {
        // return request(controller.getEmployees())
        // const app = (server as any)._app as Application;
        return agent
            .get('/api/employees')
            .expect(200)
            .end((err, res) => {
                // console.log(res.body);
                if (err) return done(err);
                expect(res.body).to.be.an.instanceOf(Array);
                done();
                // expect(res.body).have.property('name');
            });
        // done();
    });

    it('should return expeted output', (done) => {
        // tslint:disable-next-line:prefer-const
        let mockResponse = buildResponse();
        const mockRequest  = http_mocks.createRequest({
            method: 'GET',
            url: '/api/employees',
        });
        mockResponse.on('end', async () => {
            // POST method should not exist.
            // This part of the code should never execute.
            const resData = await mockResponse._getData();
            console.log(resData);
            expect(mockResponse._isJSON()).to.be.true;
            // expect(resData).to.have.property('employees');
            expect(mockResponse).to.be.an.instanceOf(Array);
            // console.log(mockResponse._getData());
            done();
        });
        const res = controller.getEmployees();
        expect(res).to.be.an.instanceOf(Array);
        done();
    });

    it('should have initial count of zero when calling get employees', () => {
        expect(controller.getEmployees()).to.have.length(0);
        // done();
    });

    it('should return expected model when calling get employees', () => {
        expect(controller.getEmployees()).to.deep.equal([]);
        // done();
    });

    it('should get back all employees', () => {
        expect(controller.getEmployees()).to.be.an.instanceOf(Array);
        // done();
    });

    // it('should add a new employee', async () => {
    //     let res: Response;
    //     const req: Request = { body: employees[0] };
    //     // req.body = employees[0];
    //     const result = await controller.addEmployee(req, res);
    //     // result.then(r => {
    //     //     console.log(r);
    //     // });
    //     console.log(res);
    //     // expect(controller.addEmployee(req, res)).have.property('result');
    //     expect(controller.getEmployees()).to.have.length(1);
    // });

    it('should add a new employee on post', (done) => {
        return agent
                .post('/api/employee')
                .send(employees[0])
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    // console.log(res.body);
                    // expect(res.body).to.be.an.instanceOf(Array);
                    expect(res.body).have.property('result');
                    // expect(controller.getEmployees()).to.have.length(1);
                    done();
                });
    });

    // it('should add a new employee on post', async () => {
    //     // tslint:disable-next-line:prefer-const
    //     let mockResponse = buildResponse();
    //     const mockRequest  = http_mocks.createRequest({
    //         method: 'POST',
    //         url: '/api/employee',
    //         body: employees[0],
    //     });
    //     mockResponse.on('end', () => {
    //         // POST method should not exist.
    //         // This part of the code should never execute.
    //         const resData = mockResponse._getData();
    //         console.log(resData);
    //         // expect(mockResponse._isJSON()).to.be.true;
    //         // expect(resData).to.have.property('result');
    //         // console.log(mockResponse._getData());
    //         // done();
    //     });
    //     await controller.addEmployee(mockRequest, mockResponse);
    //     // done();
    // });

    // it('should update a existing user', () => {
    //   expect(controller.updateUser({
    //     body: {
    //       email: 'changed@changed.com',
    //       name: 'Lorem'
    //     }, params: {
    //       id: 'Lorem'
    //     }
    //   })).to.deep.equal({
    //     email: 'changed@changed.com',
    //     name: 'Lorem'
    //   });
    // });

    // it('should delete a user', () => {
    //   expect(controller.getUsers()).to.have.length(2);
    //   expect(controller.deleteUser({
    //     params: {
    //       id: 'Lorem'
    //     }
    //   })).to.equal('Lorem');
    //   expect(controller.getUsers()).to.have.length(1);
    // });
});