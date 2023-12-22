export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


export const getBasketTotal = (basket) => {
  if (!basket || !Array.isArray(basket)) {
    return 0;
  }
  const totalNumber = basket.reduce((amount, item) => {
    // Check if 'item' and 'total' property exist
  const totalItem = item.total ? item.total * localStorage.getItem(`numItem_${item.id}`) : 0;
    // const totalItem = item.total * localStorage.getItem(`numItem_${item.id}`);
    return amount + totalItem;
  }, 0);
  return formatNumber(totalNumber);
};


// export const getBasketTotal = (basket) => {
//   const totalNumber = basket.reduce((amount, item) => {
//     console.log(localStorage.getItem(`numItem_${item.id}`));
//     return amount + item.total;
//   }, 0);
//   return formatNumber(totalNumber);
// }