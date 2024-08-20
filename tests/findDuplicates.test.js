import { findPotentialDuplicates, compareContacts } from "../methods/index.js";

describe("findPotentialDuplicates", () => {
  test("should identify exact duplicates correctly", () => {
    const contacts = [
      { contactID: "1", name: "John", name1: "Doe", email: "john@example.com" },
      { contactID: "2", name: "John", name1: "Doe", email: "john@example.com" },
      { contactID: "3", name: "Jane", name1: "Doe", email: "jane@example.com" },
    ];

    const result = findPotentialDuplicates(contacts);

    expect(result).toEqual([
      { "ContactID Source": "1", "ContactID Match": "2", Accuracy: "High" },
      { "ContactID Source": "1", "ContactID Match": "3", Accuracy: "Low" },
      { "ContactID Source": "2", "ContactID Match": "3", Accuracy: "Low" },
    ]);
  });

  test("should handle no duplicates correctly", () => {
    const contacts = [
      {
        contactID: "1",
        name: "Alice",
        name1: "Smith",
        email: "alice@example.com",
      },
      { contactID: "2", name: "Bob", name1: "Jones", email: "bob@example.com" },
    ];

    const result = findPotentialDuplicates(contacts);

    expect(result).toEqual([]);
  });

  test("should identify duplicates with different names but same email", () => {
    const contacts = [
      { contactID: "1", name: "John", name1: "Doe", email: "john@example.com" },
      {
        contactID: "2",
        name: "Jane",
        name1: "Smith",
        email: "john@example.com",
      },
    ];

    const result = findPotentialDuplicates(contacts);

    expect(result).toEqual([
      { "ContactID Source": "1", "ContactID Match": "2", Accuracy: "Medium" },
    ]);
  });
});

describe("compareContacts", () => {
  test("should return high accuracy for exact matches", () => {
    const contact1 = { name: "John", name1: "Doe", email: "john@example.com" };
    const contact2 = { name: "John", name1: "Doe", email: "john@example.com" };

    const score = compareContacts(contact1, contact2);

    expect(score).toBe(110);
  });

  test("should return lower accuracy for partial matches", () => {
    const contact1 = { name: "John", name1: "Doe", email: "john@example.com" };
    const contact2 = {
      name: "John",
      name1: "Smith",
      email: "john@example.com",
    };

    const score = compareContacts(contact1, contact2);

    expect(score).toBe(80);
  });
});
