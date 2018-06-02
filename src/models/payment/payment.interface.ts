export interface Payment{
    $key?: string,
    coustomerId: string,
    paymentDate: string,
    itemKey : string,
    money : number,
    paymentStatus : string
}