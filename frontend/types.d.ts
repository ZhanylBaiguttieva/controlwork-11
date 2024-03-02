export interface User {
  _id: string;
  username: string;
  displayName: string;
  phone: string;
  token: string;
}

export  interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface RegisterMutation {
  username: string;
  displayName: string;
  phone: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface Item {
  _id: string;
  title: string;
  price: number;
  image: string;
}

export interface ItemInfo{
  _id: string;
  user: User;
  category: Category;
  title: string;
  description: string;
  price: number;
  image: string;
}
export interface ItemMutation {
  user: string;
  category: string;
  title: string;
  description: string;
  price: string;
  image: File;
}

export interface Category {
  _id: string;
  title: string;
}