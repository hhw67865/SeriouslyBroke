function convertDate(railsDate) {
  // Use destructuring to extract date and time parts
  const [datePart = "", timePart = ""] = railsDate.split('T');

  // Extract year, month, day from datePart
  const [year = 0, month = 0, day = 0] = datePart.split('-').map(Number);

  // Extract hour, minute from timePart
  const [hour = 0, minute = 0] = timePart.split(':').map(Number);

  return { year, month, day, hour, minute };
}

export default convertDate;