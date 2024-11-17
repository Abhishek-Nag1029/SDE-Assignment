const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Add a new contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send({ error: 'Failed to add contact', message: error.message });
  }
});

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch contacts', message: error.message });
  }
});

// Update a contact by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).send({ error: 'Contact not found' });
    }
    res.status(200).send(updatedContact);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update contact', message: error.message });
  }
});

// Delete a contact by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).send({ error: 'Contact not found' });
    }
    res.status(200).send({ message: 'Contact deleted' });
  } catch (error) {
    res.status(400).send({ error: 'Failed to delete contact', message: error.message });
  }
});

module.exports = router;
