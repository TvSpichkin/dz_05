import {BlogDbType} from "./blogsDbTypes";
import {PostDbType} from "./postsDbTypes";
import {UserDbType} from "./usersDbTypes";


export type DBType = {
    blogs: BlogDbType[], // Массив сетевых журналов
    posts: PostDbType[], // Массив записей
    users: UserDbType[] // Массив пользователей
}; // Типизация базы данных (что мы будем в ней хранить)
export type ProtoFilterType<T> = {
    key: keyof ((string extends keyof T ? T : any) & {id: number}), // Поле сущности в БД
    value: boolean | number | string, // Значение этого поля
    way: number // Способ задания условия для фильтра
}; // Типизация исходных данных для генерации фильтра

export type KeysDB = keyof DBType; // Ключи БД
export type keyIds = "id" | "blogId"; // Ключи идентификаторов от сущностей
export type LogicFiltOp = "and" | "nor" | "or"; // Тип возможных логических операторов для объединения фильтров
