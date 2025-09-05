import express from "express";
import {queryPostsMWs} from "../../middlewares/posts/queryPostsMWs";
import {getPostsController} from "./controllers/getPostsController";
import {idNaturalVal} from "../../middlewares/global/idNaturalVal";
import {findPostController} from "./controllers/findPostController";
// import {createPostController} from "./controllers/createPostController";
// import {adminMiddleware} from "../../globalMiddlewares/adminMiddleware";
// import {delPostController} from "./controllers/delPostController";
// import {putPostController} from "./controllers/putPostController";


export const postsRout = express.Router(); // Объявление маршрутизатора записей

postsRout.get("/", ...queryPostsMWs, getPostsController); // Возврат всех записей
postsRout.get("/:id", idNaturalVal, findPostController); // Возврат записи по идентификатору
// postsRout.post("/", ...postValidators, createPostController); // Создание записи
// postsRout.delete("/:id", idNaturalVal, adminMiddleware,  delPostController); // Удаление записи
// postsRout.put("/:id", idNaturalVal, ...postValidators, putPostController); // Изменение записи
