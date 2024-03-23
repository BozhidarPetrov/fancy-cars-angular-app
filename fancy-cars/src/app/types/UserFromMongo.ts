export interface UserFromMongo {
    _id: string;
    username: string;
    email: string;
    hashedPassword: string;
    __v: number;
  }
