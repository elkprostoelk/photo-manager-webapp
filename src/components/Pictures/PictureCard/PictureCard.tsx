import {ShortPictureDto} from "../../../utils/dto/shortPictureDto.ts";
import {Card} from "primereact/card";
import './PictureCard.css';

interface Props {
    picture: ShortPictureDto;
}

const PictureCard = ({picture}: Props) => {
    const apiPath: string = import.meta.env.VITE_API_SHORT_URL;

    return (
        <Card
            className={'picture-card'}
            title={picture.title}>
            <img
                src={`${apiPath}${picture.physicalPath}`}
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
};

export default PictureCard;