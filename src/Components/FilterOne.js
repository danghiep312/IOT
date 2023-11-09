import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Filter = ({ title, value, onValueChange, inputType, label}) => {


    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
            <span style={{fontWeight: "bold"}} >{title}:</span>
            <Box display="flex" flexDirection="column" alignItems="center">
                <TextField
                    type={inputType}
                    label={label}
                    variant="outlined"
                    size="small"
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                    style={{ marginTop: '10px' }}
                    readOnly={inputType === 'datetime-local'}
                />
            </Box>
        </div>
    );
};

export default Filter;
