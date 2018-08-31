import 'reflect-metadata';
import { Request, Response, Application } from 'express';
import * as request from 'supertest';
// import {} from 'jest';
import { expect, should } from 'chai';

import { EmployeeController } from './../../src/controllers/employee.controller';
import { EmployeeService } from './../../src/services/employee.service';
// import * as serverObject from './../../src/server';
import { Employee } from '../../src/models/employee.model';

describe('EmployeeController', () => {
    let controller: EmployeeController;
    let employees: Employee[];
    let server;
    let agent;

    beforeAll(() => {
        const service = new EmployeeService();
        controller = new EmployeeController(service);
        // Clears the cache so a new server instance is used for each test.
        delete require.cache[require.resolve('./../../src/server')];
        server = require('./../../src/server');
        agent = request.agent(server);
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
    });

    afterAll(() => {
        server.stop();
        // serverObject.stop();
        // done();
    });

    it('should return 200 OK', done => {
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
    });

    it('should have initial count of zero when calling get employees', () => {
        expect(controller.getEmployees()).to.have.length(0);
    });

    it('should return expected model when calling get employees', () => {
        expect(controller.getEmployees()).to.deep.equal([]);
    });

    it('should get back all employees', () => {
        expect(controller.getEmployees()).to.be.an.instanceOf(Array);
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

    // it('should add a new employee on post', () => {
    //     return request(server)
    //         .post('/api/employee')
    //         .expect(201)
    //         .then(res => {
    //             console.log(res.body);
    //             // expect(res.body).to.be.an.instanceOf(Array);
    //             expect(res.body).have.property('result');
    //             // expect(controller.getEmployees()).to.have.length(1);
    //         });
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