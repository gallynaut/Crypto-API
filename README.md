# Crypto API

This api runs on express and interacts with a postgres DB via Prisma.

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

### /users

**POST**
Adds a new user to the postgres DB

### /users/:userID

**GET**
Retrieves user by userID from postgres DB

**DELETE**
Deletes user by userID from postgres DB

**PUT**
Update a user by userID

### /users/:userID/exchanges

**GET** Retrieves list of exchanges with an API Key tied to a userID

### /users/:userID/exchanges/:exchangeName

**GET** Retrieves true/false if a user has an API key for a given exchangeName

### /users/:userID/exchanges/:exchangeName/symbols/:symbolName/volume

**GET** First retrieves an API key for a given userID and exchangeName. Then makes a request to the exchangeName to retrieve the total volume over a given timefrom from a certain timestamp. This request accepts two required parameters: 
* *timeframe* accepted enumerations 1, 3, 5, 15, 30, 60, 120, 240, 360, 720, D, M, W
* *from* string representing the unix time in seconds of when the volume should be measured
**Example**
```
GET http://localhost:4000/users/1/exchanges/bybit/symbols/ETHUSD/volume?timeframe=60&from=1614499318
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

### /exchanges

**GET** Retrieves list of exchanges from postgres DB

### /exchanges/:exchangeName

**GET** Retrieves exchange object from postgres DB by exchangeName

### /exchanges/:exchangeName/symbols

**GET** Retrieves list of ExchangeSymbol objects from postgres DB for a given exchangeName

### /exchanges/:exchangeName/symbols/:symbolName

**GET** Retrieves true/false if an exchange has a given symbolName in the postgres DB
