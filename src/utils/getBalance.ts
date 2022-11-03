import { tokenBalance, Token } from "./interfaces";
import { AbiItem } from "web3-utils";
import tokenAbi from "./tokenAbi.json";
import Web3 from "web3";
import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "../../.env") });

const web3 = new Web3((process.env.INFURA_KEY as string) || "https://mainnet.infura.io/v3/");

export const getBalanceETH = async (userAddress: string) => {
  try {
    const balance: string = await web3.eth.getBalance(userAddress);
    return { result: balance };
  } catch (e) {
    return { error: "Can't fetch ETH balance" };
  }
};

export const batchReq = async (userAddress: string, tokens: Token[]) => {
  try {
    const tokenBalance: Array<tokenBalance> = [];
    const batch1 = new web3.BatchRequest();
    await new Promise<void>((resolve, reject) => {
      tokens.forEach((token) => {
        const contract = new web3.eth.Contract(tokenAbi as AbiItem[], token.platforms.ethereum);
        batch1.add(
          contract.methods.balanceOf(userAddress).call.request("latest", (err: ErrorCallback, balance: string) => {
            if (!err && balance !== "0") {
              tokenBalance.push({ address: token.platforms.ethereum, balance: balance, name: token.name, symbol: token.symbol, decimals: "" });
              resolve();
            }
          })
        );
      });
      batch1.execute();
    });
    const batch2 = new web3.BatchRequest();
    await new Promise<void>((resolve, reject) => {
      tokenBalance.forEach((token, index) => {
        const contract = new web3.eth.Contract(tokenAbi as AbiItem[], token.address);
        batch2.add(
          contract.methods.decimals().call.request("latest", (err: ErrorCallback, decimals: string) => {
            if (!err) {
              tokenBalance[index].decimals = decimals;
              resolve();
            }
          })
        );
      });
      batch2.execute();
    });
    return { result: tokenBalance };
  } catch (e) {
    return { error: "Can't fetch Tokens" };
  }
};
