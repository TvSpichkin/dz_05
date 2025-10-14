import {DBType} from "../../types/typesRepDB";
import {blogsColl, postsColl, usersColl} from "../../db";


export async function setDB(dataset?: DBType) {
    await blogsColl.drop(); // Отчистка массива сетевых журналов
    await postsColl.drop(); // Отчистка массива записей
    await usersColl.drop(); // Отчистка массива пользователей
    // Если в функцию ничего не передано - то просто очищаем базу данных
    if(dataset) { // Если что-то передано - то заменяем старые значения новыми
        if(dataset.blogs.length) await blogsColl.insertMany(dataset.blogs); // Запись массива сетевых журналов
        if(dataset.posts.length) await postsColl.insertMany(dataset.posts); // Запись массива записей
        if(dataset.users.length) await usersColl.insertMany(dataset.users); // Запись массива пользователей
    }
} // Функция перезаписи БД
