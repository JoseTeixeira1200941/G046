import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import IRoomController from '../../controllers/IControllers/IRoomController';
import config from '../../../config';
import {checkRole} from '../middlewares/isTokenRoleValid';
const route = Router();

export default (app: Router) => {
  app.use('/room', route);

  const ctrl = Container.get(config.controllers.room.name) as IRoomController

  route.post(
    '/createRoom',
    celebrate({
      body: Joi.object({
        floor: Joi.string().required(),
        name: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        dimension: Joi.array().items(Joi.number().required()).length(2), // assuming dimensions are 2D [length, width]
      }),
    }),
    checkRole(['ROLE_ADMIN','ROLE_MANAGER']),
    (req, res, next) => ctrl.createRoom(req, res, next)
  );

  route.get(
    '/list',
    celebrate({
      body: Joi.object({
        value: Joi.object().required(),
      }),
    }), checkRole(['ROLE_USER','ROLE_ADMIN','ROLE_MANAGER']), (req, res, next) => ctrl.findAll(req, res, next));
};
