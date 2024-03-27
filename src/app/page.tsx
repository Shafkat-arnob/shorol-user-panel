import { RootCategoryId } from "@/Constant";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import {
  getAllProductList,
  getCategoryListByParentId,
  getNewArrivalProductList,
} from "./api";

const getCategories = async () => {
  try {
    var res = await getCategoryListByParentId({ categoryId: RootCategoryId });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getAllProducts = async () => {
  try {
    var res = await getAllProductList();
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getNewArrivals = async () => {
  try {
    var res = await getNewArrivalProductList();
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

async function PageHome() {
  const categoryList = await getCategories();
  const newArrivalList = await getNewArrivals();
  const productList = await getAllProducts();

  // const categoryList = []
  // const newArrivalList = []
  // const productList = []

  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* <SectionHero2 /> */}

      <SectionHero2 />

      {/* <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div> */}

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        {/* <SectionSliderCategories /> */}

        {newArrivalList && <SectionSliderProductCard data={newArrivalList} />}

        {productList && (
          <SectionSliderProductCard heading="Products" data={productList} />
        )}

        {/* <SectionPromo1 /> */}

        {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div> */}

        {/* <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        /> */}

        {/* <SectionPromo2 /> */}

        <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>

        {/* 
        
        <SectionSliderLargeProduct cardStyle="style2" />


         <SectionPromo3 />

        <SectionGridFeatureItems />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div>

        <SectionClientSay /> 
        
        */}
      </div>
    </div>
  );
}

export default PageHome;
