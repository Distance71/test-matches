import { findPotentialDuplicates, readContacts } from "./methods/index.js";

const processContacts = async () => {
  try {
    let contacts = await readContacts("./data.csv");
    contacts = findPotentialDuplicates(contacts);

    console.log("contacts", contacts);
  } catch (error) {
    // TODO: Add logger if needed
    console.log("error", error);
  }
};

processContacts();
