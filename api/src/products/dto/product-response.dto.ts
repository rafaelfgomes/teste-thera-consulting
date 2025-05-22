export class ProductResponseDto {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  active: boolean;
  category: {
    name: string;
  };
}
