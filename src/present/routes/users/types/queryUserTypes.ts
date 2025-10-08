import {QueryInputModel, TypeSearchTerm} from "../../../types/queryTypes";
import {TypeUserFields} from "./usersTypes";


export type QueryUserInputModel = QueryInputModel & {
    sortBy: TypeUserFields, // Входящее поле сортировки
    searchLoginTerm: TypeSearchTerm, // Входящий поисковый термин для входа; максимальная длина: 10
    searchEmailTerm: TypeSearchTerm // Входящий поисковый термин для почты; максимальная длина: 254
}; // Входная модель пользователя для запроса с вопросом
