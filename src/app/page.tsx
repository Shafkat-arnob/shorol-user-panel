import { RootCategoryId } from "@/Constant";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import { getAllProductList, getCategoryListByParentId, getNewArrivalProductList } from "./api";


const getCategories = async () => {
  var res = await getCategoryListByParentId({categoryId:RootCategoryId});
  return res.data;
}

const getAllProducts = async () => {
  var res = await getAllProductList();
  return res.data;
}

const getNewArrivals = async () => {
  var res = await getNewArrivalProductList();
  return res.data;
}

async function PageHome () {

  const categoryList = await getCategories();
  const newArrivalList = await getNewArrivals();
  const productList = await getAllProducts(); 
  

  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* <SectionHero2 /> */}

      <SectionHero2 />

      {/* <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div> */}



      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">

        <SectionSliderCategories categoryList={categoryList} />

        {
          newArrivalList &&
          <SectionSliderProductCard
          data={newArrivalList}
        />
        }

        {
          productList &&
          <SectionSliderProductCard
          // data={[
          //   PRODUCTS[4],
          //   SPORT_PRODUCTS[5],
          //   PRODUCTS[7],
          //   SPORT_PRODUCTS[1],
          //   PRODUCTS[6],
          // ]}
          heading="Products"
          data={productList}
        />
        }

        
        {/* <SectionPromo1 /> */}

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        {/* <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        /> */}

        <SectionPromo2 />

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
