import abi from "./abi.json";

export const contractABI = abi.abi;
export const contractAddress = "0x10B5636726ff84BFbAf0159d92e40f9195948Dc5";

export function formatAddress(address) {
  return address.slice(0, 6) + "...." + address.slice(-4);
}
