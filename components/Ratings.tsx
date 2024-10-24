import { IoStar, IoStarHalfOutline, IoStarOutline } from "react-icons/io5";

export function Ratings({ rating }: { rating: number }) {
  const totalStars = 5;
  const fullStars = Math.floor(rating); // full stars
  const hasHalfStar = rating % 1 !== 0; // check if there's a half star
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0); // remaining empty stars

  return (
    <ul className="mb-2 flex space-x-1 items-center text-yellow-500">
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <li key={`full-${index}`}>
          <IoStar />
        </li>
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <li>
          <IoStarHalfOutline />
        </li>
      )}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <li key={`empty-${index}`}>
          <IoStarOutline />
        </li>
      ))}
    </ul>
  );
}
