/**
 * @function ImageOutputRefactor
 * @param {ImageOutputRefactorProps} props
 * @returns {JSX.Element | null}
 *
 * This component renders an image with a circular shape and shadow, based on the provided `picture_url` prop.
 * If the `picture_url` is undefined or falsy, the component will return `null` and nothing will be rendered.
 * The image will be displayed inside a container with specific width and height for different screen sizes.
 *
 * @example
 * <ImageOutputRefactor picture_url="https://example.com/image.jpg" />
 */

interface ImageOutputRefactorProps {
  picture_url: string | undefined;
}

export default function ImageOutputRefactor({
  picture_url,
}: ImageOutputRefactorProps) {
  if (!picture_url) return null;

  return (
    <div className="w-24 h-24 md:w-32 md:h-32 object-cover mx-auto flex justify-center items-center ">
      <img
        src={picture_url}
        alt="profile"
        className="rounded-full shadow-xl w-full h-full object-cover border-4 border-white"
      />
    </div>
  );
}
