import { RootCategoryId } from "@/Constant";
import { getCategoryListByParentId } from "@/app/api";
import useCustomQuery from "@/hooks/useCustomQuery";
import { useState } from "react";
import NavigationItem from "./NavigationItem";

function Navigation() {
  const [navigationList, setNavigationList] = useState([]);

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
        console.log(response);
        setNavigationList(
          response.map((item: any) => {
            return {
              id: item.id,
              href: "/collection",
              query: { categoryName: item.name, categoryId: item.id },
              name: item.name,
            };
          })
        );
      },
    },
  });

  return (
    <ul className="nc-Navigation flex items-center">
      {navigationList.map((item: any) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
