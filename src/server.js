import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllContacts, getAllContactsById } from './services/contacts.js';

dotenv.config();

export const setupServer = () => {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contacts = await getAllContactsById(contactId);
    if (!contacts) {
      res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contacts,
    });
  });

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
