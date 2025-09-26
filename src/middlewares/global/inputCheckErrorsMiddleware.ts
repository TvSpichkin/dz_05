import {Request, Response, NextFunction} from "express";
import {validationResult, FieldValidationError} from "express-validator";
import {APIErrorResult} from "../../routes/routTypes/outputErrorsType";


export function inputCheckErrorsMiddleware(req: Request, res: Response<APIErrorResult>, next: NextFunction) {
    const Errors = validationResult(req); // Получение ошибок ввода данных
    
    if(!Errors.isEmpty()) {
        const arrE = Errors.array({onlyFirstError: true}) as FieldValidationError[]; // Создание массива ошибок
        
        res.status(400).json({
            errorsMessages: arrE.map(e => ({message: e.msg, field: e.path}))
        }); // Отправка ошибок ввода данных
    } else next(); // Передача управления дальше
} // Проверка ошибок у входных данных
