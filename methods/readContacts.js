import fs from "fs";
import csv from "csv-parser";

const formatContacts = (data) =>
  data.map((contact) => ({
    ...contact,
    name: contact.name.toLowerCase().trim(),
    name1: contact.name1.toLowerCase().trim(),
    email: contact.email.toLowerCase().trim(),
    address: contact.address.toLowerCase().trim(),
  }));

export const readContacts = async (filePath) => {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(formatContacts(results)))
      .on("error", (error) => reject(error));
  });
};
