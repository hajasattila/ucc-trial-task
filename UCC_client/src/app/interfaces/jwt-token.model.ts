export interface DecodedToken {
  id: number;
  username: string;
  email: string;
  role?: {
    id: number;
    name: string;
    type: string;
  };
  exp?: number;
  isAgent: boolean
}
