import { Schema } from 'joi';
import { NextFunction, Request, Response } from 'express';

/**
 * Request validator middleware function
 * @param {Schema} schema
 * @returns {Function}
 */

export function Validate(schema: Schema) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (req: Request, res: Response, next: NextFunction) {
      const data: any = {};
      if (req.body && Object.keys(req.body).length > 0) {
        data.body = req.body;
      }
      if (req.params && Object.keys(req.params).length > 0) {
        data.params = req.params;
      }
      if (req.query && Object.keys(req.query).length > 0) {
        data.query = req.query;
      }

      const { error } = schema.validate(data, {
        convert: true,
        allowUnknown: false,
        abortEarly: false
      });
      const valid = error == null;
      if (!valid) {
        const err: any = error;
        const message = err.details.map((detail: any) => {
          return {
            message: detail.message,
            type: detail.type,
            path: detail.path[0],
            property: detail.context.key
          };
        });
        return res.status(422).json({
          cause: 'Validation error',
          message
        });
      }

      return method.apply(this, arguments);
    };
  };
}
