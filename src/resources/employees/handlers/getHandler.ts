import {Request, Response} from 'express';
import { EmployeeService } from './../../../services/employee.service';

export default function getHandler(req: Request, res: Response): void {
  const service = new EmployeeService();
  service.init();
  const employees = service.getEmployees();
  res.json( employees );
}