import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Employee } from './../models/employee.model';
import crypto from 'crypto';

export class EmployeeService {
    private dbFile = './../data/employees.json';
    database: any;
    employees: Employee;
    init() {
        const adapter = new FileSync(this.dbFile);
        this.database = low(adapter);
    }

    getEmployees() {
        this.employees = this.database.get('employees');
        return this.employees;
    }

    addEmployee(employee: Employee) {
        const euid = crypto.randomBytes(3 * 4).toString('base64');
        this.database.get('employees').push({
            uid: euid,
            name: employee.name,
            designation: employee.designation,
            email: employee.email,
            location: employee.location,
            salary: employee.salary,
        });
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