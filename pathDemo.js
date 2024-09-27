import path, { dirname } from "path";
import url from "url";

let filePath = "./dir1/dir2/test.txt";
console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));
console.log(path.parse(filePath));

let __fileName = url.fileURLToPath(import.meta.url);
let __dirName = path.dirname(__fileName);

console.log(__fileName);
console.log(__dirName);



