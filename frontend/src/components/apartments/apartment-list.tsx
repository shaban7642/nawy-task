import { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    Grid,
    Pagination,
    Toolbar,
    Typography,
} from '@mui/material';
import ApartmentCreateForm from './apartment-create-form';
import toast from 'react-hot-toast';
import { useMounted } from '../../hooks/use-mounted';
import { apartmentApi } from '../../api/apartmentApi';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Apartment } from '../../types/apartment.type';

export const ApartmentList = () => {
    const [page, setPage] = useState(1); // Page number starts from 1
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [apartmentCount, setApartmentsCount] = useState(0); // Initialize with 0
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const isMounted = useMounted();
    const theme = useTheme();
    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getApartments = useCallback(
        async (rowsPerPage: number, page: number) => {
            const offset = (page - 1) * rowsPerPage;
            try {
                const data: any = await apartmentApi.getApartments(
                    rowsPerPage,
                    offset // Pass the offset to the API
                );
                if (isMounted()) {
                    setApartments(data.rows);
                    setApartmentsCount(data.count);
                }
            } catch (err: any) {
                toast.error(err.message || 'Failed to fetch apartments');
            }
        },
        [isMounted]
    );

    const deleteApartment = async (
        id: number
    ): Promise<{ success: boolean }> => {
        const load = toast.loading('Deleting apartment...');
        try {
            const resp = await apartmentApi.deleteApartment(id);

            if (resp.success) {
                toast.dismiss(load);
                toast.success('Apartment deleted successfully');
                getApartments(rowsPerPage, page);
                return { success: true };
            } else {
                toast.dismiss(load);
                toast.error('Failed to delete apartment');
                return { success: false };
            }
        } catch (err: any) {
            toast.dismiss(load);
            toast.error(err.message || 'Failed to delete apartment');
            return { success: false };
        }
    };

    const createApartment = async (
        paramValues: Apartment,
        bodyValues: any
    ): Promise<{ success: boolean }> => {
        const load = toast.loading('Creating apartment...');
        try {
            await apartmentApi.createApartment(
                paramValues.title,
                paramValues.description,
                paramValues.price,
                bodyValues
            );

            toast.dismiss(load);
            toast.success('Apartment created successfully');
            handleClose();
            getApartments(rowsPerPage, page);
            return { success: true };
        } catch (err: any) {
            toast.dismiss(load);
            toast.error(err.message || 'Failed to create apartment');
            return { success: false };
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        getApartments(rowsPerPage, newPage);
    };

    useEffect(() => {
        getApartments(rowsPerPage, page);
    }, [getApartments, page, rowsPerPage]);

    return (
        <Box
            sx={{
                // width: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 6,
            }}
        >
            <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Toolbar
                        sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 },
                        }}
                    >
                        <Typography
                            sx={{ mr: 4 }}
                            variant='h5'
                            id='tableTitle'
                            component='div'
                        >
                            Apartment List
                        </Typography>
                        <Button
                            variant='outlined'
                            size='small'
                            onClick={handleClickOpen}
                        >
                            Add Apartment
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby='responsive-dialog-title'
                        >
                            <ApartmentCreateForm
                                createApartment={createApartment}
                            />
                        </Dialog>
                    </Toolbar>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        {apartments.map((apartment) => (
                            <Card
                                key={apartment.id}
                                sx={{ width: 345, margin: 2 }}
                                variant='outlined'
                            >
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={`${process.env.NEXT_PUBLIC_API_URL}/${apartment.imageStoragePath}`}
                                    title={apartment.title}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='div'
                                    >
                                        {apartment.title}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {apartment.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={() =>
                                            router.push(
                                                `/apartments/${apartment.id}`
                                            )
                                        }
                                        size='small'
                                    >
                                        Details
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                    <Box sx={{ my: 2 }}>
                        {apartmentCount > rowsPerPage && (
                            <Pagination
                                count={Math.ceil(apartmentCount / rowsPerPage)}
                                page={page}
                                defaultPage={1}
                                onChange={handleChangePage}
                            />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
