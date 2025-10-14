import {TypeUserFields} from "../../../present/routes/users/types/usersTypes";
import {TypeSortDir} from "../../../present/types/queryTypes";
import {ProtoFilterType} from "../../../tools/types/typePFilt";
import {UserDbType} from "../../types/usersDbTypes";
import {joinFilters} from "../../tools/methodsFilter";
import {createSorter} from "../../tools/createSorter";
import {usersColl} from "../../db";


export const usersQueryRep = {
    async readAll(es: number, ps: number, sb: TypeUserFields, sd: TypeSortDir, stf: ProtoFilterType<UserDbType>[]): Promise<[number, UserDbType[]]> {
        const filter = joinFilters<UserDbType>(stf, "or"), // Создание поискового фильтра
        sorter = createSorter(sb, sd); // Создание сортировщика
        
        return Promise.all([usersColl.count(filter), // Извлечение количества элементов удовлетворяющих поисковому фильтру
            usersColl.find(filter).sort(sorter).skip(es).limit(ps).toArray()]); // Извлечение нужной порции пользователей удовлетворяющих поисковому фильтру
    } // Извлечение всех пользователей
}; // Работа с базой данных на чтение пользователей
