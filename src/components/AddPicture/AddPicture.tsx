import './AddPicture.css';
import {InputText} from "primereact/inputtext";
import {SelectItem} from "primereact/selectitem";
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {FormEvent, useState} from "react";
import {NewPictureDto} from "../../utils/dto/newPictureDto.ts";
import {Button} from "primereact/button";
import httpClient from "../../utils/httpClient.ts";
import {ServiceResultDto} from "../../utils/dto/serviceResultDto.ts";
import {AxiosError} from "axios";
import {useToast} from "../../utils/contexts/UseToast.tsx";
import {isUserLoggedIn} from "../../utils/user.ts";

const AddPicture = () => {
    if (!isUserLoggedIn()) {
        window.location.assign("/login");
    }

    const [newPicture, setNewPicture] = useState<NewPictureDto>(new NewPictureDto());
    const [,showError, showSuccess] = useToast();
    const options: SelectItem[] = [
        {label: 'Not selected', value: null},
        {label: 'No', value: false},
        {label: 'Yes', value: true},
    ];
    const uploadNewPicture = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await httpClient.postForm<ServiceResultDto>('pictures', newPicture);
            if (response.data.isSuccess) {
                showSuccess('Success', 'Picture has been added!');
                setTimeout(() => window.location.assign('/'), 5000);
            }
            else {
                showError('Error', 'Failed to upload a picture!');
            }
        }
        catch (error) {
            const axiosErr = error as AxiosError;
            showError(null, axiosErr?.message ?? null);
        }

    };

    return (<div className="add-picture-form-container">
        <h1>Add New Picture</h1>
        <form className="add-picture-form" onSubmit={uploadNewPicture}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <InputText
                    id="title"
                    name="title"
                    value={newPicture.title ?? ''}
                    onChange={(e) => setNewPicture((prev) => ({
                        ...prev,
                        title: e.target.value
                    }))}/>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <InputText
                    id="description"
                    name="description"
                    value={newPicture.description ?? ''}
                    onChange={(e) => setNewPicture((prev) => ({
                        ...prev,
                        description: e.target.value
                    }))}/>
            </div>
            <div className="form-group">
                <label htmlFor="width">Width</label>
                <InputText
                    id="width"
                    name="width"
                    value={newPicture.width.toString() ?? ''}
                    onChange={(e) => setNewPicture((prev) => ({
                        ...prev,
                        width: Number(e.target.value)
                    }))}/>
            </div>
            <div className="form-group">
                <label htmlFor="height">Height</label>
                <InputText
                    id="height"
                    name="height"
                    value={newPicture.height.toString() ?? ''}
                    onChange={(e) => setNewPicture((prev) => ({
                        ...prev,
                        height: Number(e.target.value)
                    }))}/>
            </div>
            <div className="form-group">
                <label htmlFor="iso">ISO</label>
                <InputText
                    id="iso"
                    name="iso"
                    value={newPicture.iso ?? ''}
                    onChange={(e) => setNewPicture((prev) => ({
                        ...prev,
                        iso: e.target.value
                    }))}/>
            </div>
            <div className="form-group">
                <label htmlFor="cameraModel">Camera model</label>
                <InputText
                    id="cameraModel"
                    name="cameraModel"
                    value={newPicture.cameraModel ?? ''}
                    onChange={(e) => setNewPicture((prev) => ({
                        ...prev,
                        cameraModel: e.target.value
                    }))}/>
            </div>
            <div className="form-group">
                <label htmlFor="cameraModel">Flash</label>
                <Dropdown
                    id="flash"
                    placeholder="Not selected"
                    className="p-inputtext-sm"
                    name="flash"
                    options={options}
                    optionLabel="label"
                    optionValue="value"
                    value={newPicture.flash ?? null}
                    onChange={(e) => setNewPicture(prev => ({
                        ...prev,
                        flash: e.value
                    }))}/>
            </div>
            <div className="form-group">
                <label htmlFor="delayTimeMilliseconds">Delay time (ms)</label>
                <InputText
                    id="delayTimeMilliseconds"
                    name="delayTimeMilliseconds"
                    value={newPicture.delayTimeMilliseconds?.toString() ?? ''}
                    onChange={(e) => setNewPicture((prev) => ({
                        ...prev,
                        delayTimeMilliseconds: Number(e.target.value)
                    }))}/>
            </div>
            <div className="form-group">
                <label htmlFor="focusDistance">Focus distance</label>
                <InputText
                    id="focusDistance"
                    name="focusDistance"
                    value={newPicture.focusDistance ?? ''}
                    onChange={(e) => setNewPicture((prev) => ({
                        ...prev,
                        focusDistance: e.target.value
                    }))}/>
            </div>
            <div className="form-group">
                <label htmlFor="shootingDate">Shooting date</label>
                <Calendar
                    id="shootingDate"
                    name="shootingDate"
                    value={newPicture.shootingDate}
                    onChange={(e) => setNewPicture((prev) => ({
                        ...prev,
                        shootingDate: e.target.value ?? null
                    }))}/>
            </div>
            <div className="form-group">
                <label htmlFor="file">Picture</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => setNewPicture((prev) => {
                        if (!e.target.files)
                            return prev;
                        return {
                            ...prev,
                            file: e.target.files[0]
                        }
                    })} />
            </div>
            <Button
                type="submit"
                label="Add picture"
                icon="pi pi-image"/>
            <Button
                type="reset"
                severity="danger"
                label="Clear fields"
                icon="pi pi-trash"
                onClick={() => setNewPicture(new NewPictureDto())}/>
        </form>
    </div>);
};

export default AddPicture;