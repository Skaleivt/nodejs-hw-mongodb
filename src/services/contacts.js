import { ContactCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

export const getAllContactsById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  return contact;
};

export const createContacts = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};

export const updateContacts = async (
  contactId,
  payload,
  options = { new: true },
) => {
  const contact = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    options,
  );
  return contact;
};

export const deleteContacts = async (contactId) => {
  const contact = await ContactCollection.findOneAndDelete({ _id: contactId });
  return contact;
};
