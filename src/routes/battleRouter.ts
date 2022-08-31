import express from 'express';

import validateSchema from '../middlewares/schemaValidator.js';
import fightersSchema from '../schemas/fightersSchema.js';
import * as battleController from "../controllers/battleController.js";

const battleRouter = express();

battleRouter.post('/battle', validateSchema(fightersSchema), battleController.battle);
battleRouter.get('/ranking', battleController.getRanking);

export default battleRouter;