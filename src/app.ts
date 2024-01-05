import { app } from './server';
import dotenv from 'dotenv'; 

dotenv.config();  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Listening in http://localhost:${PORT}`);
});