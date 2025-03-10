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
