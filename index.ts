const express = require("express");
import { db } from "./config/db";
const cors = require("cors");

const app = express();
const PORT = 3333;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

// Users

app.get("/api/get/users", (req: any, res: any) => {
  db.query("SELECT * FROM db_lista_compras.user", (err: any, result: any) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(404).send("Nenhum usuário encontrado!");
    }
  });
});

app.get("/api/get/user/:id", (req: any, res: any) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM db_lista_compras.user WHERE id = ?",
    [id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send("Usuário não encontrado, verifique o ID!");
      }
    }
  );
});

app.post("/api/create/user", (req: any, res: any) => {
  const { name, email, user, password } = req.body;
  db.query(
    `INSERT INTO db_lista_compras.user(name, email, user, password) VALUES (?, ?, ?, ?)`,
    [name, email, user, password],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        res.send(result);
      } else {
        res.status(500).send("Não foi possível cadastrar o usuário!");
      }
    }
  );
});

app.delete("/api/delete/user/:id", (req: any, res: any) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM db_lista_compras.user WHERE id= ?",
    id,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.affectedRows > 0) {
        res.send(result);
      } else {
        res.status(500).send(
          "Não foi possível deletar o usuário, verifique o ID!"
        );
      }
    }
  );
});

app.put("/api/update/user/:id", (req: any, res: any) => {
  const id = req.params.id;
  const { name, email, user, password } = req.body;
  db.query(
    `UPDATE db_lista_compras.user SET name = '${name}', email = '${email}', user = '${user}', password = '${password}' WHERE id = ${id}`,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.affectedRows > 0) {
        res.send(result);
      } else {
        res.status(500).send(
          "Não foi possível alterar o usuário, verifique o ID!"
        );
      }
    }
  );
});

// Login

app.post("/api/login", (req: any, res: any) => {
  const { email, password } = req.body;
  db.query(
    `SELECT * FROM db_lista_compras.user WHERE email = '${email}' AND password = '${password}'`,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(401).send("Usuário ou senha inválido!");
      }
    }
  );
});

// Products

app.get("/api/get/products", (req: any, res: any) => {
  db.query(
    "SELECT * FROM db_lista_compras.product",
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send("Nenhum produto encontrado!");
      }
    }
  );
});

app.get("/api/get/product/:id", (req: any, res: any) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM db_lista_compras.product WHERE id = ?",
    [id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send("Produto não encontrado!");
      }
    }
  );
});

app.post("/api/create/product", (req: any, res: any) => {
  const { name, brand, price, expiration_date, description } = req.body;
  db.query(
    `INSERT INTO db_lista_compras.product(name, brand, price, expiration_date, description) VALUES (?, ?, ?, ?, ?)`,
    [name, brand, price, expiration_date, description],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        res.send(result);
      } else {
        res.status(500).send(
          "Não foi possível criar o produto, verifique os dados enviados!"
        );
      }
    }
  );
});

app.delete("/api/delete/product/:id", (req: any, res: any) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM db_lista_compras.product WHERE id= ?",
    id,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.affectedRows > 0) {
        res.send(result);
      } else {
        res.status(500).send(
          "Não foi possível deletar o produto, verifique o ID!"
        );
      }
    }
  );
});

app.put("/api/update/product/:id", (req: any, res: any) => {
  const id = req.params.id;
  const { name, brand, price, expiration_date, description } = req.body;
  db.query(
    `UPDATE db_lista_compras.product SET name = '${name}', brand = '${brand}', price = '${price}', expiration_date = '${expiration_date}', description = '${description}' WHERE id = ${id}`,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.affectedRows > 0) {
        res.send(result);
      } else {
        res.status(500).send(
          "Não foi possível atualizar o produto, verifique o ID e os dados enviados!"
        );
      }
    }
  );
});

// Cart Product OK

app.get("/api/get/cart_products", (req: any, res: any) => {
  db.query(
    "SELECT * FROM db_lista_compras.cart_product",
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send("Nenhum produto encontrado!");
      }
    }
  );
});

app.get("/api/get/cart_product/:shopping_cart_id", (req: any, res: any) => {
  const { shopping_cart_id } = req.params;
  db.query(
    "SELECT * FROM db_lista_compras.cart_product WHERE shopping_cart_id = ?",
    [shopping_cart_id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send([]);
      }
    }
  );
});

