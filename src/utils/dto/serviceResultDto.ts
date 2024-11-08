export interface ServiceResultDto {
    isSuccess: boolean;
    errors: string[];
}

export interface ServiceTypedResultDto<T> extends ServiceResultDto {
    container: T;
}