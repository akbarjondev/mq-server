const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const { fetch } = require("./src/db/db");
const app = express();

app.use(parser.json());
app.use(cors());

// Categories
app.get("/categories", async function (req, res) {
  try {
    const sql = `select * from categories order by category_id asc;`;

    const data = await fetch(sql);

    let response = await data;

    if (Array.isArray(response)) {
      res.send({
        code: 200,
        data: response,
      });
    } else {
      res.send({
        code: 500,
        error: response,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// get one
app.get("/category", async function (req, res) {
  try {
    let { id } = req.query;

    const sql = `select * from categories where category_id=$1;`;

    const data = await fetch(sql, [id]);

    let response = await data;

    if (Array.isArray(response)) {
      res.send({
        code: 200,
        data: response,
      });
    } else {
      res.send({
        code: 500,
        error: response,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/categories", async function (req, res) {
  try {
    const sql = `
    insert into categories(category_name) 
    values($1)
    returning *;`;

    const data = await fetch(sql, [req.body.name]);

    let response = await data;

    if (Array.isArray(response)) {
      res.send({
        code: 200,
        data: response,
      });
    } else {
      res.send({
        code: 500,
        error: response,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/categories", async function (req, res) {
  try {
    let { id, name } = req.body;

    const sql = `update categories
    set 
      category_name = $2
    where
      category_id = $1
    returning
      *
    ;`;

    const data = await fetch(sql, [id, name]);

    let response = await data;

    if (Array.isArray(response)) {
      res.send({
        code: 200,
        data: response,
      });
    } else {
      res.send({
        code: 500,
        error: response,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/categories", async function (req, res) {
  try {
    let { id } = req.body;

    const sql = `
      delete from categories where category_id=$1
    `;

    const data = await fetch(sql, [id]);

    let response = await data;

    if (Array.isArray(response)) {
      res.send({
        code: 200,
        data: response,
      });
    } else {
      res.send({
        code: 500,
        error: response,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// Callbacks
// get all
app.get("/callbacks", async function (req, res) {
  try {
    const sql = `
      select * from callbacks
      left join categories
      on callbacks.category_id = categories.category_id
      order by callback_id asc
      ;
    `;

    const data = await fetch(sql);

    let response = await data;

    if (Array.isArray(response)) {
      res.send({
        code: 200,
        data: response,
      });
    } else {
      res.send({
        code: 500,
        error: response,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// get one
app.get("/callback", async function (req, res) {
  try {
    let { id } = req.query;

    const sql = `select * from callbacks where callback_id=$1;`;

    const data = await fetch(sql, [id]);

    let response = await data;

    if (Array.isArray(response)) {
      res.send({
        code: 200,
        data: response,
      });
    } else {
      res.send({
        code: 500,
        error: response,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/callbacks", async function (req, res) {
  try {
    let {
      callback_title,
      callback_url,
      callback_type,
      callback_active,
      callback_function1,
      callback_function2,
      category_id,
    } = req.body;

    const sql = `
    insert into callbacks(
      callback_title,
      callback_url,
      callback_type,
      callback_active,
      callback_function1,
      callback_function2,
      category_id
    ) 
    values($1, $2, $3, $4, $5, $6, $7)
    returning *
    ;
    `;

    const data = await fetch(sql, [
      callback_title,
      callback_url,
      callback_type,
      callback_active,
      callback_function1,
      callback_function2,
      category_id,
    ]);

    let response = await data;

    if (Array.isArray(response)) {
      res.send({
        code: 200,
        data: response,
      });
    } else {
      res.send({
        code: 500,
        error: response,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/callbacks", async function (req, res) {
  try {
    let {
      callback_title,
      callback_url,
      callback_type,
      callback_active,
      callback_function1,
      callback_function2,
      category_id,
      callback_id,
    } = req.body;

    const sql = `
    update callbacks set
      callback_title = $1,
      callback_url = $2,
      callback_type = $3,
      callback_active = $4,
      callback_function1 = $5,
      callback_function2 = $6,
      category_id = $7
    where 
      callback_id = $8
    returning *
    ;
    `;

    const data = await fetch(sql, [
      callback_title,
      callback_url,
      callback_type,
      callback_active,
      callback_function1,
      callback_function2,
      category_id,
      callback_id,
    ]);

    let response = await data;

    if (Array.isArray(response)) {
      res.send({
        code: 200,
        data: response,
      });
    } else {
      res.send({
        code: 500,
        error: response,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/callbacks", async function (req, res) {
  try {
    let { id } = req.body;

    const sql = `
      delete from callbacks where callback_id=$1
    `;

    const data = await fetch(sql, [id]);

    let response = await data;

    if (Array.isArray(response)) {
      res.send({
        code: 200,
        data: response,
      });
    } else {
      res.send({
        code: 500,
        error: response,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`server ready at http://localhost:4001 🚀`));
