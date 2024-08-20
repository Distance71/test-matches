import {
  LOW_POTENTIAL_DUPLICATE_SCORE,
  MEDIUM_POTENTIAL_DUPLICATE_SCORE,
} from "./constants.js";

export const compareContacts = (contact1, contact2) => {
  let score = 0;

  if (contact1.name && contact2.name && contact1.name === contact2.name)
    score += LOW_POTENTIAL_DUPLICATE_SCORE;
  if (contact1.name1 && contact2.name1 && contact1.name1 === contact2.name1)
    score += LOW_POTENTIAL_DUPLICATE_SCORE;
  if (contact1.email && contact2.email && contact1.email === contact2.email)
    score += MEDIUM_POTENTIAL_DUPLICATE_SCORE;
  if (
    contact1.address &&
    contact2.address &&
    contact1.address === contact2.address
  )
    score += LOW_POTENTIAL_DUPLICATE_SCORE;

  return score;
};
