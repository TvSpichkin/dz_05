import {QueryInputModel} from "../../routTypes/queryTypes";
import {TypePostFields} from "./postsTypes";


export type QueryPostInputModel = QueryInputModel & {
    sortBy: TypePostFields // Входящее поле сортировки
}; // Входная модель записи для запроса с вопросом
