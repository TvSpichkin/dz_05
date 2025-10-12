export type ProtoFilterType<T> = {
    key: keyof ((string extends keyof T ? T : any) & {id: number}), // Поле сущности в БД
    value: boolean | number | string, // Значение этого поля
    way: number // Способ задания условия для фильтра
}; // Типизация исходных данных для генерации фильтра
