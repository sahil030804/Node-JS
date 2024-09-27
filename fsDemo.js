import fs from "fs/promises";

// // readFile()  - callback()
// fs.readFile("./text.txt", "utf8", (err, data) => {
//   if (err) throw err;

//   console.log(data);
// });



// // readFileSync() - synchronous version
// const data = fs.readFileSync("./text.txt", "utf8");
// console.log(data);

//readFile() - promise .then()
// fs.readFile("./text.txt", "utf8")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

//readFile() - async await

// const readFile = async () => {
//   try {
//     const data = await fs.readFile("./text.txt", "utf8");
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const writeFile = async () => {
//   try {
//     await fs.writeFile(
//       "./text.txt",
//       "Hello,I am again again writing into this file"
//     );
//     console.log("data wrtitten into file");
//   } catch (error) {
//     console.log(error);
//   }
// };

// const appendFile = async () => {
//   try {
//     await fs.appendFile(
//       "./text.txt",
//       "\n Hello this is new line i just appended"
//     );
//     console.log("data is appending");
//   } catch (error) {
//     console.log(error);
//   }
// };

// // writeFile();
// appendFile();
// readFile();

// ----------------------------------23/09/2024---------------------------------------

// fs.readFile("./text.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });

// fs.readFile("./text.txt", "utf8")
//   .then((data) => console.log(data))
//   .then((err) => console.log(err));

const readFile = async () => {
  try {
    const data = await fs.readFile("./text.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const writeFile = async () => {
  try {
    await fs.appendFile("./text.txt", "\n Hello this is again new hello world");
  } catch (error) {
    console.log(error);
  }
};
writeFile();
readFile();
