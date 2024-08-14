import {ErrorsModel} from "@/models/errors.model";

export interface ResponseModel {
    status:'success' | 'error'
    errors?:ErrorsModel<any>,
    message?:string
}
