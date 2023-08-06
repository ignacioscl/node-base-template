import config from "../config/config";
import Filter from "./Filter";


class FaceEmployeeFilter implements Filter {
    id?:number
    isActive: -1|0|1 ;
    orderBy: string;
    pageSize?: number;
    currentPage?: number;
    constructor() {
        this.isActive               = 1;
        this.orderBy                = " u.nombre ";
        this.pageSize               = config.pageSize;
    }
}

export default FaceEmployeeFilter;