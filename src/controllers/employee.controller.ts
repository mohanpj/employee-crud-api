import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, interfaces } from 'inversify-express-utils';
import { EmployeeService } from '../services/employee.service';

import TYPES from '../constants/types';
import { Employee } from '../models/employee.model';

@controller('/api')
export class EmployeeController implements interfaces.Controller {

    constructor(@inject(TYPES.EmployeeService) private employeeService: EmployeeService) {
        employeeService.init();
    }

    @httpGet('/employees')
    public getEmployees(): Employee[] {
        return this.employeeService.getEmployees();
    }

    @httpPost('/employee')
    public addEmployee(request: Request): string {
        return this.employeeService.addEmployee(request.body);
    }

    @httpPut('/employee/:id')
    public updateEmployee(request: Request): Employee {
        return this.employeeService.updateEmployee(request.params.id, request.body);
    }

    @httpDelete('/employee/:id')
    public deleteEmployee(request: Request): string {
        return this.employeeService.deleteEmployee(request.params.id);
    }
}