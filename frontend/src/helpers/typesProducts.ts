export type OrdinaryProduct = {
  _id: string;
  type: string;
  category: string;
  name: string;
  gender: string;
  colors: string[];
  size: number[];
  price: number;
  quantity: number;
  image: string[];
  index: number;
  _v: number;
};

export type ProductCartType = {
  _id: string;
  type: string;
  category: string;
  name: string;
  gender: string;
  colors: string;
  size: number;
  price: number;
  quantity: number;
  image: string;
  index: number;
  _v: number;
};

export type DefaultFilterValues = {
  sortedBy: {
    value: string;
    sort: number;
    label?: string;
  };
  price: string;
  toPrice: string;
  colors: string[];
  genders: any[];
  sizes: number[];
};

export type ProductNames = {
  _id: string;
  name: string;
};
