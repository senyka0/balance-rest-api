import { Request, Response } from "express";
import { getBalanceETH, batchReq } from "../utils/getBalance";
import { getTokens } from "../utils/getTokens";

export const balanceHandler = async (req: Request, res: Response) => {
  const tokens = await getTokens();
  if (tokens.error) return res.status(500).json(tokens);
  const balanceETH = await getBalanceETH(req.params.address);
  if (balanceETH.error) return res.status(500).json(balanceETH);
  const balanceERC20 = await batchReq(req.params.address, tokens.result!);
  if (balanceERC20.error) return res.status(500).json(balanceERC20);
  res.status(200).json({ userAddress: req.params.address, balanceETH: balanceETH.result, balanceERC20: balanceERC20.result });
};
