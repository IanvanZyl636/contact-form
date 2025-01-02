'use client'

import {useContext} from "react";
import {OrientationContext} from "@/components/global/orientation.provider";
import {OrientationType} from "@/constants/orientation-type";

export function useAspectRatioOrientation(ratio:number) {
    const context = useContext(OrientationContext);

    if (!context) {
        throw new Error('useOrientation must be used within an OrientationProvider');
    }

    const currentRatio = context.width / (context.height - 75);

    return currentRatio < ratio ? OrientationType.portrait : OrientationType.landscape;
}