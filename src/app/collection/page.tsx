"use client";

import useCategoryStore from "@/Store/categoryStore";
import useColorStore from "@/Store/colorStore";
import useProductStore from "@/Store/productStore";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PageCollection = ({}) => {
  const name = useSearchParams().get("categoryName");
  const id = useSearchParams().get("categoryId");

  const {
    getAllList,
    list,
    getProductByFilters,
    loading: productsLoading,
  } = useProductStore((state) => state);

  const { subCategoryList, getListByParentId, loading } = useCategoryStore(
    (state) => state
  );

  const { list: colorList, getAllList: getAllColorList } = useColorStore(
    (state) => state
  );

  useEffect(() => {
    //getAllList();
    getListByParentId(id);
    getAllColorList();
  }, [name, id]);

  useEffect(() => {
    getProductByFilters({
      categoryName: subCategoryList?.map((item: any) => item.name).join(","),
      colorName: "",
    });
  }, [subCategoryList]);

  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {name}
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              {}
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* TABS FILTER */}
            <TabFilters
              subCategoryList={subCategoryList}
              colorList={colorList}
            />

            {/* LOOP ITEMS */}

            {!productsLoading && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                {list.map((item: any, index: number) => (
                  <ProductCard data={item} key={index} />
                ))}
              </div>
            )}

            {/* PAGINATION */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              {/* <Pagination /> */}
              {/* <ButtonPrimary>Show me more</ButtonPrimary> */}
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* <SectionSliderCollections /> */}
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* SUBCRIBES */}
        {/* <SectionPromo1 /> */}
      </div>
    </div>
  );
};

export default PageCollection;
