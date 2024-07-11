# Mental-Health-App-Backend

## How to run
- clone the repo using:
```sql
git clone https://github.com/ndambopaul/Mental-Health-App-Backend.git
```
or
```sql
git clone git@github.com:ndambopaul/Mental-Health-App-Backend.git
```

- Install dependencies
```sql
npm install
```

- Run the server
```sql
npm run dev
```
or
```sql
npm start
```

## Endpoints
- BASE URL: http://localhost:5000
### 1. Authentication
- /api/v0/auth/register
- /api/v0/auth/login

### 2. Users
- /api/v0/users

## Note:
- To authenticate, after getting your token from the login endpoint, pass the token inside an Authorization header, e.g
```sql
curl  -X GET \
  'http://localhost:5000/api/v0/users' \
  --header 'Accept: */*' \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmZmN2JiZDQwMGY2YmQ2MjZkZTllIiwiZmlyc3RfbmFtZSI6IkphbmUiLCJsYXN0X25hbWUiOiJEb2UiLCJlbWFpbCI6ImphbmVkb2VAZ21haWwuY29tIiwidXNlcm5hbWUiOiJqYW5lZG9lIiwidXNlcl90eXBlIjoiQ2xpZW50In0sImlhdCI6MTcyMDcxNDA2NiwiZXhwIjoxNzIwODAwNDY2fQ.gihCxxS5eIk1-0mj31nr-_j1vU-zHHzLVegQhRDMlXQ'
```