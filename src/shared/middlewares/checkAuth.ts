import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
      res.status(401).send();
      return;
  }

  const token = authorization.replace('Bearer ', '');
  const jwtKey = process.env.JWT_KEY || '';
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, jwtKey);
  } catch (error) {
    res.status(401).send();
    return;
  }

  const { userId } = jwtPayload;
  const newToken = jwt.sign({ userId }, jwtKey, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  next();
}; 

export default checkAuth;