import {Filter, WithId} from "mongodb";
import {ProtoFilterType} from "../../tools/types/typePFilt";
import {LogicFiltOp} from "../types/typesRepDB";


function valueAssigner<T>(w: ProtoFilterType<T>["way"], v: ProtoFilterType<T>["value"]) {
    switch(w) {
        case 1:
            return {$regex: v, $options: "i"};
        default:
            return v;
    }
} // Присваивание значений

export function createFilter<T>(pf: ProtoFilterType<T>[]): Filter<T> {
    const f: Filter<T> = {};
    
    for(let i = 0; i < pf.length; i++) f[pf[i].key] = valueAssigner<T>(pf[i].way, pf[i].value); // Заполнение фильтра
    
    return f;
} // Генерация фильтра

export function joinFilters<T>(pf: ProtoFilterType<T>[], lo: LogicFiltOp): Filter<T> {
    const f: Filter<T> = {};
    
    if(pf.length > 1) f[`$${lo}`] = pf.map(p => ({[p.key]: valueAssigner<T>(p.way, p.value)})) as Filter<WithId<T>>[]; // Заполнение фильтра с объединением
    else if(pf.length) return createFilter<T>(pf); // Заполнение одиночного фильтра
    
    return f;
} // Объединение фильтров с заданным логическим оператором
