import { Router } from 'express';
import { loginRouter } from './routes/login.routes';
import { usuarioRouter } from './routes/usuario.routes';
import { perfilRouter } from './routes/perfil.routes';
import { menuRouter } from './routes/menu.routes';
import { clienteRouter } from './routes/cliente.routes';
import { modeloHorarioRouter } from './routes/modelo.horario.routes';
import { tipoHorarioRouter } from './routes/tipo.horario.routes';
import { tipoAtividadeRouter } from './routes/tipo.atividade.routes';
import { contatoRouter } from './routes/contato.routes';
import { servicoRouter } from './routes/servico.routes';
import { servicoClienteRouter } from './routes/servico.cliente.routes';

const router = Router();

router.use('/api/v1', loginRouter);
router.use('/api/v1/usuario', usuarioRouter);
router.use('/api/v1/perfil', perfilRouter);
router.use('/api/v1/menu', menuRouter);
router.use('/api/v1/cliente', clienteRouter);
router.use('/api/v1/modelo-horario', modeloHorarioRouter);
router.use('/api/v1/tipo-horario', tipoHorarioRouter);
router.use('/api/v1/tipo-atividade', tipoAtividadeRouter);
router.use('/api/v1/contato', contatoRouter);
router.use('/api/v1/servico', servicoRouter);
router.use('/api/v1/servico-cliente', servicoClienteRouter);

export default router;