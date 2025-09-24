export enum SortDirections {
    asc = "asc", // По возрастанию
    desc = "desc" // По убыванию
}; // Направление сортировки

export type TypeSortDir = keyof typeof SortDirections; // Тип направления сортировки
export type TypeSearchTerm = string | undefined; // Тип поискового термина

export type QueryInputModel = {
    sortDirection: TypeSortDir, // Входящее направление сортировки
    pageNumber: number, // Количество частей, которые должны быть возвращены
    pageSize: number // Размер порции, который должен быть возвращен
}; // Базовая входная модель для запроса с вопросом
