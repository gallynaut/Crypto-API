export default interface Exchange {
  name: string;
  endPoint: string;
  availableSymbols: Array<string>;
  klinePath: string;
}
