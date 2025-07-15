import {MongoClient} from "mongodb";
import {SET} from "../settings";


const client = new MongoClient(SET.MongoURI); // Инициализация монгоБД
export const db = client.db("guilds"); // Обращение к БД гильдий

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
