'use client'

import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {OrientationType} from "@/constants/orientation-type";

interface OrientationContextType {
    height:number;
    width:number;
    orientation: OrientationType;
}

export const OrientationContext = createContext<OrientationContextType | undefined>(undefined);

export default function OrientationProvider({ children }:{children?: ReactNode}){
    const [orientation, setOrientation] = useState<OrientationType>(OrientationType.portrait);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const updateOrientation = () => {
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);

            if (window.innerHeight > window.innerWidth) {
                setOrientation(OrientationType.portrait);
            } else {
                setOrientation(OrientationType.landscape);
            }
        };

        updateOrientation();

        window.addEventListener('resize', updateOrientation);

        return () => {
            window.removeEventListener('resize', updateOrientation);
        };
    }, []);

    return (
        <OrientationContext.Provider value={{
            height,
            width,
            orientation
        }}>
            {children}
        </OrientationContext.Provider>
    );
}