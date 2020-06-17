import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

interface IDropdown {
    onChange?: (event: any) => void;
    value?: string | number;
    id?: string;
    labelId?: string;
    options: Array<string | number>
}


const Dropdwon = ({ onChange, value, id, labelId, options }: IDropdown) => (
    <div>
        <InputLabel id="select-label"> Type </InputLabel>
        <Select
            labelId={labelId}
            id={id}
            value={value}
            onChange={onChange}
        >
            {options.map((item: string | number, idx: number) => <MenuItem key={idx} value={item}>{item}</MenuItem>)}

        </Select>
    </div>
)

export default Dropdwon;
