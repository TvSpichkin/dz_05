import {ProtoFilterType} from "./types/typePFilt";


export function getPFilt<T>(k: ProtoFilterType<T>["key"], v: ProtoFilterType<T>["value"], w: ProtoFilterType<T>["way"] = 0): ProtoFilterType<T> {
    return {key: k, value: v, way: w};
} // Получение исходных данных для генерации фильтра

export function getSomePFilt<T>(...arg: Parameters<typeof getPFilt<T>>[]): ProtoFilterType<T>[] {
    return arg.map(pf => getPFilt(...pf));
} // Получение массива нескольких исходных данных для генерации фильтра
