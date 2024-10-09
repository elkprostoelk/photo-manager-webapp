import {ShortUserDto} from "./shortUserDto.ts";

export interface ShortPictureDto {
    id: string;
    title: string;
    physicalPath: string;
    width: number;
    height: number;
    owner: ShortUserDto
}