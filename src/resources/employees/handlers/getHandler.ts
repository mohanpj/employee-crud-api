import {Request, Response} from 'express';

export default function getHandler(req: Request, res: Response): void {
  res.json({ result: 'get all employees' });
}