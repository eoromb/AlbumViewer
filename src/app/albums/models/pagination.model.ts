/**
 * Pagination model
 */
export interface Pagination {
    rowsCount: number;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
}
/**
 * Gets default pagination
 */
export function getDefaultPagination(): Pagination {
    return {
        pageSizeOptions: [20, 30, 50],
        rowsCount: 100,
        pageIndex: 0,
        pageSize: 20,
    };
}
