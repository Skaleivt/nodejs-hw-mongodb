import { Router } from 'express';
import { contactsRouter } from './contacts.js';
import { authRouter } from './auth.js';
import { authorization } from '../middlewares/authenticate.js';
// import { checkUser } from '../middlewares/checkUser.js';

const router = Router();

router.use('/contacts', authorization, contactsRouter);
router.use('/auth', authRouter);

export default router;
