import type { NextPage } from 'next';
import Head from 'next/head';
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Nawy Task</title>
                <meta
                    name='viewport'
                    content='initial-scale=1, width=device-width'
                />
                <meta name='description' content='' />
                <meta name='keywords' content='' />
            </Head>
            <Box
                component='main'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Container
                    maxWidth='sm'
                    sx={{
                        py: {
                            xs: '60px',
                            md: '120px',
                        },
                    }}
                >
                    <Card elevation={16} sx={{ p: 4, backgroundColor: '#FFF' }}>
                        <Typography variant='h1'>Nawy Task</Typography>
                        <Divider sx={{ my: 3 }} />

                        <Button
                            onClick={() => router.push(`/apartments`)}
                            size='large'
                        >
                            Go to Apartments Page
                        </Button>
                    </Card>
                </Container>
            </Box>
        </>
    );
};
Home.getLayout = (page) => <>{page}</>;
export default Home;
