# Introduction into Crypto Stash

Short introduction into project functionality

## API's

Used [CoinGecko](https://www.coingecko.com/en/api) API keys to get

- All coins data (limited to 100)
- Trending coins data
- Single coin data
- Single coin historical data

## Search as dropdown

Created with [MUI](https://mui.com) Autocomplete component. Every option is clickable link and navigating to selected coin page.

**Code**

````
```<Autocomplete
          freeSolo
          options={coins}
          getOptionLabel={(coin) => coin.name}
          onChange={(e, coin) => {
            if (coin) {
              navigate(`/coins/${coin.id}`);
              handleUserAction(coin);
            }
          }}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search..."
              variant="standard"
              error={!!errorText}
              helperText={errorText}
              inputProps={{ ...params.inputProps, maxLength: 30 }}
            />
          )}
        />
```
````

::: info
Charackters limited to 30
:::

::: warning
An error is displayed next to the search bar if the search does not match any item.
:::

**Setting error message if search does not match**

```if (
      !coins.some((currency) =>
        currency.name.toLowerCase().includes(newValue.toLowerCase())
      )
    ) {
      setErrorText('No matching options found.');
    } else {
      setErrorText('');
    }
```

## Currency selector

Created with [MUI](https://mui.com) Select component. Posibility to display crypto prices in selected currency. Created context to manage currency/symbol state upon user selection.

**Context**

````
```const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  useEffect(() => {
    if (currency === 'USD') {
      setSymbol('$');
    } else if (currency === 'EUR') {
      setSymbol('€');
    }
  }, [currency]);

  return (
    <>
      <Crypto.Provider value={{ currency, symbol, setCurrency }}>
        {children}
      </Crypto.Provider>
    </>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
```
````

**Selector component**

```
const CurrencySelector = () => {
  const { currency, setCurrency } = CryptoState();

  return (
    <>
      <Select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        style={{ width: '100px' }}
      >
        <MenuItem value={'USD'}>USD</MenuItem>
        <MenuItem value={'EUR'}>EUR</MenuItem>
      </Select>
    </>
  );
};
```

## Carousel

Created with [react-alice-carousel](https://www.npmjs.com/package/react-alice-carousel). Animated carousel to display trending coins and price change in 24h. Every carousel item clickable, navigates to selected coin page.

**Code**

````
```<AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
        disableDotsControls
        disableButtonsControls
        autoPlay
        items={items}
      />
    </>
```
````

**Carousel items**

Mapped from API response data.

```const items = trendingCoins.map((coin) => {
    return (
      <div onClick={() => handleUserAction(coin)}>
        <Link to={`/coins/${coin.id}`}>
          <Stack gap={1} my={5} alignItems="center">
            <img src={coin.image} alt="Coin logo" style={{ height: '120px' }} />
            <Typography>{coin.name}</Typography>
            <Typography
              style={{
                color: coin.price_change_percentage_24h < 0 ? 'red' : 'green',
              }}
            >{`${coin.price_change_percentage_24h.toFixed(
              2
            )}% / 24h`}</Typography>
          </Stack>
        </Link>
      </div>
    );
  });
```

## Crypto table

Simple HTML table with a little bit custom styles. Clickable Name cell and Details button for better user experience. Navigates to selected coin page.

**Pagination**

Crypto table splitted into pages with [MUI](https://mui.com) Pagination component.

```
<Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
```

## Coin price history chart

Historical coin price chart with posibility to select chart data range in days. Created with [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2) Line component.

```
<Line options={options} data={data} />
```

**Data range buttons**

Each button setting new days value. Component refreshing new data when days get changed.

```
const chartDays = [
    {
      label: '24 Hours',
      value: 1,
    },
    {
      label: '30 Days',
      value: 30,
    },
    {
      label: '3 Months',
      value: 90,
    },
    {
      label: '1 Year',
      value: 365,
    },
  ];

  <Stack direction="row" spacing={2} justifyContent="center">
            {chartDays.map((day) => (
              <Button
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                }}
                size="large"
              >
                {day.label}
              </Button>
            ))}
          </Stack>
```

## Back-end App

Created a NodeJS application to handle user actions. Application log user actions (search/ select) to the console and post actions to MongoDB collections.

**Code**

```
server.post('/selected', async (req, res) => {
  const payload = req.body;
  try {
    const mongoCluster = await mongoClient.connect();
    const selectedCoin = {
      name: payload.name,
    };

    const response = await mongoCluster
      .db('CryptoSystem')
      .collection('Actions')
      .insertOne(selectedCoin);

    await mongoCluster.close();
    console.log(`User selected the ${payload.name}`);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.post('/searched', async (req, res) => {
  const payload = req.body;
  try {
    const mongoCluster = await mongoClient.connect();
    const searhedCoin = {
      name: payload.name,
    };

    const response = await mongoCluster
      .db('CryptoSystem')
      .collection('Searches')
      .insertOne(searhedCoin);

    await mongoCluster.close();
    console.log(`User searched for ${payload.name}`);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});
```
