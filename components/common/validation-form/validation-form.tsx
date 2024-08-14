'use client'
import {ChangeEvent, FocusEvent, ReactNode, useCallback, useEffect, useState} from "react";
import {z} from "zod";

import {useFormState} from "react-dom";
import { ErrorsModel } from "@/models/errors.model";
import { ResponseModel } from "@/models/response.model";
import formatZodIssues from "@/integration/zod/helpers/formet-zod-issues.helper";
import errorHandler from "@/helpers/error-handler.helper";

export type TouchedModel<T> = {
    [K in keyof T]: boolean;
};

export default function ValidationForm<T extends object>(
    {
        initialValue,
        children,
        zodResolver,
        action,
    }:
        {
            initialValue: T,
            children: (
                values: T,
                errors: ErrorsModel<T>,
                touched: TouchedModel<T>,
                state: ResponseModel,
                handleAction: (payload: FormData) => void,
                handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
                handleBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
                resetForm: () => void) => ReactNode,
            zodResolver: z.ZodObject<any>,
            action: ((prevState: any, formData: FormData) => Promise<ResponseModel>),
        }
) {
    const resetForm = useCallback(() => {
            setValues(initialValue);
            setTouched({} as TouchedModel<T>);
        }
    ,[initialValue]);
    const markAllTouched = () => {
        let obj: any = {};
        Object.keys(initialValue).forEach(key =>
            obj[key] = true
        );

        setTouched(obj);
    }
    const formAction = async (prevState: ResponseModel, formData: FormData) => {
        markAllTouched();

        const parseResult = zodResolver.safeParse(values);

        if (!parseResult.success) {
            const errors = formatZodIssues(parseResult.error.issues);
            setErrors(errors);
            return errorHandler(parseResult.error);
        }

        return await action(prevState, formData);
    }
    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()

        const controlName = e.target.name;

        setTouched({...touched, [controlName]: true});
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();

        const controlName = e.target.name;
        setValues({...values, [controlName]: e.target.value});
    }

    const [values, setValues] = useState(initialValue);
    const [errors, setErrors] = useState<ErrorsModel<T>>({} as ErrorsModel<T>);
    const [touched, setTouched] = useState<TouchedModel<T>>({} as TouchedModel<T>);
    const [state, handleAction] = useFormState(formAction, {} as ResponseModel);

    useEffect(() => {
        const parseResult = zodResolver.safeParse(values);

        let errors: ErrorsModel<any> = {};

        if (!parseResult.success) {
            const issues = parseResult.error.issues;
            errors = formatZodIssues(issues)
        }

        setErrors(errors);
    }, [values,zodResolver]);

    useEffect(() => {
        if (state.status === 'success') resetForm();
    }, [state, resetForm]);

    return <>
        {children(values, errors, touched, state, handleAction, handleChange, handleBlur, resetForm)}
    </>
}
