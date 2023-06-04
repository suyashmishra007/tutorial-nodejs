const products = [];
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const filePath = () => {
  const currentDirectory = process.cwd();
  return path.resolve(currentDirectory, "data", "products.json");
};

// TODO: Refactor
module.exports = class Product {
  constructor(_title) {
    this.title = _title;
  }
  save() {
    const pathToFile = filePath();

    fs.readFile(pathToFile, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      // Modify the content (if needed)
      let updatedContent = JSON.parse(data);
      updatedContent.push(this);

      // Append the new content to the file
      fs.writeFile(
        pathToFile,
        JSON.stringify(updatedContent),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error appending to file:", err);
            return;
          }
          console.log("File appended successfully.");
        }
      );
    });
  }
  static async fetchAll() {
    try {
      const pathToFile = filePath();

      const readFileAsync = promisify(fs.readFile);
      const data = await readFileAsync(pathToFile, "utf8");

      // Modify the content (if needed)
      const products = JSON.parse(data);
      console.log("products", products);
      return products;
    } catch (err) {
      console.error("Error reading file:", err);
      throw err;
    }
  }
};
