const getCurrentDateTime = () => {
  const now = new Date();
  const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  return date + ' ' + time;
}

const parseDates = (str) => {
  const regex = /(\d{1,2}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;
  return str.match(regex);
}

export { getCurrentDateTime, parseDates };
