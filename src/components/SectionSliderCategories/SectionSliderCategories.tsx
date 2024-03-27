"use client";

import Heading from "@/components/Heading/Heading";
import { FC, useEffect, useRef, useState } from "react";
// @ts-ignore
import department1Png from "@/images/collections/department1.png";
import department2Png from "@/images/collections/department2.png";
import department3Png from "@/images/collections/department3.png";
import department4Png from "@/images/collections/department4.png";
import { StaticImageData } from "next/image";
import Link from "next/link";

import { RootCategoryId } from "@/Constant";
import useCategoryStore from "@/Store/categoryStore";
import { getCategoryListByParentId } from "@/app/api";
import Glide from "@glidejs/glide";

import useCustomQuery from "@/hooks/useCustomQuery";
import CardCategory2 from "../CardCategories/CardCategory2";

export interface CardCategoryData {
  name: string;
  desc: string;
  img: string | StaticImageData;
  color?: string;
}
const CATS: CardCategoryData[] = [
  {
    name: "Travel Kits",
    desc: "20+ categories",
    img: department1Png,
    color: "bg-indigo-100",
  },
  {
    name: "Beauty Products",
    desc: "10+ categories",
    img: department2Png,
    color: "bg-slate-100",
  },
  {
    name: "Sport Kits",
    desc: "34+ categories",
    img: department3Png,
    color: "bg-sky-100",
  },
  {
    name: "Pets Food",
    desc: "12+ categories",
    img: department4Png,
    color: "bg-orange-100",
  },
];
export interface SectionSliderCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  data?: CardCategoryData[];
  categoryList?: listProps[];
}

export interface listProps {
  name?: string | null;
  description?: string | null;
  image?: object | null;
  icon?: object | null;
}

const SectionSliderCategories: FC<SectionSliderCategoriesProps> = ({
  heading = "Shop by Category",
  subHeading = "",
  className = "",
  itemClassName = "",
  data = [],
}) => {
  console.log("render count");

  const sliderRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const getListByParentId = useCategoryStore(
    (state) => state.getListByParentId
  );
  const loading = useCategoryStore((state) => state.loading);
  data = useCategoryStore((state) => state.list);

  const [list, setList] = useState([]);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4,
        },
        1024: {
          gap: 20,
          perView: 3.4,
        },
        768: {
          gap: 20,
          perView: 3,
        },
        640: {
          gap: 20,
          perView: 2.3,
        },
        500: {
          gap: 20,
          perView: 1.4,
        },
      },
    };

    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  // useEffect(()=> {
  //   getListByParentId(RootCategoryId);
  // },[]);

  useEffect(() => {
    //getList();
  }, []);

  const getList = async () => {
    try {
      const response = await getCategoryListByParentId({
        categoryId: RootCategoryId,
      });
      console.log(response);
      setList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: categoryList,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCustomQuery({
    queryKey: ["allCategories"],
    queryFn: () =>
      getCategoryListByParentId({
        categoryId: RootCategoryId,
      }),
    rest: {
      onSuccess: (response: any) => {
        setList(response);
        console.log(response);
      },
    },
  });

  return (
    <div className={`nc-SectionSliderCategories ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading desc={subHeading} hasNextPrev>
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          {isCategoryLoading ? (
            <p>LOADING</p>
          ) : (
            <ul className="glide__slides">
              {list?.map((item: any, index: number) => (
                <li key={index} className={`glide__slide ${itemClassName}`}>
                  <CardCategory2
                    featuredImage={item.image?.url}
                    name={item.name}
                    desc={item.description}
                    id={item.id}
                  />
                </li>
              ))}
              <li className={`glide__slide ${itemClassName}`}>
                <div
                  className={`flex-1 relative w-full h-0 rounded-2xl overflow-hidden group aspect-w-1 aspect-h-1 bg-slate-100`}
                >
                  <div>
                    <div className="absolute inset-y-6 inset-x-10 flex flex-col sm:items-center justify-center">
                      <div className="flex relative text-slate-900">
                        <span className="text-lg font-semibold ">
                          More collections
                        </span>
                        <svg
                          className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M12 20.4999V3.66992"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-sm mt-1 text-slate-800">
                        Show me more
                      </span>
                    </div>
                  </div>
                  <Link
                    href={{ pathname: "/collection" }}
                    className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"
                  ></Link>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionSliderCategories;
