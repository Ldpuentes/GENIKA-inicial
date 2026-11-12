import 'dotenv/config';
import app from './app.js';

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`GENIKA API activa en http://localhost:${port}/api/v1`));
