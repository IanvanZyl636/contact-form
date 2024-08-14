'use client'

import contactUsSchema, {contactUsModel} from "@/integration/zod/schemas/contact-us.schema"
import ValidationForm from "../common/validation-form/validation-form"
import {ResponseModel} from "@/models/response.model";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import TextParagraph from "@/components/ui/typography/text-paragraph";
import * as React from "react";
import {displayPhoneNumber, phoneNumber} from "@/app/config";

export default function ContactForm() {
    function SubmitContactUs(prevState: any, formData: FormData): Promise<ResponseModel> {
        throw new Error("Function not implemented.")
    }

    return (<ValidationForm<contactUsModel>
        initialValue={
            {
                fullName: '',
                email: '',
                phoneNumber: '',
                message: ''
            }
        }
        zodResolver={contactUsSchema}
        action={SubmitContactUs}
    >
        {
            (
                values,
                errors,
                touched,
                state,
                handleAction,
                handleChange,
                handleBlur,
                resetForm
            ) => {
                return (
                    <>
                        <form action={handleAction} onReset={resetForm}>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <Input
                                        type={'text'}
                                        name={'fullName'}
                                        id={'fullName'}
                                        placeholder={'Full name'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fullName}
                                        error={touched.fullName && !!errors.fullName}
                                    />
                                    {
                                        (touched.fullName && !!errors.fullName) ?
                                            <span
                                                className={'text-destructive text-sm'}>{errors.fullName}</span> : <></>
                                    }
                                </div>
                                <div>
                                    <Input
                                        type={'text'}
                                        name={'email'}
                                        id={'email'}
                                        placeholder={'Email'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        error={touched.email && !!errors.email}
                                    />
                                    {
                                        (touched.email && !!errors.email) ?
                                            <span className={'text-destructive text-sm'}>{errors.email}</span> : <></>
                                    }
                                </div>
                                <div>
                                    <Input
                                        name={'phoneNumber'}
                                        id={'phoneNumber'}
                                        placeholder={'Phone no.'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phoneNumber}
                                        error={touched.phoneNumber && !!errors.phoneNumber}
                                    />
                                    {
                                        (touched.phoneNumber && !!errors.phoneNumber) ?
                                            <span
                                                className={'text-destructive text-sm'}>{errors.phoneNumber}</span> : <></>
                                    }
                                </div>
                                <div>
                                    <div>
                                        <Textarea
                                            name={'message'}
                                            id={'message'}
                                            placeholder={'Message'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.message}
                                            error={touched.message && !!errors.message}
                                        />
                                    </div>
                                    {
                                        (touched.message && !!errors.message) ?
                                            <span className={'text-destructive text-sm'}>{errors.message}</span> : <></>
                                    }
                                </div>
                            </div>
                        </form>
                        <Button type={'submit'}>Call me back</Button>
                        <Separator orientation={'horizontal'}/>
                        <TextParagraph className={'text-center font-semibold'}>Or you can call us on <a
                            href={`tel:${phoneNumber}`}><b className={'text-primary'}>{displayPhoneNumber}</b></a></TextParagraph>
                    </>
                )
            }
        }
    </ValidationForm>)
}
