import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.ComponentProps<"img"> {
  src: string;
  alt?: string;
  classContainer?: string;
  loaderClass?: string;
  children?: React.ReactNode;
}
const ImageLoader = (props: IProps) => {
  const { classContainer, className, loaderClass, children, ...others } = props;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const imgRef = useRef(null);

  useEffect(() => {
    if ((imgRef.current as HTMLImageElement | null)?.complete) {
      handleImageLoad();
    }
  }, []);

  return (
    <div className={twMerge("relative", classContainer)}>
      {!isImageLoaded && (
        <div
          className={twMerge(
            "skeleton absolute h-full w-full rounded-sm",
            className,
            loaderClass
          )}
        ></div>
      )}
      <img
        {...others}
        ref={imgRef}
        className={className}
        onLoad={() => {
          handleImageLoad();
        }}
      />
      {children}
    </div>
  );
};

export default ImageLoader;
