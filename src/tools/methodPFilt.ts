import {ProtoFilterType} from "./types/typePFilt";


export function getPFilt<T>(k: ProtoFilterType<T>["key"], v: ProtoFilterType<T>["value"], w: ProtoFilterType<T>["way"]): ProtoFilterType<T> {
    return {key: k, value: v, way: w};
} // Получение исходных данных для генерации фильтра
