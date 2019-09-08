import Lines from "./Lines.js";

export const GetLineGroup = lineId => {
  switch (lineId) {
    case 1: // Alamein
    case 2: // Belgrave
    case 7: // Glen Waverley
    case 9: // Lilydale
      return Lines.BURNLEY_GROUP;
    case 3: // Craigieburn
    case 14: // Sunbury
    case 15: // Upfield
      return Lines.SUNBURY_UPFIELD;
    case 4: // Cranbourne
    case 11: // Pakenham
      return Lines.CRANBOURNE_PAKENHAM;
    case 5: // Mernda
    case 8: // Hurstbridge
      return Lines.HURSTBRIDGE_MERNDA;
    case 6: //Frankston
    case 16: // Werribee
    case 17: // Williamston
      return Lines.FRANKSTON_WERRIBEE_WILLIAMSTOWN;
    case 12: // Sandringham
      return Lines.SANDRINGHAM;
    case 13: // Stony Point
      return Lines.STONY_POINT;
    case 1482:
      return Lines.SHOWGROUNDS;
    default:
      return Lines.UNKNOWN;
  }
};

export default GetLineGroup;
