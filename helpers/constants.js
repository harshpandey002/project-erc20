import abi from "./abi.json";

export const contractABI = abi.abi;
export const contractAddress = 0x6de3d8a4db233aa90b50d897d2d5af22ad7b412e;

export function formatAddress(address) {
  return address.slice(0, 6) + "...." + address.slice(-4);
}
