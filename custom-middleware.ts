// custom-middleware.ts
import cors from 'cors';
import { RequestHandler } from 'express';

const customMiddleware: RequestHandler = (req, res, next) => {
  // Allow requests from your React app origin
  cors()(req, res, next);
};

export default customMiddleware;
