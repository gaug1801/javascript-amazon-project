export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}

//  Each file can only have one default export. People like it because it is cleaner. 
export default formatCurrency;