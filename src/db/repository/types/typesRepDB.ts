import {EnhancedOmit} from "mongodb";
import {BlogDbPutType, BlogDbType, BlogDbTypeA} from "./blogsDbTypes";
import {PostDbPutType, PostDbType, PostDbTypeA} from "./postsDbTypes";
import { TypeBlogFields } from "../../../routes/blogs/types/blogsTypes";


export type DBType = {
    blogs: BlogDbType[], // Массив сетевых журналов
    posts: PostDbType[] // Массив записей
}; // Типизация базы данных (что мы будем в ней хранить)
export type ProtoFilterType<T> = {
    key: keyof ((string extends keyof T ? T : any) & {id: number}), // Поле сущности в БД !!! Не понимаю, как работает эта ужасная типизация
    // keyof WithId<T> // keyof EnhancedOmit<T, "_id">
    // keyof (string extends keyof T ? T : T extends any ? Pick<T, Exclude<keyof T, "_id">> : never)
    value: boolean | number | string, // Значение этого поля
    way: number // Способ задания условия для фильтра
}; // Типизация исходных данных для генерации фильтра

export type KeysDB = keyof DBType; // Ключи БД
export type EntDbType = BlogDbType | PostDbType; // Тип сущности в БД
export type EntDbTypeA = BlogDbTypeA | PostDbTypeA; // Тип сущности при извлечении из БД агрегацией
export type DbTypeFind = EntDbTypeA | null; // Тип извлечённой сущности по идентификатору из БД
export type keyIds = "id" | "blogId"; // Ключи идентификаторов от сущностей
export type EntPutType = BlogDbPutType | PostDbPutType; // Тип изменения сущности в БД
