const DEFAULT_IMAGE =
  'https://new-projects-media.propertyfinder.com/project/acdb665a-9faf-4331-9d3c-58d14844de24/gallery/image/yUZZ1gHTzOYpmPVqenaFN1MG0xW-CJV8PZ6nVkzIqu4=/medium.webp';

function ImageListing({
  imageUrl = DEFAULT_IMAGE,
  imageName = 'Default Image',
}: {
  imageUrl?: string;
  imageName?: string;
}) {
  return (
    <div className="w-full sm:w-48 h-32 flex-shrink-0">
      <img
        src={imageUrl}
        alt={imageName}
        className="w-full h-full object-cover rounded-lg"
        onError={(e) => {
          (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
        }}
      />
    </div>
  );
}

export default ImageListing;
