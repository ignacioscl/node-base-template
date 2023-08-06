export default interface Filter {
    id?: number;
    isActive?:number;
    orderBy:string;
    currentPage?:number;
    pageSize?:number;
}