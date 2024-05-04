import { userStates } from "@/stores/user";

const { currency: { value: cc }} = userStates;

export const formatNumber = (number: Number = 0, currency: String = cc) => {
  const stringifiedNumber = number.toLocaleString('en', { maximumFractionDigits: 0, minimumFractionDigits: 0 }).replace('-','');
  const prefix = currency ? `${currency} ` : '';
  return `${prefix}${stringifiedNumber}`;
}