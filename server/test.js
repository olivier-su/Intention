const item = {
  id: "hello",
  number: 2,
  calories: 360,
  date: "2022-08-28",
  count: 40,
};
//deconstructing is good
const { ...restInfo } = item;

console.log(restInfo.id);
