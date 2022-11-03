export interface Token {
  id: string;
  symbol: string;
  name: string;
  platforms: {
    ethereum: string;
  };
}
export interface tokenBalance {
  symbol: string;
  name: string;
  address: string;
  balance: string;
  decimals: string;
}
