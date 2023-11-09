import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Filter = ({ title, minValue, maxValue, onMinChange, onMaxChange, inputType}) => {
    const labelMax = inputType === 'datetime-local' ? '' : 'Max';
    const labelMin = inputType === 'datetime-local' ? '' : 'Min';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
            <span style={{fontWeight: "bold"}} >{title}:</span>
            <Box display="flex" flexDirection="column" alignItems="center">
                <TextField
                    type={inputType}
                    label={labelMin}
                    variant="outlined"
                    size="small"
                    value={minValue}
                    onChange={(e) => onMinChange(e.target.value)}
                    style={{ marginTop: '10px' }}
                    readOnly={inputType === 'datetime-local'}
                />
                <TextField
                    type={inputType}
                    label = {labelMax}
                    variant="outlined"
                    size="small"
                    value={maxValue}
                    onChange={(e) => onMaxChange(e.target.value)}
                    style={{ marginTop: '10px' }}
                    readOnly={inputType === 'datetime-local'}
                />
            </Box>
        </div>
    );
};

export default Filter;
