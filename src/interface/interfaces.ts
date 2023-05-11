export interface Posts {
  _id: string;
  text: string;
  image: string;
  likes: number;
  user: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isOwner?: boolean;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthUser {
  user: User;
  token: string;
}

export interface FormValues {
  email: string;
  password: string;
  fullName?: string;
}
