import { Request, Response } from 'express';
import * as battleServices from '../services/battleServices.js';

export async function battle(req: Request, res: Response) {
  const { firstUser, secondUser } = req.body;

  if (!firstUser || !secondUser) {
    return res.sendStatus(422);
  }

  const battleResult = await battleServices.battle(firstUser, secondUser);
  res.send(battleResult);
}

export async function getRanking(req: Request, res: Response) {
  const ranking = await battleServices.getRanking();
  res.send(ranking);
}
