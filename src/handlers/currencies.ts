import {Request, Response, NextFunction} from 'express';
import memoize from 'memoize-one';
import {Either} from 'tsmonad';
import fetch from 'node-fetch';

interface ICurrency {
  sign: string;
  rate: number;
}

interface ICurrencies {
  date: string;
  rates: ICurrency[]
}

const loadCurrenciesList = async (): Promise<Either<string, ICurrencies>> => {
  const url = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref.csv';
  try {
    const result = await fetch(url)
      .then(response => response.text())
      .then(text => text.split('\n'));
    const [head, rows] = result.map(line =>
      line.replace(/,\s+$/, '').split(', '),
    );
    const [, ...signs] = head;
    const [date, ...rates] = rows;

    const currencies = {
      date,
      rates: signs.map((sign, index): ICurrency => ({
        sign,
        rate: parseFloat(rates[index])
      }))
    }
    return Either.right(currencies);
  } catch (e) {
    return Either.left(e.message());
  }
};

const loadCurrenciesListWithCache = memoize(loadCurrenciesList);

const index = async (req: Request, res: Response) => {
  const currencies = await loadCurrenciesList();
  const [status, msg] = currencies.caseOf({
    right: (currencies: ICurrencies) => [200, JSON.stringify(currencies, null, 3)],
    left: (error: string) => [500, JSON.stringify({ error }, null, 3)]
  })
  console.debug('=========> currencies', status, msg);
  res.setHeader('Content-Type', 'application/json');
  // res.status(status).json(msg);
  res.status(200).send(msg);
};
const currency = (req: Request, res: Response) => {
  const {currency} = req.params;
  res.send(`get rates for ${currency}`);
};

export default {
  index,
  currency,
};
