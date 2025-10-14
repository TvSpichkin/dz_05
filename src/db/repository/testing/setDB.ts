import {DBType} from "../../types/typesRepDB";
import {blogsColl, postsColl} from "../../db";


export async function setDB(dataset?: DBType) {
    await blogsColl.drop(); // Отчистка массива сетевых журналов
    await postsColl.drop(); // Отчистка массива записей
    // Если в функцию ничего не передано - то очищаем базу данных
    if(dataset) { // Если что-то передано - то заменяем старые значения новыми
        if(dataset.blogs.length) await blogsColl.insertMany(dataset.blogs);
        if(dataset.posts.length) await postsColl.insertMany(dataset.posts);
    }
} // Функция перезаписи БД
