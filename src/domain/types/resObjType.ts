type successResult<T> = {
    isSuccess: true, // Если успех
    ent: T // Возвращаемая сущность
}; // Успешный результат
type errorResult = {
    isSuccess: false, // Если ошибка
    errField: string // В каком поле/свойстве входной модели имеется ошибка
}; // Результат ошибки

export type DomResObj<T> = successResult<T> | errorResult; // Тип объекта результата
