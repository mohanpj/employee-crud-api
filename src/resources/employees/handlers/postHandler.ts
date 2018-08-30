import {Request, Response} from 'express';
import { EmployeeService } from '../../../services/employee.service';

export default function postHandler(req: Request, res: Response): void {
  const service = new EmployeeService();
  service.init();
  service.addEmployee(req.body);
  res.json({ result: 'added employee'});
}