export interface ChatGroup {
    readonly id: number
    readonly name: string
    readonly photo_url: string
    readonly created_at?: {date: string}
    readonly updated_at?: {date: string}
}

export interface ChatMessage {
    type: string
    content: string
    user_id: string
    created_at: number
    user?: Promise<{name: string, photo_url: string}>
}

export interface User {
    id?: number
    name: string
    email: string
    password?: string
    profile?: UserProfile
    readonly created_at?: {date: string}
    readonly updated_at?: {date: string}
}

export interface UserProfile {
    photo_url: string
    phone_number: string
    has_photo: boolean
    firebase_uid: string
}