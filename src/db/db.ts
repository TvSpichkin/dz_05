import {MongoClient} from "mongodb";
import {SET} from "../settings";
import {BlogDbType} from "./types/blogsDbTypes";
import {PostDbType} from "./types/postsDbTypes";
import {UserDbType} from "./types/usersDbTypes";


const client = new MongoClient(SET.MongoURI); // Инициализация монгоБД
const db = client.db("guilds"); // Обращение к БД гильдий
export const blogsColl = db.collection<BlogDbType>("blogs"); // Коллекция сетевых журналов в БД
export const postsColl = db.collection<PostDbType>("posts"); // Коллекция записей в БД
export const usersColl = db.collection<UserDbType>("users"); // Коллекция пользователей в БД

export async function runDB() {
    try {
        await client.connect(); // Подключение данного сервера к базе данных
        console.log("Успешно подключено к монгоБД");
    } catch(e) {
        console.log("Не удалось подключиться к монгоБД: " + e);
        await client.close(); // Завершение подключения к БД
    }
} // Запуск базы данных

export async function stopDB() {
    await client.close(); // Завершение подключения к БД
    console.log("Успешно отключено от монгоБД");
} // Остановка базы данных
