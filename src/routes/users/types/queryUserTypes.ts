import {QueryInputModel, TypeSearchTerm} from "../../types/queryTypes";
import {TypeUserFields} from "./usersTypes";


export type QueryUserInputModel = QueryInputModel & {
    sortBy: TypeUserFields, // Входящее поле сортировки
    searchLoginTerm: TypeSearchTerm, // Входящий поисковый термин для входа; максимальная длина: 10, минимальная длина: 3, шаблон: ^[a-zA-Z0-9_-]*$, должен быть уникальным
    searchEmailTerm: TypeSearchTerm // Входящий поисковый термин для почты; шаблон: ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$, должна быть уникальной
}; // Входная модель пользователя для запроса с вопросом
