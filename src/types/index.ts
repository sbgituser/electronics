export interface Product {
  asin: string;
  name: string;
  price: string;
  description?: string;
}

export interface Board {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  asin: string;
  cpu: string;
  memory: string;
  wifi: boolean;
  bluetooth: boolean;
  gpio: number;
  camera: boolean;
  aiCapable: boolean;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
}
