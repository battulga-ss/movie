import { Request, Response } from "express";

export const meController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    res.json({ user: { id: 123 } });
  } else {
    res.json(undefined);
  }
};
