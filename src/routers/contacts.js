import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactsController,
  deleteContactsController,
  getAllContactsByIdController,
  getAllContactsController,
  updateContactsController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getAllContactsByIdController));

router.post('/contacts', ctrlWrapper(createContactsController));

router.patch('/contacts/:contactId', ctrlWrapper(updateContactsController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactsController));

export const contactsRouter = router;
