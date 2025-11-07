export type Festival = {
  id: string;
  name: string;
  description: string;
  price: number;
  date: string;
};

export type FestivalRequest = {
  id?: string;
  name: string;
  description: string;
  price: number;
  date: string;
};