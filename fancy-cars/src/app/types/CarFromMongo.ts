import { UserFromMongo } from './UserFromMongo';

export interface CarFromMongo {
  _id: string;
  description: string;
  brand: string;
  model: string;
  engine: string;
  horsepower: number;
  fuel: string;
  color: string;
  year: number;
  image: string;
  likes: string[];
  owner: UserFromMongo;
  __v: number;
}
