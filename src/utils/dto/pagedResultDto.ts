export interface PagedResultDto<T> {
    totalItems: number;
    page: number;
    pageCount: number;
    itemsPerPage: number;
    pageItems: T[];
}