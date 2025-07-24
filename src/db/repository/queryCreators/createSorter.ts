import {Sort} from "mongodb";
import {TypeSortDir} from "../../../routes/types/queryTypes";


function dirSort(d: TypeSortDir): 1 | -1 {
    return d[3] ? -1 : 1;
} // Задание направления сортировки для БД


export function createSorter(sb: string, sd: TypeSortDir): Sort {
    const d: 1 | -1 = dirSort(sd), s = {[sb]: d};
    
    if(sb != "createdAt") s.createdAt = d; // Добавление второго сортировочного поля по дате создания
    
    return s;
} // Генерация сортировщика
