export class SearchPicturesDto {
    title: string | null = null;
    description: string | null = null;
    width: number | null = null;
    height: number | null = null;
    iso: string | null = null;
    cameraModel: string | null = null;
    flash: boolean | null = null;
    delayTimeMilliseconds: number | null = null;
    focusDistance: string | null = null;
    shootingDateFrom: Date | null = null;
    shootingDateTo: Date | null = null;
    page: number | null = null;
    itemsPerPage: number | null = null;
    sortBy: string | null = null;
    sortOrder: string | null = null;
}