export class Item {
    name?: string;
    cost?: number;
    salePrice?: number;
    retailPrice?: number;
    inventory?: number;
    manufacturing?: number;
    backOrder?: number;
    image?: string;

    constructor(name: string,
                cost: number, 
                salePrice: number,
                retailPrice: number,
                inventory: number,
                manufacturing: number,
                backOrder: number,
                image: string) {
            this.name = name;
            this.cost = cost;
            this.salePrice = salePrice;
            this.retailPrice = retailPrice;
            this.inventory = inventory;
            this.manufacturing = manufacturing;
            this.backOrder = backOrder;
            this.image = image;
        }
}