function getWeek(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayWithinYear = Math.floor(diff / oneDay);
  return Math.ceil((dayWithinYear + startOfYear.getDay() + 1) / 7);
}

export default getWeek;
