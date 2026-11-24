export function formatCurrency(value) {
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
  }).format(value);
}

export function formatDate(value) {
  return new Date(value).toLocaleDateString('fa-IR');
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
