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

**GET** Makes an API request to exchangeName for symbolName and retrieves the volume. This request accepts two required parameters: timeframe and from

### /exchanges

**GET** Retrieves list of exchanges from postgres DB

### /exchanges/:exchangeName

**GET** Retrieves exchange object from postgres DB by exchangeName

### /exchanges/:exchangeName/symbols

**GET** Retrieves list of ExchangeSymbol objects from postgres DB for a given exchangeName

### /exchanges/:exchangeName/symbols/:symbolName

**GET** Retrieves true/false if an exchange has a given symbolName in the postgres DB
