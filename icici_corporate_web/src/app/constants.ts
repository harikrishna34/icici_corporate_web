export interface getAsersDashBoardDataParams{
    CustomerID:string,
    DeviceID:string
}
export interface aserDashboardData{
    customer_id:string,
    device_id:string,
    tittle:string,
    value?:any,
    image?:string,
    time?:any,
    pdf?:string|undefined,
    data?:{[key:string]:any}
}
export interface getAserWatchDataParams{
    ID:string,
    Type:string,
    Interval:string,
    CustomerID:string
}
