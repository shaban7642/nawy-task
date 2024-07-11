import './environment';
import App from './app';
import { ApartmentsRoute } from './routes';

const app = new App([new ApartmentsRoute()]);

app.listen();
