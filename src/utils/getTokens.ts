import axios from "axios";
import { Token } from "./interfaces";

export const getTokens = async () => {
  try {
    const { data } = await axios.get<Token[]>("https://api.coingecko.com/api/v3/coins/list?include_platform=true");
    if (data.length === 0) return { error: "Can't fetch tokens" };
    return { result: data.filter((item) => item?.platforms?.ethereum) };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return { error: e.message };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};
