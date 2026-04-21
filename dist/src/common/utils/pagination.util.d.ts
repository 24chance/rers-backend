export declare class PaginationDto {
    page: number;
    pageSize: number;
}
export interface PaginatedResult<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}
export declare function paginateResponse<T>(items: T[], total: number, page: number, pageSize: number): PaginatedResult<T>;
export declare function toPageWindow(dto: PaginationDto): {
    skip: number;
    take: number;
};
