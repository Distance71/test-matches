import {
  HIGH_POTENTIAL_DUPLICATE_SCORE,
  HIGH_POTENTIAL_DUPLICATE_SCORE_LABEL,
  MEDIUM_POTENTIAL_DUPLICATE_SCORE,
  MEDIUM_POTENTIAL_DUPLICATE_SCORE_LABEL,
  LOW_POTENTIAL_DUPLICATE_SCORE,
  LOW_POTENTIAL_DUPLICATE_SCORE_LABEL,
  CONTACT_KEY_NAME,
  CONTACT_KEY_NAME1,
  CONTACT_KEY_EMAIL,
  CONTACT_KEY_ADDRESS,
} from "./constants.js";
import { getHashMapByContactsKey, compareContacts } from "./index.js";

const getAccuracyLabel = (score) => {
  if (score >= HIGH_POTENTIAL_DUPLICATE_SCORE)
    return HIGH_POTENTIAL_DUPLICATE_SCORE_LABEL;
  if (score >= MEDIUM_POTENTIAL_DUPLICATE_SCORE)
    return MEDIUM_POTENTIAL_DUPLICATE_SCORE_LABEL;
  return LOW_POTENTIAL_DUPLICATE_SCORE_LABEL;
};

export const findPotentialDuplicates = (contacts) => {
  const potentialDuplicates = [];

  const nameMap = getHashMapByContactsKey(contacts, CONTACT_KEY_NAME);
  const name1Map = getHashMapByContactsKey(contacts, CONTACT_KEY_NAME1);
  const emailMap = getHashMapByContactsKey(contacts, CONTACT_KEY_EMAIL);
  const addressMap = getHashMapByContactsKey(contacts, CONTACT_KEY_ADDRESS);

  const seenPairs = new Set();

  // This assumes as an heuristic that the contacts probably wouldn't be too similar
  const processPairs = (map) => {
    map.forEach((contactsWithSameValue) => {
      if (contactsWithSameValue.length > 1) {
        for (let i = 0; i < contactsWithSameValue.length; i++) {
          for (let j = i + 1; j < contactsWithSameValue.length; j++) {
            const pairKey = [
              contactsWithSameValue[i].contactID,
              contactsWithSameValue[j].contactID,
            ]
              .sort()
              .join("-");
            if (!seenPairs.has(pairKey)) {
              seenPairs.add(pairKey);
              const score = compareContacts(
                contactsWithSameValue[i],
                contactsWithSameValue[j]
              );

              if (score >= LOW_POTENTIAL_DUPLICATE_SCORE) {
                potentialDuplicates.push({
                  "ContactID Source": contactsWithSameValue[i].contactID,
                  "ContactID Match": contactsWithSameValue[j].contactID,
                  Accuracy: getAccuracyLabel(score),
                });
              }
            }
          }
        }
      }
    });
  };

  processPairs(nameMap);
  processPairs(name1Map);
  processPairs(emailMap);
  processPairs(addressMap);

  return potentialDuplicates;
};
