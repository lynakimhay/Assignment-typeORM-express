const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc get all contacts
//@route GET/api/contacts
//@access public
const getContact =asyncHandler( async (req, res) => {
    res.status(200).json({ message: "Get all contacts" });
  });
  
  //@desc Create new contact
  //@route POST/api/contacts
  //@access public
  const createContact = async (req, res) => {
    try {
      const { name, email, phone } = req.body;
  
      // Check if all fields are provided
      if (!name || !email || !phone) {
        return res.status(400).json({ message: "Please provide all fields" });
      }
  
      // Create the new contact
      const newContact = await Contact.create({
        name,
        email,
        phone,
      });
  
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  //@desc Get contact 
  //@route GET/api/contacts/:id
  //@access public
  const getContacts =asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Get contact for ID: ${req.params.id}` });
  });
  
  //@desc Update contact
  //@route PUT/api/contacts/:id
  //@access public
  const updateContact =asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Update contact for ID: ${req.params.id}` });
  });
  
  //@desc Delete contact
  //@route DELETE/api/contacts/:id
  //@access public
  const deleteContact =asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Delete contact for ID: ${req.params.id}` });
  });
  
  module.exports = {
    getContact,
    updateContact,
    deleteContact,
    getContacts,
    createContact,
  };
  