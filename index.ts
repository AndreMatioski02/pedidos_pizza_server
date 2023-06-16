import { Request, Response } from "express";
import {
  findAll,
  findById,
  createDocument,
  deleteById,
  updateById,
  handleLogin,
  findOrderByClientId,
  findOrderProductsByOrderId,
  findProductsByOrderAndProductId,
  deleteOrderProductByIds,
  updateOrderProductByIds
} from "./controller";

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3333;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());


// Login

app.post("/api/login", (req: Request, res: Response) => {
  handleLogin(req, res);
});


// Users

app.get("/api/get/users", (req: Request, res: Response) => {
  findAll("user", "usuário", res, req);
});

app.get("/api/get/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  findById("user", "Usuário", id, res, req);
});

app.post("/api/create/user", (req: Request, res: Response) => {
  createDocument("user", "usuário", "client_id, username, password, last_access_at", res, req)
});

app.put("/api/update/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  updateById("user", "usuário", id, res, req);
});

app.delete("/api/delete/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  deleteById("user", "usuário", id, res, req);
});


// Clients

app.get("/api/get/clients", (req: Request, res: Response) => {
  findAll("client", "cliente", res, req);
});

app.get("/api/get/client/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  findById("client", "Cliente", id, res, req);
});

app.post("/api/create/client", (req: Request, res: Response) => {
  createDocument(
    "client", 
    "cliente", 
    "name, cpf, email, address_cep, address, address_number, district, city, uf, phone_number", 
    res, 
    req
  )
});

app.put("/api/update/client/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  updateById("client", "cliente", id, res, req);
});

app.delete("/api/delete/client/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  deleteById("client", "cliente", id, res, req);
});


// Products

app.get("/api/get/products", (req: Request, res: Response) => {
  findAll("product", "produto", res, req);
});

app.get("/api/get/product/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  findById("product", "Produto", id, res, req);
});

app.post("/api/create/product", (req: Request, res: Response) => {
  createDocument("product", "produto", "name, description, price", res, req);
});

app.put("/api/update/product/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  updateById("product", "produto", id, res, req);
});

app.delete("/api/delete/product/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  deleteById("product", "produto", id, res, req);
});


// Orders

app.get("/api/get/orders", (req: Request, res: Response) => {
  findAll("order", "pedido", res, req);
});

app.get("/api/get/order/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  findById("order", "Pedido", id, res, req);
});

app.get("/api/get/order/client/:clientId", (req: Request, res: Response) => {
  const { clientId } = req.params;
  findOrderByClientId(clientId, res);
});

app.post("/api/create/order", (req: Request, res: Response) => {
  createDocument("order", "pedido", "client_id, created_at, updated_at, total_value", res, req);
});

app.put("/api/update/order/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  updateById("order", "pedido", id, res, req);
});

app.delete("/api/delete/order/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  deleteById("order", "pedido", id, res, req);
});


// Order Products

app.get("/api/get/order_products", (req: Request, res: Response) => {
  findAll("order_product", "produto em pedido", res, req);
});

app.get("/api/get/order_product/:order_id", (req: Request, res: Response) => {
  const { order_id } = req.params;
  findOrderProductsByOrderId(order_id, res, req);
});

app.get("/api/get/order_product/:order_id/:product_id", (req: Request, res: Response) => {
  const { order_id, product_id } = req.params;
  findProductsByOrderAndProductId(order_id, product_id, res, req);
});

app.post("/api/create/order_product", (req: Request, res: Response) => {
  createDocument("order_product", "produto no pedido", "order_id, product_id, quantity, unit_price", res, req);
});

app.put("/api/update/order_product/:order_id/:product_id", (req: Request, res: Response) => {
  const { order_id, product_id } = req.params;
  updateOrderProductByIds(order_id, product_id, res, req);
});

app.delete("/api/delete/order_product/:order_id/:product_id", (req: Request, res: Response) => {
  const { order_id, product_id } = req.params;
  deleteOrderProductByIds(order_id, product_id, res, req);
});


// Server

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
