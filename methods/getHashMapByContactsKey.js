// { value: [contact1, contact2, ...] }
export const getHashMapByContactsKey = (contacts, key) => {
  const map = new Map();
  contacts.forEach((contact) => {
    const value = contact[key];
    if (!map.has(value)) {
      map.set(value, []);
    }
    map.get(value).push(contact);
  });

  return map;
};
