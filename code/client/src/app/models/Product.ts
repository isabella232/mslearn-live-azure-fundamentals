export class Product {
    id: string;
    itemType: string;
    name: string;
    description: string;
    price: number;
    categories: string[];
    stockUnits: number;
    reorderAmount: number;
    autoOrderAmount: number;
    productsOnOrder: number;
    thumbnailImage: string;

    Product() {
        
    }
}
