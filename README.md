A currencies exchange rate service

## Installing the app

- NPM - `npm install`
- yarn - `yarn install`

## Running the app

- Copy/rename `.env.example` to .env
- NPM - `npm start`
- yarn - `yarn start`

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
