import { db } from "./config/db";
import { Request, Response } from "express";

export const findAll = (tableName: string, formattedName: string, res: Response, req?: Request) => {
  db.query(
    `SELECT * FROM db_pedidos_pizza.${tableName}`,
    (err: {}, result: Array<{}>) => {
      if (err) {
        res.status(500).send(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send({
          erro: `Nenhum ${formattedName} encontrado!`
        });
      }
    }
  );
}

export const findById = (tableName: string, formattedName: string, searchId: string, res: Response, req?: Request) => {
  db.query(
    `SELECT * FROM db_pedidos_pizza.${tableName} WHERE id = ?`,
    [searchId],
    (err: {}, result: Array<{}>) => {
      if (err) {
        res.status(500).send(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send({
          erro: `${formattedName} não encontrado, verifique o ID!`
        });
      }
    }
  );
}

export const createDocument = (
  tableName: string,
  formattedName: string,
  insertFields: string,
  res: Response,
  req: Request
) => {

  let values = "";
  Object.values(req.body).forEach(value => {
    values += `'${value}',`;
  });

  if (values.slice(-1) === ",") {
    values = values.slice(0, -1);
  }

  db.query(
    `INSERT INTO db_pedidos_pizza.${tableName}(${insertFields}) VALUES (${values})`,
    (err: {}, result: { [key: string]: number }) => {
      if (err) {
        res.status(500).send(err);
      }

      if (result.affectedRows > 0) {
        res.send(result);
      } else {
        res.status(500).send({
          erro: `Não foi possível cadastrar o ${formattedName}!`
        });
      }
    }
  );
}

export const updateById = (
  tableName: string,
  formattedName: string,
  updateId: string,
  res: Response,
  req: Request
) => {

  let values = "";
  Object.entries(req.body).forEach(([key, value]) => {
    values += `${key} = '${value}',`;
  });

  if (values.slice(-1) === ",") {
    values = values.slice(0, -1);
  }

  db.query(
    `UPDATE db_pedidos_pizza.${tableName} SET ${values} WHERE id = ${updateId}`,
    (err: {}, result: { [key: string]: number }) => {
      if (err) {
        res.status(500).send(err);
      }

      if (result.affectedRows > 0) {
        res.send(result);
      } else {
        res.status(500).send({
          erro: `Não foi possível alterar o ${formattedName}, verifique o ID!`
        });
      }
    }
  );
}

export const deleteById = (tableName: string, formattedName: string, deleteId: string, res: Response, req?: Request) => {
  db.query(
    `DELETE FROM db_pedidos_pizza.${tableName} WHERE id = ?`,
    deleteId,
    (err: {}, result: { [key: string]: number }) => {
      if (err) {
        res.status(500).send(err);
      }

      if (result.affectedRows > 0) {
        res.send(result);
      } else {
        res.status(500).send({
          erro: `Não foi possível deletar o ${formattedName}, verifique o ID!`
        });
      }
    }
  );
}

export const handleLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  db.query(
    `SELECT * FROM db_pedidos_pizza.client INNER JOIN db_pedidos_pizza.user ON email = '${email}' AND password = '${password}'`,
    (err: {}, result: { [key: string]: number }) => {
      if (err) {
        res.status(500).send(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(401).send("Usuário ou senha inválido!");
      }
    }
  );
}

export const findOrderByClientId = (clientId: string, res: Response, req?: Request) => {
  db.query(
    "SELECT * FROM db_pedidos_pizza.order WHERE client_id = ?",
    [clientId],
    (err: {}, result: { [key: string]: number }) => {
      if (err) {
        res.status(500).send(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send({
          erro: "Nenhum pedido encontrado para este cliente!"
        });
      }
    }
  );
}

export const findOrderProductsByOrderId = (orderId: string, res: Response, req?: Request) => {
  db.query(
    "SELECT * FROM db_pedidos_pizza.order_product WHERE order_id = ?",
    [orderId],
    (err: {}, result: { [key: string]: number }) => {
      if (err) {
        res.status(500).send(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send({
          erro: "Nenhum produto encontrado para este pedido!"
        });
      }
    }
  );
}

export const findProductsByOrderAndProductId = (orderId: string, productId: string, res: Response, req?: Request) => {
  db.query(
    "SELECT * FROM db_pedidos_pizza.order_product WHERE order_id = ? AND product_id = ?",
    [orderId, productId],
    (err: {}, result: { [key: string]: number }) => {
      if (err) {
        res.status(500).send(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send({
          erro: "Este produto não está no pedido informado!"
        });
      }
    }
  );
}

export const updateOrderProductByIds = (
  orderId: string,
  productId: string,
  res: Response,
  req: Request
) => {

  let values = "";
  Object.entries(req.body).forEach(([key, value]) => {
    values += `${key} = '${value}',`;
  });

  if (values.slice(-1) === ",") {
    values = values.slice(0, -1);
  }

  db.query(
    `UPDATE db_pedidos_pizza.order_product SET ${values} WHERE order_id = ${orderId} AND product_id = ${productId}`,
    (err: {}, result: { [key: string]: number }) => {
      if (err) {
        res.status(500).send(err);
      }

      if (result.affectedRows > 0) {
        res.send(result);
      } else {
        res.status(500).send({
          erro: `Não foi possível alterar o produto no pedido, verifique o ID!`
        });
      }
    }
  );
}

export const deleteOrderProductByIds = (orderId: string, productId: string, res: Response, req?: Request) => {
  db.query(
    `DELETE FROM db_pedidos_pizza.order_product WHERE order_id = ${orderId} AND product_id = ${productId}`,
    (err: {}, result: { [key: string]: number }) => {
      if (err) {
        res.status(500).send(err);
      }

			if (result) {
				res.send(result);
			} else {
				res.send({
					erro: "Não foi possível deletar o produto, verifique os IDs!"
				});
			}
		}
	);
}