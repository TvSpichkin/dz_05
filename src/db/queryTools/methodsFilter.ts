import {Filter, WithId} from "mongodb";
import {ProtoFilterType, LogicFiltOp} from "../types/typesRepDB";


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
