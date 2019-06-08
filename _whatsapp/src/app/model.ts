export interface ChatGroup {
    readonly id: number
    readonly name: string
    readonly photo_url: string
    readonly created_at?: {date: string}
    readonly updated_at?: {date: string}
}