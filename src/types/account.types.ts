export enum Role {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
}

export interface Account {
  id: number;
  role: Role;
  email: string;
  password?: string; // Optional as it might not always be returned or needed in frontend types
  createdAt: string;
}