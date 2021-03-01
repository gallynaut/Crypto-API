export default interface ApiKeys {
  id: string;
  apiKey: string;
  secret: string;
  userID: number;
  exchangeName: string;
  createdAt: string;
  subaccount?: string;
}
