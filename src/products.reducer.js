export const productsReducer = (state, { type, value }) => {
  switch (type) {
    case "SORT":
      return { ...state, sortBy: value };
    case "TOGGLE_INVENTORY":
      return (state = { ...state, showInventoryAll: !state.showInventoryAll });
    case "TOGGLE_DELIVERY":
      return (state = {
        ...state,
        showFastDeliveryOnly: !state.showFastDeliveryOnly,
      });
    default:
      return state;
  }
};

export function getSortedData(productList, sortBy) {
  if (sortBy && sortBy === "PRICE_HIGH_TO_LOW")
    return productList.sort((a, b) => b.price - a.price);
  if (sortBy && sortBy === "PRICE_LOW_TO_HIGH")
    return productList.sort((a, b) => a.price - b.price);
  return productList;
}

export function getFilteredData(
  productList,
  { showInventoryAll, showFastDeliveryOnly }
) {
  return productList
    .filter(({ fastDelivery }) => (showFastDeliveryOnly ? fastDelivery : true))
    .filter(({ inStock }) => (showInventoryAll ? true : inStock));
}
