# Crypto API

This api runs on express and interacts with a postgres DB via Prisma.

## Setup
Edit .env with api keys and database url

```javascript
npm i
npx prisma generate
npx prisma migrate dev --name init --preview-feature
npm run dev
```

## Model

Optionally you can view the prisma schema for postgres structure

### Users

```javascript
{
  email: String,
  firstName?: String,
  lastName?: String,
}
```

### Exchanges

```javascript
{
  name: String,
  endPoint: String,
}
```

### ExchangeSymbol

```javascript
{
  fullSymbolName: String,
  baseCurrency: String,
  quoteCurrency: String,
  symbolName: String,
  exchangeName: String,
}
```

## Routes

### /exchanges

**GET** Retrieves list of exchanges from postgres DB

### /exchanges/:exchangeName

**GET** Retrieves exchange object from postgres DB by exchangeName

### /exchanges/:exchangeName/symbols

**GET** Retrieves list of ExchangeSymbol objects from postgres DB for a given exchangeName

### /exchanges/:exchangeName/symbols/:symbolName

**GET** Retrieves true/false if an exchange has a given symbolName in the postgres DB

### /exchanges/:exchangeName/symbols/:symbolName/volume

**GET** Same as above for user except uses environment variables for API Key

#### Example

```javascript
GET http://localhost:4000/exchanges/bybit/symbols/ETHUSD/volume?timeframe=60&from=1614499318
{
  error: false,
    "message": "Volume received from BYBIT for parameters (Symbol: ETHUSD, Interval: 60, From: 1614499318)",
    "data": {
        "volume": "$69,437,960",
        "bybit": [
            {
                "symbol": "ETHUSD",
                "interval": "60",
                "open_time": 1614502800,
                "open": "1360.6",
                "high": "1379.3",
                "low": "1349.1",
                "close": "1365.25",
                "volume": "69437960",
                "turnover": "50765.762802349964"
            }
        ]
    }
}
```