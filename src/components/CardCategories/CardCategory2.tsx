import { IMAGE_PREFIX } from "@/app/api";
import NcImage from "@/shared/NcImage/NcImage";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { FC } from "react";

export interface CardCategory2Props {
  className?: string;
  ratioClass?: string;
  bgClass?: string;
  featuredImage?: string | StaticImageData;
  name: string;
  desc: string;
  id?: number;
}

const CardCategory2: FC<CardCategory2Props> = ({
  className = "",
  ratioClass = "aspect-w-1 aspect-h-1",
  bgClass = "bg-orange-50",
  featuredImage = "N2ZOD2945Z41CM6JAVTX6F70PDZ5G4EAU98V9ABF23YR8RXPNRMYTSRPX6M192YA5BQL0N5O9PBTVJP9X3CWUA5HBNYEBNPGP94Vpc_ver_1.png",
  name = "",
  desc = "",
  id = null,
}) => {
  return (
    <Link
      href={{
        pathname: "/collection",
        query: { categoryName: name, categoryId: id },
      }}
      className={`nc-CardCategory2 ${className}`}
      data-nc-id="CardCategory2"
    >
      <div
        className={`flex-1 relative w-full h-0 rounded-2xl overflow-hidden group ${ratioClass} ${bgClass}`}
      >
        <div className="pt-14">
          <NcImage
            alt=""
            //containerClassName="w-full h-full flex justify-center"
            containerClassName="flex aspect-w-12 aspect-h-0 w-full h-full"
            //src={featuredImage}
            src={`${IMAGE_PREFIX}/${featuredImage}`}
            //src={defaultImage}
            className="object-cover rounded-2xl"
            sizes="400px"
          />
        </div>
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity rounded-2xl"></span>
      </div>
      <div className="mt-5 flex-1 text-center">
        <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-semibold">
          {name}
        </h2>
        <span className="block mt-0.5 sm:mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          {desc}
        </span>
      </div>
    </Link>
  );
};

export default CardCategory2;
