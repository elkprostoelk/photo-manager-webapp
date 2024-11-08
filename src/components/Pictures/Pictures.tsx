import httpClient from "../../utils/httpClient.ts";
import {useEffect, useState} from "react";
import {ShortPictureDto} from "../../utils/dto/shortPictureDto.ts";
import {PagedResultDto} from "../../utils/dto/pagedResultDto.ts";
import {AxiosError} from "axios";
import {ProgressSpinner} from "primereact/progressspinner";
import './Pictures.css';
import {Paginator} from "primereact/paginator";
import PictureCard from "./PictureCard/PictureCard.tsx";
import {useToast} from "../../utils/contexts/UseToast.tsx";

const Pictures = () => {
    const [,showError,] = useToast();
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
                showError(null, axiosErr?.message ?? null);
            }).finally(() => setIsLoading(false));
    }, [])

    return (
        <>
            {
                isLoading
                    ? <div className={'progress-spinner-block'}><ProgressSpinner/></div>
                    : (
                        pictures.totalItems > 0
                            ? (
                                <div className={'pictures-cards'}>
                                    {
                                        pictures.pageItems.map((picture, index) =>
                                            <PictureCard key={index} picture={picture}/>)
                                    }
                                    {pictures.totalItems > pictures.itemsPerPage && <Paginator/>}
                                </div>
                            )
                            : (
                                <div className={'no-pictures-container'}>
                                    <div className={'no-pictures'}>
                                        <i className={'pi pi-image'} style={{fontSize: '5rem'}} />
                                        <span>No Pictures Found</span>
                                    </div>
                                </div>
                            )
                    )
            }
        </>
    );
};

export default Pictures;