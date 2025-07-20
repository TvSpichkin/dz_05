import {Document, Filter, Sort} from "mongodb";
import {EntDbType, KeysDB, ProtoFilterType, TypeEntFields} from "../types/typesRepDB";


function valueAssigner(w: ProtoFilterType["way"], v: ProtoFilterType["value"]) {
    switch(w) {
        case 1:
            return {$regex: v, $options: "i"};
        default:
            return v;
    }
} // Присваивание значений

export function createFilter<T>(pf: ProtoFilterType<T>[]): Filter<T> {
    const f: Filter<T> = {};
    
    for(let i = 0; i < pf.length; i++) {
        f[pf[i].key] = valueAssigner(pf[i].way, pf[i].value); // Заполнение фильтра
    }
    
    return f;
} // Генерация фильтра
