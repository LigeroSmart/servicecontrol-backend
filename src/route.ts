import { Router } from 'express';
import { loginRouter } from './routes/login.routes';
import { usuarioRouter } from './routes/usuario.routes';
import { perfilRouter } from './routes/perfil.routes';
import { menuRouter } from './routes/menu.routes';

const router = Router();

router.use('/api/v1', loginRouter);
router.use('/api/v1/usuario', usuarioRouter);
router.use('/api/v1/perfil', perfilRouter);
router.use('/api/v1/menu', menuRouter);

export default router;