import toProperCase from "./toProperCase.js";

export function sortByDescription(items) {
  return items.slice().sort((a, b) => {
    const descA = toProperCase(a.itemDescription);
    const descB = toProperCase(b.itemDescription);
    return descA.localeCompare(descB);
  });
}