app.get("/api/get/cart_product/:shopping_cart_id/:product_id", (req: any, res: any) => {
  const { shopping_cart_id } = req.params;
  const { product_id } = req.params;
  db.query(
    "SELECT * FROM db_lista_compras.cart_product WHERE shopping_cart_id = ? AND product_id = ?",
    [shopping_cart_id, product_id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send([]);
      }
    }
  );
});

app.post("/api/create/cart_product", (req: any, res: any) => {
  const {
    shopping_cart_id,
    product_id,
    quantity,
    created_at,
    total_value,
    product_value,
  } = req.body;
  db.query(
    `INSERT INTO db_lista_compras.cart_product(shopping_cart_id, product_id, quantity, created_at, total_value, product_value) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      shopping_cart_id,
      product_id,
      quantity,
      created_at,
      total_value,
      product_value,
    ],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        res.send(result);
      } else {
        res.status(500).send(
          "Não foi possível criar o produto, verifique os dados enviados!"
        );
      }
    }
  );
});

app.delete(
  "/api/delete/cart_product/:shopping_cart_id/:product_id",
  (req: any, res: any) => {
    const shopping_cart_id = req.params.shopping_cart_id;
    const product_id = req.params.product_id;

    db.query(
      `DELETE FROM db_lista_compras.cart_product WHERE shopping_cart_id= ${shopping_cart_id} AND product_id = ${product_id}`,
      (err: any, result: any) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          res.send(result);
        } else {
          res.status(500).send(
            "Não foi possível deletar o produto, verifique o ID!"
          );
        }
      }
    );
  }
);

app.put(
  "/api/update/cart_product/:shopping_cart_id/:product_id",
  (req: any, res: any) => {
    const shopping_cart_id = req.params.shopping_cart_id;
    const product_id = req.params.product_id;
    const { quantity, created_at, total_value, product_value } = req.body;
    db.query(
      `UPDATE db_lista_compras.cart_product SET shopping_cart_id = '${shopping_cart_id}', product_id = ${product_id}, quantity = ${quantity}, created_at = '${created_at}', total_value = '${total_value}', product_value = ${product_value} WHERE shopping_cart_id = ${shopping_cart_id} AND product_id = ${product_id}`,
      (err: any, result: any) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          res.send(result);
        } else {
          res.status(500).send(
            "Não foi possível atualizar o produto, verifique o ID e os dados enviados!"
          );
        }
      }
    );
  }
);

// Shopping Cart OK

app.get("/api/get/shopping_cart", (req: any, res: any) => {
  db.query(
    "SELECT * FROM db_lista_compras.shopping_cart",
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send("Nenhum carrinho encontrado!");
      }
    }
  );
});

app.get("/api/get/shopping_cart/user/:userId", (req: any, res: any) => {
  const { userId } = req.params;
  db.query(
    "SELECT * FROM db_lista_compras.shopping_cart WHERE user_id = ?",
    [userId],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send("Nenhum carrinho encontrado!");
      }
    }
  );
});

app.get("/api/get/shopping_cart/:id", (req: any, res: any) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM db_lista_compras.shopping_cart WHERE id = ?",
    [id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send("Nenhum carrinho encontrado!");
      }
    }
  );
});

app.post("/api/create/shopping_cart", (req: any, res: any) => {
  const { total_value, status, created_at, updated_at, user_id } = req.body;
  db.query(
    `INSERT INTO db_lista_compras.shopping_cart(total_value, status, created_at, updated_at, user_id) VALUES (?, ?, ?, ?, ?)`,
    [total_value, status, created_at, updated_at, user_id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        res.status(200).send(result);
      } else {
        res.status(500).send(
          "Não foi possível criar o carrinho, verifique os dados enviados!"
        );
      }
    }
  );
});

app.delete("/api/delete/shopping_cart/:id", (req: any, res: any) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM db_lista_compras.shopping_cart WHERE id= ?",
    id,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.affectedRows > 0) {
        res.send(result);
      } else {
        res.status(500).send(
          "Não foi possível deletar o carrinho, verifique o ID!"
        );
      }
    }
  );
});

app.put("/api/update/shopping_cart/:id", (req: any, res: any) => {
  const id = req.params.id;
  const { total_value, status, created_at, updated_at, user_id } = req.body;
  db.query(
    `UPDATE db_lista_compras.shopping_cart SET status = '${status}', total_value = ${total_value}, created_at = '${created_at}', updated_at = '${updated_at}', user_id = ${user_id} WHERE id = ${id}`,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }

      if (result.affectedRows > 0) {
        res.send(result);
      } else {
        res.status(500).send(
          "Não foi possível atualizar o carrinho, verifique o ID e os dados enviados!"
        );
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
