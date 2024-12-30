"use client"

import * as React from "react";
import {useMediaQuery} from "@/hooks/use-media-query";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Toolbar from "@/components/blocks/toolbar";
import ContactForm from "@/components/blocks/contact-form";

export function ContactDrawerDialog() {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const title = '';
    const description = '';

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Toolbar open={open}/>
                </DialogTrigger>
                <DialogContent className="max-w-[370px] p-6">
                    <DialogHeader className={'gap-6 pb-6'}>
                        <DialogTitle className={'text-center text-primary'}>Leave us a message</DialogTitle>
                        <DialogDescription className={'text-center'}>
                            Please enter your details below
                        </DialogDescription>
                    </DialogHeader>
                    <div className={'flex flex-col gap-4'}>
                        <ContactForm/>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen} direction={'bottom'}>
            <DrawerTrigger asChild>
                <Toolbar open={open}/>
            </DrawerTrigger>
            <DrawerContent className={'bg-background text-foreground px-4 pb-4'}>
                <DrawerHeader className={'gap-6 py-6'}>
                    <DrawerTitle className={'text-center text-primary'}>{title}</DrawerTitle>
                    <DrawerDescription className={'text-center'}>
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                <div className={'flex flex-col gap-4'}>
                    <ContactForm/>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
