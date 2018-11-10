export interface Category {
    id?: number;
    name: string;
    active: boolean;
    readonly slug?: string;
    readonly created_at?: {date: string};
    readonly updated_at?: {date: string}
}

export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    readonly slug?: string;
    active: boolean
    readonly created_at?: {date: string};
    readonly updated_at?: {date: string}
}