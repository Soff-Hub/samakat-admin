import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({ options = [], value, onChange }) {

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <FormControl className='block w-full'>
                <InputLabel id="demo-simple-select-helper-label">Ota kategoriyasi</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={value}
                    label="Ota kategoriyasi"
                    onChange={handleChange}
                >
                    <MenuItem value={null}>
                        <em>Yo'q</em>
                    </MenuItem>
                    {
                        options.map(el => {
                            return <MenuItem value={el.slug}>{el.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    );
}
