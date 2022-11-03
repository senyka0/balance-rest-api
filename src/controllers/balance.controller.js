"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceHandler = void 0;
const getBalance_1 = require("../utils/getBalance");
const getTokens_1 = require("../utils/getTokens");
const balanceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokens = yield (0, getTokens_1.getTokens)();
    if (tokens.error)
        return res.status(500).json(tokens);
    const balanceETH = yield (0, getBalance_1.getBalanceETH)(req.params.address);
    if (balanceETH.error)
        return res.status(500).json(balanceETH);
    const balanceERC20 = yield (0, getBalance_1.batchReq)(req.params.address, tokens.result);
    if (balanceERC20.error)
        return res.status(500).json(balanceERC20);
    res.status(200).json({ userAddress: req.params.address, balanceETH: balanceETH.result, balanceERC20: balanceERC20.result });
});
exports.balanceHandler = balanceHandler;
