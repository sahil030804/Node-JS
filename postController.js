let peoples = [
  { id: 1, title: "person one" },
  { id: 2, title: "person two" },
  { id: 3, title: "person three" },
];

let getData = () => peoples;
let dataLength = () => {
  return peoples.length;
};


export default getData;
export { dataLength };


