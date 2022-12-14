import { Response } from 'express';

export abstract class BaseController {
  private static jsonResponse(res: Response, code: number, message: string): Response {
    return res.status(code).json({ message });
  }

  protected ok<T>(res: Response, dto?: T): Response {
    if (!dto) {
      return res.sendStatus(200);
    }
    return res.status(200).json(dto);
  }

  protected clientError(res: Response, message?: string): Response {
    return BaseController.jsonResponse(res, 400, message ? message : 'Bad Request');
  }

  protected unAuthorized(res: Response, message?: string): Response {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
  }

  protected forbidden(res: Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Access denied');
  }

  protected notFound(res: Response, message?: string): Response {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
  }

  protected fail(res: Response, message?: string) {
    return BaseController.jsonResponse(res, 500, message ? message : 'Internal Server Error');
  }
}
