export class NewPictureDto {
    title: string = '';
    description: string | null = null;
    file!: File;
    width: number = 0;
    height: number = 0;
    iso: string | null = null;
    cameraModel: string | null = null;
    flash: boolean | null = null;
    delayTimeMilliseconds: number | null = null;
    focusDistance: string | null = null;
    shootingDate: Date | null = null;
}