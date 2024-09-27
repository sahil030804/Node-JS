function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function celToFer(cel) {
  return cel * 1.8 + 32;
}

export { celToFer };
export default generateRandomNumber;


