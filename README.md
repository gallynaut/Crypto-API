# Crypto API
This api runs on express and interacts with a postgres DB via Prisma. 

## Routes
### /users
**POST**
```http
POST http://localhost:4000/users
{
  email: "",
  firstName?: "",
  lastName?: "",
}
```
### /users/userID
**GET**
