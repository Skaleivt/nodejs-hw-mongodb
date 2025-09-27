import {
  createContacts,
  deleteContacts,
  getAllContacts,
  getAllContactsById,
  updateContacts,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getAllContacts(
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  );
  res.status(200).json({
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getAllContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await getAllContactsById(contactId);
  if (!contacts) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    message: `Successfully found contact with id ${contactId}!`,
    data: contacts,
  });
};

export const createContactsController = async (req, res, next) => {
  const contact = await createContacts(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const updateContactsController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContacts(contactId, req.body, { new: true });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    message: `Successfully patched a contact!`,
    data: contact,
  });
};

export const deleteContactsController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContacts(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    message: `Successfully delete a contact!`,
  });
};
