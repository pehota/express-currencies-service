A currencies exchange rate service

## Installing the app
- NPM - `npm install`
- yarn - `yarn install`

## Running the app locally
- Copy/rename `.env.example` to `.env`
- NPM - `npm start`
- yarn - `yarn start`
- Make requests to `http://localhost:3000`

## Running the app in a Docker container
- [Install Docker](https://www.docker.com/get-started) if not yet installed
- Copy/rename `.env.example` to `.env`
- Run `docker build -t pehota/express-currencies-service` to build the Docker image
- Run `docker run -p 8080:8080 -d pehota/express-currencies-service` to run app in a docker container
- Make requests to `http://localhost:8080`

Using [Postman](https://www.getpostman.com/) one can make requests to the following endpoints:

- `currencies` - returns a JSON with the following format:

  ```JSON
    { "date": "DATE_FOR_WHICH_RATES_ARE_VALID", "rates": [ { "sign": "CURRENCY_SIGN", "rate": "CURRENCY_TO_EURO_RATE" } ] }
  ```

- `currencies/SIGN` - where `SIGN` is a valid `ISO 4217` currency code. The service will return a JSON containing the date and currency to EUR ratio
  ```JSON
    { "date": "DATE_FOR_WHICH_RATE_IS_VALID",  "sign": "CURRENCY_SIGN", "rate": "CURRENCY_TO_EURO_RATE" }
  ```

Upon error all services return a proper status code and a JSON containing the error

```JSON
  { "error": "ERROR_THAT_OCCURRED" }
```
