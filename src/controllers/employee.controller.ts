import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
    controller,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    request,
    response,
    BaseHttpController,
    HttpResponseMessage,
    StringContent } from 'inversify-express-utils';
import { EmployeeService } from '../services/employee.service';

import TYPES from '../constants/types';
import { Employee } from '../models/employee.model';

@controller('/api')
export class EmployeeController extends BaseHttpController {

    constructor(@inject(TYPES.EmployeeService) private employeeService: EmployeeService) {
        super();
        employeeService.init();
    }

    @httpGet('/employees')
    public getEmployees(): Employee[] {
        return this.employeeService.getEmployees();
    }

    @httpPost('/employee')
    public async addEmployee(@request() req: Request, @response() res: Response) {
        try {
            const result = await this.employeeService.addEmployee(req.body);
            res.status(201).json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    @httpPut('/employee/:id')
    public updateEmployee(@request() req: Request, @response() res: Response) {
        try {
            const result = this.employeeService.updateEmployee(req.params.id, req.body);
            if (result) {
                res.sendStatus(204);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    @httpDelete('/employee/:id')
    public deleteEmployee(@request() req: Request, @response() res: Response) {
        try {
            const result = this.employeeService.deleteEmployee(req.params.id);
            if (result) {
                res.sendStatus(204);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}