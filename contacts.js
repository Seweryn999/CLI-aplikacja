import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "db/contacts.json");

const getContactsList = async () => {
  let contactsList = [];
  await fs
    .readFile(contactsPath, "utf8")
    .then((contacts) => {
      contactsList = JSON.parse(contacts);
    })
    .catch((error) => console.log(error.message));
  return contactsList;
};

const listContacts = async () => {
  const contacts = await getContactsList();
  console.log("Contacts list from contacts.json:");
  console.table(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await getContactsList();
  const contactById = contacts.filter((c) => c.id === contactId);
  console.log(`Contact details for id=${contactId}:`);
  console.table(contactById);
};

const removeContact = async (contactId) => {
  const contacts = await getContactsList();
  const deletedContact = contacts.filter((c) => c.id === contactId);
  const filteredContacts = contacts.filter((c) => c.id !== contactId);
  console.log(`You just removed from your contacts`);
  console.table(deletedContact);
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  console.log("Contacts.json was updated:");
  console.table(filteredContacts);
};

const addContact = async (name, email, phone) => {
  const contacts = await getContactsList();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const updatedContactsList = [...contacts, newContact];
  fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));
  console.log(`${name} was added to contact list`);
  console.log("Contacts.json was updated:");
  console.table(updatedContactsList);
};

export { listContacts, getContactById, removeContact, addContact };
