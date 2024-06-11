import Image from "next/image";
import Link from "next/link";

type CardType = {
  name: string;
  imgUrl: string;
  href: string;
};

export default function Card({ name, imgUrl, href }: CardType) {
  return (
    <Link href={href} className="m-auto rounded-xl border-gray-400 shadow-2xl">
      <div className="glass min-h-[200px] rounded-xl px-5 pb-5 pt-1 backdrop-blur-3xl">
        <div className="my-3">
          <h2 className="w-64 text-ellipsis whitespace-nowrap text-xl font-bold">
            {name}
          </h2>
        </div>
        <div>
          <Image
            className="max-h-[200px] min-h-[200px] rounded-lg shadow-lg"
            src={imgUrl}
            alt={name}
            width={260}
            height={160}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACgCAQAAABA+9rNAAABDUlEQVR42u3SgQAAAAgDsJ88wKQSCGFjWHcCqQiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIACIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgggiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIACIgAiIgAp8DQ0TO4VshFMEAAAAASUVORK5CYII="
            placeholder="blur"
          />
        </div>
      </div>
    </Link>
  );
}
