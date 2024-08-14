import formatZodIssues from "@/integration/zod/helpers/formet-zod-issues.helper";
import {ResponseModel} from "@/models/response.model";

export default function errorHandler(error:any) {
    if(error.name === 'ZodError'){
        const actionErrorResponse:ResponseModel = {
            status:'error',
            errors:formatZodIssues(error.issues)
        }

        return actionErrorResponse;
    }

    const actionErrorResponse:ResponseModel = {
        status:'error',
        message:error.message
    }

    return actionErrorResponse;
}
