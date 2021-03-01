export default interface BybitKline {
  symbol: string;
  interval: string;
  open_time: number;
  open: string;
  closeTime: string;
  closePrice: string;
  high: string;
  low: string;
  volume: string;
  turnover: string;
}

export type ByBitTimeFrame = '1' | '3' | '5' | '15' | '30' | '60' | '120' | '240' | '360' | '720' | 'D' | 'M' | 'W';
