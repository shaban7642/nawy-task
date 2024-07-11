import LoadingButton from '@mui/lab/LoadingButton';
import {
    alpha,
    Box,
    Paper,
    Typography,
    Divider,
    Chip,
    Input,
    FormHelperText,
    TextField,
    InputLabel,
} from '@mui/material';
import { useState, FC } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Apartment } from '../../types/apartment.type';

interface ApartmentCreateFormProps {
    createApartment: (
        paramValues: Apartment,
        bodyValues: any
    ) => Promise<{ success: boolean }>;
}
const ApartmentCreateForm: FC<ApartmentCreateFormProps> = (props) => {
    const { createApartment } = props;
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | any>(null);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: null,
            submit: null,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required.'),
            description: Yup.string().required('Description is required.'),
            price: Yup.string().required('Price is required.'),
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                if (!file) {
                    formik.setFieldError('submit', 'Please provide an image.');
                    return;
                }
                setLoading(true);
                let formData = new FormData();
                formData.append('file', file);

                const uploadResp = await createApartment(values, formData);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        },
    });

    return (
        <>
            <Box sx={{ margin: 1, padding: 4 }}>
                <Typography color='inherit' variant='h6'>
                    Add Apartment
                </Typography>
                <form noValidate onSubmit={formik.handleSubmit} {...props}>
                    <TextField
                        // autoFocus
                        error={Boolean(
                            formik.touched.title && formik.errors.title
                        )}
                        fullWidth
                        helperText={formik.touched.title && formik.errors.title}
                        label='Title'
                        margin='normal'
                        name='title'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type='text'
                        value={formik.values.title}
                    />
                    <TextField
                        // autoFocus
                        error={Boolean(
                            formik.touched.description &&
                                formik.errors.description
                        )}
                        fullWidth
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
                        label='Description'
                        margin='normal'
                        name='description'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type='text'
                        value={formik.values.description}
                    />
                    <TextField
                        // autoFocus
                        error={Boolean(
                            formik.touched.price && formik.errors.price
                        )}
                        fullWidth
                        helperText={formik.touched.price && formik.errors.price}
                        label='Price'
                        margin='normal'
                        name='price'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type='number'
                        value={formik.values.price}
                    />

                    <Box sx={{ my: 2 }}>
                        <InputLabel>Image</InputLabel>
                        <Input
                            title='image'
                            type='file'
                            onChange={(e: any) => {
                                setFile(e.target.files[0]);
                            }}
                        />
                    </Box>
                    {formik.errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>
                                {formik.errors.submit}
                            </FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <LoadingButton
                            disabled={formik.isSubmitting}
                            fullWidth
                            size='large'
                            type='submit'
                            variant='contained'
                            loading={loading}
                        >
                            Upload file
                        </LoadingButton>
                    </Box>
                </form>
                {/* <Button
                    component='label'
                    variant='contained'
                    startIcon={<CloudUploadIcon />}
                >
                    Upload file
                    
                </Button> */}
            </Box>
        </>
    );
};

export default ApartmentCreateForm;
