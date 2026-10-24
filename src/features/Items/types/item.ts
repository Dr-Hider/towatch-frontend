export interface Item {
    id: number
    title: string
    typeId: number
    statusId: number
}

export interface ItemRequest {
    title: string
    typeId: number
    statusId: number
}