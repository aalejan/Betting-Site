type OddsData = {
  id: string;
  sports_key: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
};

type Bookmaker = {
  key: string;
  title: string;
  last_updated: string;
  markets: Market[];
};

type Market = {
  key: string;
  outcomes: Outcome[];
};

type Outcome = {
  name: string;
  price: number;
  point?: number;
};
