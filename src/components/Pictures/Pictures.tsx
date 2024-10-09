import httpClient from "../../utils/httpClient.ts";
import {useEffect, useRef, useState} from "react";
import {ShortPictureDto} from "../../utils/dto/shortPictureDto.ts";
import {PagedResultDto} from "../../utils/dto/pagedResultDto.ts";
import {AxiosError} from "axios";
import {Toast} from "primereact/toast";
import {ProgressSpinner} from "primereact/progressspinner";
import {Card} from "primereact/card";
import './Pictures.css';

const Pictures = () => {
    const picturesToast = useRef<Toast>(null);
    const showError = (message: string | null | undefined) =>
        picturesToast.current?.show({
            severity: 'error',
            summary: 'Login failed',
            detail: message ?? 'Failed to sign in!'
        });
    const [pictures, setPictures] = useState<PagedResultDto<ShortPictureDto>>({
        totalItems: 0,
        page: 1,
        pageCount: 1,
        itemsPerPage: 10,
        pageItems: []
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        httpClient.get<PagedResultDto<ShortPictureDto>>('pictures')
            .then(picturesPage => setPictures(picturesPage.data))
            .catch(error => {
                const axiosErr = error as AxiosError;
                showError(axiosErr?.message ?? null);
            }).finally(() => setIsLoading(false));
    }, [])

    return (
        <>
            {isLoading
            ? <ProgressSpinner />
            : <div className={'pictures-cards'}>
                    {
                        pictures.pageItems.map((picture, index) => {
                            return (
                                <Card
                                    key={index}
                                    className={'picture-card'}
                                    title={picture.title}>
                                    <img
                                        src={import.meta.env.VITE_API_SHORT_URL + picture.physicalPath}
                                        alt={picture.title}/>
                                    <div className={'picture-parameters'}>
                                        <strong>Width:</strong> {picture.width}
                                    </div>
                                    <div className={'picture-parameters'}>
                                        <strong>Height:</strong> {picture.height}
                                    </div>
                                    <div className={'picture-parameters'}>
                                        <strong>Owner:</strong> {picture.owner.name}
                                    </div>
                                </Card>
                            );
                        })
                    }
                </div>
            }
        </>
    );
};

export default Pictures;