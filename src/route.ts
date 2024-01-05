import { Router } from 'express';
import { loginRouter } from './routes/login.routes';
import { usuarioRouter } from './routes/usuario.routes';

// import { chatRouter } from './routes/chat.routes';
// import { appearanceRouter } from './routes/appearance.routes';
// import { sourceTextRouter } from './routes/sourceTexto.routes';
// import { faqRouter } from './routes/faq.routes';
// import { webSiteRouter } from './routes/website.routes';
// import { fileRouter } from './routes/file.routes';

const router = Router();
router.use('/api/v1', loginRouter);
router.use('/api/v1/usuario', usuarioRouter);

// router.use('/api/chatbot', chatRouter);
// router.use('/api/aparencia', appearanceRouter);
// router.use('/api/texto', sourceTextRouter);
// router.use('/api/faq', faqRouter);
// router.use('/api/website', webSiteRouter);
// router.use('/api/arquivo', fileRouter);

export default router;