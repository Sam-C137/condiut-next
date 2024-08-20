import { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
    className?: string;
    src: string | undefined;
    alt: string;
    size?: number;
}

const Avatar = ({ src, alt, size, className }: AvatarProps) => {
    return (
        <Image
            src={src || ""}
            alt={alt}
            width={size || 24}
            height={size || 24}
            className={cn("rounded-full", className)}
        />
    );
};

export default Avatar;
