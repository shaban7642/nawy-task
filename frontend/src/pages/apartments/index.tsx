import { useState } from 'react';
import { NextPage } from 'next';
import { Box } from '@mui/material';
import { ApartmentList } from '../../components/apartments/apartment-list';

const Apartments: NextPage = () => {
    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <ApartmentList />
            </Box>
        </>
    );
};

export default Apartments;
