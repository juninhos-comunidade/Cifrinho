export type TransactionType = "INCOME" | "EXPENSE";
export type AccountType = "PERSONAL" | "BUSINESS";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  accountType: AccountType;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  accountType: AccountType;
  date: string;
  categoryId?: string;
  category?: Category;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
