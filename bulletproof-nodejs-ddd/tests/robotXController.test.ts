import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import IRobotTypeDTO from '../src/dto/IRobotTypeDTO';
import { Result } from '../src/core/logic/Result';
import RobotController from '../src/controllers/robotController';
import IRobotService from '../src/services/IServices/IRobotService';

describe('RobotController (Unit Test)', function () {
    const sandbox = sinon.createSandbox();
  
      beforeEach(function() {
        Container.reset();
        const robotTypeSchemaInstance = require("../src/persistence/schemas/robotTypeSchema").default;
        Container.set("robotTypeSchema", robotTypeSchemaInstance);
  
        const robotTypeRepoClass = require("../src/repos/robotTypeRepo").default;
        const robotTypeRepoInstance = new robotTypeRepoClass();
        Container.set("robotTypeRepo", robotTypeRepoInstance);
  
        const robotServiceClass = require("../src/services/robotService").default;
        const robotServiceInstance = new robotServiceClass();
        Container.set("robotService", robotServiceInstance);
      });
      afterEach(function() {
        sandbox.restore();
      });
  
      it('createRobotType: returns JSON with designation+brand+model+task values', async function () {
        let body = {
            "designation": "robolindo",
            "brand": "Croissants",
            "model": "do Lidl",
            "task": 2
        };
        
        const req: Partial<Request> = {};
        req.body = body;
    
        const res: Partial<Response> = {
          json: sinon.spy(),
          status: sinon.stub().returnsThis(),
        };
        
        const next: Partial<NextFunction> = () => {};
    
        const robotServiceInstance = Container.get("robotService");
    
        const expectedResult: IRobotTypeDTO = {
          "id": req.body.id,
          "designation": req.body.designation,
          "brand": req.body.brand,
          "model": req.body.model,
          "task": req.body.task
        };
    
        sinon.stub(robotServiceInstance, "createRobotType").returns( Result.ok<IRobotTypeDTO>( {
          "id": req.body.id,
          "designation": req.body.designation,
          "brand": req.body.brand,
          "model": req.body.model,
          "task": req.body.task
        }));
    
        const ctrl = new RobotController(robotServiceInstance as IRobotService);
    
        await ctrl.createRobotType(<Request>req, <Response>res, <NextFunction>next);
    
        // Assertions
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(expectedResult));
      });    
  });