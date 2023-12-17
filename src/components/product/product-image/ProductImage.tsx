import Image from 'next/image';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
  width?: number;
  height?: number;
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  style,
}: Props) => {
  const localSource = src
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : '/images/placeholder.jpg';

  return (
    <Image
      alt={alt}
      src={localSource}
      width={width ?? 300}
      height={height ?? 300}
      className={className}
      style={style}
    />
  );
};
