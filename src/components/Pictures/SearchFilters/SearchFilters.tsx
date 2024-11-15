import './SearchFilters.css';
import {SearchPicturesDto} from "../../../utils/dto/searchPicturesDto.ts";
import {Button} from "primereact/button";
import {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {SelectItem} from "primereact/selectitem";

interface Props {
    onFiltersChanged: (params: SearchPicturesDto) => void;
}

const SearchFilters = ({onFiltersChanged}: Props) => {
    const [params, setParams] = useState<SearchPicturesDto>(new SearchPicturesDto());
    const options: SelectItem[] = [
        {label: 'Not selected', value: null},
        {label: 'No', value: false},
        {label: 'Yes', value: true},
    ];

    return (
        <div className="search-filters-panel">
            <h3>Search Pictures</h3>
            <div className="search-filter-group">
                <label htmlFor="title" className="search-filter-group-label">
                    Title:
                </label>
                <div className="search-filter">
                    <InputText
                        className="p-inputtext-sm"
                        id="title"
                        name="title"
                        value={params.title ?? ''}
                        onChange={(e) => setParams({
                            ...params,
                            title: e.target.value
                        })}/>
                </div>
            </div>
            <div className="search-filter-group">
                <label htmlFor="description" className="search-filter-group-label">
                    Description:
                </label>
                <div className="search-filter">
                    <InputText
                        className="p-inputtext-sm"
                        id="description"
                        name="description"
                        value={params.description ?? ''}
                        onChange={(e) => setParams({
                            ...params,
                            description: e.target.value
                        })}/>
                </div>
            </div>
            <div className="search-filter-group">
                <label htmlFor="iso" className="search-filter-group-label">
                    ISO:
                </label>
                <div className="search-filter">
                    <InputText
                        className="p-inputtext-sm"
                        id="iso"
                        name="iso"
                        value={params.iso ?? ''}
                        onChange={(e) => setParams({
                            ...params,
                            iso: e.target.value
                        })}/>
                </div>
            </div>
            <div className="search-filter-group">
                <label htmlFor="cameraModel" className="search-filter-group-label">
                    Camera model:
                </label>
                <div className="search-filter">
                    <InputText
                        className="p-inputtext-sm"
                        id="cameraModel"
                        name="cameraModel"
                        value={params.cameraModel ?? ''}
                        onChange={(e) => setParams({
                            ...params,
                            cameraModel: e.target.value
                        })}/>
                </div>
            </div>
            <div className="search-filter-group">
                <label htmlFor="flash" className="search-filter-group-label">
                    Flash:
                </label>
                <div className="search-filter">
                    <Dropdown
                        id="flash"
                        placeholder="Not selected"
                        className="p-inputtext-sm"
                        name="flash"
                        options={options}
                        optionLabel="label"
                        optionValue="value"
                        value={params.flash ?? null}
                        onChange={(e) => setParams({
                            ...params,
                            flash: e.value
                        })}/>

                </div>
            </div>
            <div className="search-filter-group">
                <label htmlFor="delayTimeMilliseconds" className="search-filter-group-label">
                    Delay time (ms):
                </label>
                <div className="search-filter">
                    <InputText
                        className="p-inputtext-sm"
                        id="delayTimeMilliseconds"
                        name="delayTimeMilliseconds"
                        value={params.delayTimeMilliseconds?.toString()}
                        onChange={(e) => setParams({
                            ...params,
                            delayTimeMilliseconds: parseFloat(e.target.value)
                        })}/>
                </div>
            </div>
            <div className="search-filter-group">
                <label htmlFor="width" className="search-filter-group-label">
                    Width:
                </label>
                <div className="search-filter">
                    <InputText
                        className="p-inputtext-sm"
                        id="width"
                        name="width"
                        value={params.width?.toString() ?? ''}
                        onChange={(e) => setParams({
                            ...params,
                            width: parseInt(e.target.value, 10)
                        })}/>
                </div>
            </div>
            <div className="search-filter-group">
                <label htmlFor="height" className="search-filter-group-label">
                    Height:
                </label>
                <div className="search-filter">
                    <InputText
                        className="p-inputtext-sm"
                        id="height"
                        name="height"
                        value={params.height?.toString() ?? ''}
                        onChange={(e) => setParams({
                            ...params,
                            height: parseInt(e.target.value, 10)
                        })}/>
                </div>
            </div>
            <div className="search-filter-group">
                <label htmlFor="focusDistance" className="search-filter-group-label">
                    Focus distance:
                </label>
                <div className="search-filter">
                    <InputText
                        className="p-inputtext-sm"
                        id="focusDistance"
                        name="focusDistance"
                        value={params.focusDistance ?? ''}
                        onChange={(e) => setParams({
                            ...params,
                            focusDistance: e.target.value
                        })}/>
                </div>
            </div>
            <div className="search-filter-group">
                <label htmlFor="shootingDateFrom" className="search-filter-group-label">
                    Shooting date from:
                </label>
                <div className="search-filter">
                    <Calendar
                        readOnlyInput
                        className="p-inputtext-sm"
                        id="shootingDateFrom"
                        name="shootingDateFrom"
                        value={params.shootingDateFrom ?? null}
                        onChange={(e) => setParams({
                            ...params,
                            shootingDateFrom: e.target.value ?? null
                        })}/>
                </div>
            </div>
            <div className="search-filter-group">
                <label htmlFor="shootingDateTo" className="search-filter-group-label">
                    Shooting date to:
                </label>
                <div className="search-filter">
                    <Calendar
                        readOnlyInput
                        className="p-inputtext-sm"
                        id="shootingDateTo"
                        name="shootingDateTo"
                        value={params.shootingDateTo ?? null}
                        onChange={(e) => setParams({
                            ...params,
                            shootingDateTo: e.target.value ?? null
                        })}/>
                </div>
            </div>
            <div className="search-filter-group">
                <Button
                    label="Search"
                    icon="pi pi-search"
                    onClick={() => onFiltersChanged(params)}/>
                <Button
                    severity="danger"
                    icon="pi pi-trash"
                    onClick={() => setParams(new SearchPicturesDto())}/>
            </div>
        </div>
    );
};

export default SearchFilters;