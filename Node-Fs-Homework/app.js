const fs = require("fs");

// 1) პირველი დავალება შენიშვნის დამატება

function addNote(newNoteTitle, newNoteContext) {
  const note = `${newNoteTitle} - ${newNoteContext}`;
  fs.writeFile("./notes.txt", note, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Note added successfully");
    }
  });
}

addNote("work task", "arrange the call with foreign partners");

// 2) მეორე დავალება შენიშვნის წაკითხვა

// function readNote() {
//   fs.readFile("./notes.txt", "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   });
// }

// readNote();

// 3) მესამე დავალება შენიშვნის ფაილის წაშლა

function deleteTask() {
  fs.readFile("./notes.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const tasks = data.split('\n').filter((task) => {
        return task !== "work task - arrange the call with foreign partners";
      })

      const updatedData = tasks.join('\n');
      fs.writeFile("./notes.txt", updatedData, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Task deleted successfully");
        }
      });
    }
  });
}

deleteTask();
