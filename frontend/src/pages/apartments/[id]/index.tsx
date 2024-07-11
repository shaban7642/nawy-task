import { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { apartmentApi } from '../../../api/apartmentApi';
import { useMounted } from '../../../hooks/use-mounted';
import Image from 'next/image';
import { Apartment } from '../../../types/apartment.type';

const Apartments: NextPage = () => {
    const { query } = useRouter();
    console.log({ query });
    const isMounted = useMounted();
    const router = useRouter();

    const [apartment, setApartment] = useState<Apartment | null>(null);

    const getApartmentDetails = useCallback(
        async (apartmentId: number) => {
            try {
                const data: any = await apartmentApi.getApartmentDetails(
                    apartmentId
                );
                if (isMounted()) {
                    setApartment(data);
                }
            } catch (err: any) {
                // toast.error(err.message || 'failed');
            }
        },
        [isMounted]
    );

    useEffect(
        () => {
            getApartmentDetails(Number(query?.id));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [query]
    );
    return (
        <>
            {apartment ? (
                <Grid container sx={{ width: '100%', padding: 6 }}>
                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 3 }}>
                        <Button
                            onClick={() => router.push(`/apartments/`)}
                            size='small'
                        >
                            Go back
                        </Button>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 3 }}>
                        <Typography variant='h2'>Apartment Details</Typography>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12} sx={{ m: 2 }}>
                        <Paper sx={{ p: 4, width: '70%', border: '1px solid' }}>
                            <Typography variant='subtitle1'>
                                <span
                                    style={{
                                        color: '#EB5B2D',
                                        marginRight: '4px',
                                    }}
                                >
                                    Title:
                                </span>{' '}
                                {apartment.title}
                            </Typography>
                            <Typography variant='subtitle1'>
                                <span
                                    style={{
                                        color: '#EB5B2D',
                                        marginRight: '4px',
                                    }}
                                >
                                    Description:
                                </span>{' '}
                                {apartment.description}
                            </Typography>
                            <Typography variant='subtitle1'>
                                <span
                                    style={{
                                        color: '#EB5B2D',
                                        marginRight: '4px',
                                    }}
                                >
                                    Price:
                                </span>{' '}
                                {apartment.price}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${apartment.imageStoragePath}`}
                            width={400}
                            height={400}
                            style={{
                                objectFit: 'cover',
                                border: '1px solid',
                                borderRadius: '12px',
                            }}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Typography variant='h2'>No data available</Typography>
            )}
        </>
    );
};

export default Apartments;
