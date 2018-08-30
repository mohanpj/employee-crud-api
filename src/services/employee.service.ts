import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as Memory from 'lowdb/adapters/Memory';
import * as crypto from 'crypto';
import * as path from 'path';

import { Employee } from './../models/employee.model';

export class EmployeeService {
    private dbFile = path.join(__dirname, './../data/employees.json');
    database: any;
    employees: Employee;

    constructor() {
    }

    init() {
        const fileAdapter = new FileSync(this.dbFile);
        const inMemory = new Memory('employees.json');
        const adapter = (process.env.NODE_ENV === 'test') ? inMemory : fileAdapter;
        this.database = low(adapter);

        // Default db file setup example..
        if (!this.database.has('employees').value()) {
            this.database.defaults({
                employees: [],
            }).write();
        }
        // this.database.defaults({ employees: [] }).write();
    }

    getEmployees() {
        this.employees = this.database.get('employees');
        return this.employees;
    }

    addEmployee(employee: Employee) {
        const euid = crypto.randomBytes(3 * 4).toString('base64');
        this.database.get('employees')
            .push({
                uid: euid,
                name: employee.name,
                designation: employee.designation,
                email: employee.email,
                location: employee.location,
                salary: employee.salary,
            }).write();
    }

    updateEmployee(employee: Employee) {
        this.database.get('employees')
            .find({ uid: employee.uid })
            .assign({
                name: employee.name,
                designation: employee.designation,
                email: employee.email,
                location: employee.location,
                salary: employee.salary,
            }).write();
    }

    deleteEmployee(id: string) {
        this.database.get('employees')
            .remove({ uid: id })
            .write();
    }
}