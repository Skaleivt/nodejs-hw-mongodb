import { ContactCollection } from '../db/models/contacts.js';
import Joi from 'joi';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortOrder,
  sortBy,
  filter = {},
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const pagination = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...pagination,
  };
};

export const getAllContactsById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  return contact;
};

export const createContacts = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.number().integer().min(6).max(16).required().messages({
    'number.base': 'Phone number must be a number',
    'number.integer': 'Phone number must be an integer',
    'number.min': 'Phone number must be at least 6 digits',
    'number.max': 'Phone number must not be longer than 16 digits',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid address with .com or .net domain',
      'any.required': 'Email is required',
    }),
  isFavourite: Joi.boolean().required().messages({
    'boolean.base': 'isFavourite must be true or false',
    'any.required': 'isFavourite is required',
  }),
  contactType: Joi.string()
    .valid('personal', 'home', 'work')
    .required()
    .min(3)
    .max(20)
    .messages({
      'string.base': 'contactType must be a string',
      'any.only': 'contactType must be one of [personal, home, work]',
      'any.required': 'contactType is required',
    }),
});

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

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  phoneNumber: Joi.number().integer().min(6).max(16).messages({
    'number.base': 'Phone number must be a number',
    'number.integer': 'Phone number must be an integer',
    'number.min': 'Phone number must be at least 6 digits',
    'number.max': 'Phone number must not be longer than 16 digits',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .min(3)
    .max(20)
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid address with .com or .net domain',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be true or false',
  }),
  contactType: Joi.string()
    .valid('personal', 'home', 'work')
    .min(3)
    .max(20)
    .messages({
      'string.base': 'contactType must be a string',
      'any.only': 'contactType must be one of: personal, home, work',
    }),
});
