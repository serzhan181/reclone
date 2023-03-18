import { UserGroupIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import Image, { ImageProps } from "next/image";
import { ReactNode } from "react";

interface RoundedImageProps extends ImageProps {
  fallbackIcon?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export const RoundedImage = ({
  src,
  alt,
  fallbackIcon,
  size = "sm",
  className,
  ...props
}: RoundedImageProps) => {
  return (
    <div className="avatar">
      <div
        className={classNames(
          "relative rounded-full",
          {
            "w-8": size === "sm",
            "w-16": size === "md",
            "w-24": size === "lg",
          },
          className
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            // Fill, if no width and height given.s
            fill
            {...props}
          />
        ) : (
          <>
            {fallbackIcon ? (
              fallbackIcon
            ) : (
              <UserGroupIcon className="inset-0 aboslute" />
            )}
          </>
        )}
      </div>
    </div>
  );
};
