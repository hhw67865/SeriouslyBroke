function formatKey(key) {
  let words = key.split("_");
  words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
  return words.join(" ");
}

function formatAxiosErrors(errors) {
  console.log(errors.request.response)
  return Object.keys(errors.response.data).map(key => `${formatKey(key)} ${errors.response.data[key]}`)
}

export default formatAxiosErrors;