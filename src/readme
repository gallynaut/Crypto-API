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
  symbols: String[]
  lastName?: "",
}
```

## Routes
### /users
**POST**
Adds a new user to the postgres DB
### /users/userID
**GET**
Retrieves user by userID from postgres DB
**DELETE**
Deletes user by userID from postgres DB
**PUT**
Update a user by userID
