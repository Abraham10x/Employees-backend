const path = require("path");
const { add } = require("./math");
const fs = require("fs").promises;

// console.log(path.parse(__filename));
// console.log(path.extname(__filename));
// console.log(path.basename(__filename));
// console.log(path.dirname(__filename));

const fsOps = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "file", "starter.txt"),
      "utf8"
    );
    console.log(data);
    await fs.unlink(path.join(__dirname, "file", "starter.txt"));
    await fs.writeFile(path.join(__dirname, "file", "promise-reply.txt"), data);
    await fs.appendFile(
      path.join(__dirname, "file", "promise-reply.txt"),
      "\n\nNice to meet you..."
    );
    await fs.rename(
      path.join(__dirname, "file", "promise-reply.txt"),
      path.join(__dirname, "file", "new-promise-reply.txt")
    );
    const newData = await fs.readFile(
      path.join(__dirname, "file", "new-promise-reply.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

fsOps();

// console.log(add(50, 8));
// fs.readFile(
//   path.join(__dirname, "file", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

// // Writing to file
// fs.writeFile(
//   path.join(__dirname, "file", "reply.txt"),
//   "Nice to meet you.",
//   (err) => {
//     if (err) throw err;
//     console.log("Write Completed");
//     fs.appendFile(
//       path.join(__dirname, "file", "reply.txt"),
//       "\n\nSame here...",
//       (err) => {
//         if (err) throw err;
//         console.log("Reply Completed");
//         fs.rename(
//           path.join(__dirname, "file", "reply.txt"),
//           path.join(__dirname, "file", "new-replay.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("Rename Completed");
//           }
//         );
//       }
//     );
//   }
// );

// uncaugth error
process.on("uncaughtException", (err) => {
  console.error("there is an uncaught err", err);
  process.exit(1);
});
