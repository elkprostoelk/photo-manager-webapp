import {ShortPictureDto} from "../../../utils/dto/shortPictureDto.ts";
import {Card} from "primereact/card";
import './PictureCard.css';

interface Props {
    picture: ShortPictureDto;
}

const PictureCard = ({picture}: Props) => {
    return (
        <Card
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
};

export default PictureCard;