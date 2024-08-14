import {ZodIssue} from "zod";
import {ErrorsModel} from "@/models/errors.model";



export default function formatZodIssues(issues: ZodIssue[]){
    let errors:ErrorsModel<any> = {};
    issues.forEach((issue) => {
        const key = issue.path.join('.');
        if(!errors.hasOwnProperty(key)){
            errors = {...errors, [key]:issue.message}
        }
    })

    return errors;
}
