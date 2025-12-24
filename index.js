
import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;

app.use(express.json());
 1
app.get("/users", async (req, res) => {
  try {
    const data = await fs.readFile("./users.json", "utf-8");
    const users = JSON.parse(data);
    res.json(users);
  } catch (err) {
    console.error("error", error);
    res.status(500).json({ message: "server error" });
  }
});

2
app.get("/users/search", async (req, res) => {
  try {
    const city = req.query.city;
    const data = JSON.parse(await readFile("./users.json", "utf-8"));
    const users = data.filter((el) => el.city == city);
    res.json(users);
  } catch (err) {
    res.status(404).json({ message: "server error" });
  }
});
3
app.get("/users/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("./users.json", "utf-8"));
    const users = data.find((el) => el.id == req.params.id);

    if (users) {
      res.json(users);
    }
  } catch (err) {
    console.error("error", err);
    res.status(404).json({ message: "server error" });
  }
});

4;
app.post("/users", async (req, res) => {
  try {
    const data = await fs.readFile("./users.json", "utf-8");
    const users = JSON.parse(data);
    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
    const newusers = {
      id: maxId + 1,
      ...req.body,
    };

    users.push(newusers);
    await fs.writeFile("./users.json", JSON.stringify(users, null, 2));
    res.status(201).json(newusers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

5
app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await fs.readFile("./users.json", "utf-8");
    const users = JSON.parse(data);
    const index = users.findIndex((u) => u.id == id);
    if (index === -1) {
      return res.status(404).json({ message: "users not found" });
    }
    users[index] = { id, ...req.body };
    await fs.writeFile("./users.json", JSON.stringify(users, null, 2));
    res.json(users[index]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});

6
app.delete("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await fs.readFile("./users.json", "utf-8");
    const users = JSON.parse(data);
    const filtereduserss = users.filter((u) => u.id !== id);

    if (filtereduserss.length === users.length) {
      return res.status(404).json({ message: "user not found" });
    }
    await writeFile("./users.json", JSON.stringify(filtereduserss, null, 2));
    return res.status(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});

// 7
async function readTasks() {
  const data = await fs.readFile("tasks.json", "utf-8");
  return JSON.parse(data);
}

async function writaTasks(tasks) {
  await fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2));
}
// 1
app.get("/tasks", async (req, res) => {
  try {
    const data = await fs.readFile("/tasks.json", "utf-8");
    const users = JSON.parse(data);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});
// 2
app.get(" /tasks/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("/tasks.json", "utf-8"));
    const users = data.find((el) => el.id == req.params.id);

    if (users) {
      res.json(users);
    }
  } catch (err) {
    res.status(404).json({ message: "not found" });
  }
});
//  3
// app.get("/tasks/filter", async (req, res) => {
//   try {
//     const tasks = JSON.parse(await readFile("./tasks.json", "utf-8"));
//     const isCompleted = req.query.completed === "true";
//     const filteredTasks = tasks.filter(
//       (task) => task.completed === isCompleted
//     );
//     res.json({ filteredTasks });
//   } catch (err) {
//     res.status(404).json({ message: "not found", err });
//   }
// });

4
app.get("/tasks/filter", async (req, res) => {
  try {
    const tasks = JSON.parse(await readFile("./tasks.json", "utf-8"));
    const filteredTasks = tasks.filter((e) => e.priority === req.query.priority);
    console.log(filteredTasks)
    res.json({ filteredTasks });
  } catch (err) {
    res.status(500).json({ message: "not found", err });
  }
});

app.post("/tasks",async (req,res) => {
  try {
    const data = await fs.readFile("./tasks.json", "utf-8");
    const users = JSON.parse(data);
    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
    const newusers = {
      id: maxId + 1,
      "completed" : "false",
      ...req.body
    };
    res.status(201).json(newusers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

6
app.put("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await fs.readFile("./tasks.json", "utf-8");
    const users = JSON.parse(data);
    const index = users.findIndex((u) => u.id == id);
    if (index === -1) {
      return res.status(404).json({ message: "users not found" });
    }
    users[index] = { id, ...req.body };
    await fs.writeFile("./tasks.json", JSON.stringify(users, null, 2));
    res.json(users[index]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});

app.patch("/tasks/:id/toggle", async (req, res) => {
  try {
    const { id } = req.params;
    const readdata = await fs.readFile("./tasks.json", "utf-8");
    const data = JSON.parse(readdata);
    const task = data.find((u) => u.id === id);
    if (task) {
      console.log(task);
      task.completed = !task.completed;
      fs.writeFile("./tasks.json", JSON.stringify(data, null, 2));
      res.json(task);
    }
    if (task === -1) throw new Error("404");
  } catch (err) {
    res.status(404).json({ messege: "not found", error: err.messege });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await fs.readFile("./tasks.json", "utf-8");
    const users = JSON.parse(data);
    const filtereduserss = users.filter((u) => u.id !== id);

    if (filtereduserss.length === users.length) {
      return res.status(404).json({ message: "user not found" });
    }
    await writeFile("./tasks.json", JSON.stringify(filtereduserss, null, 2));
    return res.status(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});
// תרגיל 8: פרויקט מורכב יותר - מערכת מוצרים

1
app.get("/products", async (req, res) => {
  try {
    const data = await fs.readFile("./products.json", "utf-8");
    const products = JSON.parse(data);

    res.json(products);
  } catch {
    res.status(500).json({ message: "server error" });
  }
});

// 2
app.get("/products/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const products = await fs.readFile("./products.json", "utf-8");
    const data = JSON.parse(products);
    console.log(products, id)
    const userID = data.filter((el) => el.id === id);
    if(userID.length){
    return res.json(userID);
    }
    const err = new Error('404 not found')
    err.status = 404;
    throw err;
  } catch(err) {
    res.status(err.status || 500).json({ message : err.message || 'Error'});
  }
});

3
app.post("/products", async (req, res) => {
  try {
    const data =  JSON.parse(await fs.readFile("./products.json", "utf-8"));
    console.log(data);
    const maxId = data.length > 0 ? Math.max(...data.map((u) => u.id)) : 0;

    const newProduct = {
      id: maxId + 1,
      ...req.body,
    };
    data.push(newProduct);
    await fs.writeFile("./products.json", JSON.stringify(data, null, 2));
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("error");
    res.status(500).json({ messege: "error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
