//========================= Gizmo Gear Constants ==========================// 

// Category 
export const RootCategoryId = 7; 

// Slider 
export const PageTypeNames = {
  MAIN_PAGE : "MAIN PAGE",
  CATEGORY_PAGE : "CATEGORY PAGE"
}


export const PageTypeValues = {
  MAIN_PAGE : "MAIN_PAGE",
  CATEGORY_PAGE : "CATEGORY_PAGE"
}

export const SliderTypeValues = {
  DEFAULT : "DEFAULT",
  DISCOUNT : "DISCOUNT"
}

export const PageTypeArr = [
  {
    name : PageTypeNames.MAIN_PAGE,
    value : PageTypeValues.MAIN_PAGE
  },
  {
    name : PageTypeNames.CATEGORY_PAGE,
    value : PageTypeValues.CATEGORY_PAGE
  }
]

export const SliderTypeArr = [
  {
    name : "Default",
    value : SliderTypeValues.DEFAULT
  },
  {
    name : "Discount",
    value : SliderTypeValues.DISCOUNT
  }
]