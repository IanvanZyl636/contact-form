'use client'
import {useEffect, useState} from "react";

export default function LastPassFix({children}: { children: any }) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return isClient ?
        (<>{children}</>) :
        <></>
}