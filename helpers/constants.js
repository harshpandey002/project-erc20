import abi from "./abi.json";

export const contractABI = abi.abi;
export const contractAddress = "0x3a7a068B3Bf32675F8C8dA60d34Cea7C02a5736b";

export function formatAddress(address) {
  return address.slice(0, 6) + "...." + address.slice(-4);
}

export const eventColor = {
  Mint: "#07931D",
  Transfer: "#0980C2",
  Burn: "#C71111",
};

export const getEventMessage = (method, amount, to) => {
  const eventMsg = {
    Mint: `${amount} HKP Tokens from Smart Contract`,
    Transfer: `${amount} HKP Token to ${formatAddress(to)}`,
    Burn: "1 HKP Token from wallet",
  };

  return eventMsg[method];
};
