export interface Category {
    id?: number;
    name: string;
    active: boolean;
    readonly slug?: string;
    readonly created_at?: {date: string};
    readonly updated_at?: {date: string}
}