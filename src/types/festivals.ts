export type Festival = {
  id: string;
  title: string;
  about: string;
  city: string;
  from: string;
  to: string;
  price_from: number;
  price_to: number
};

export type FestivalRequest = {
  id?: string;
  title: string;
  about: string;
  city: string;
  from: string;
  to: string;
  price_from: number;
  price_to: number
};
