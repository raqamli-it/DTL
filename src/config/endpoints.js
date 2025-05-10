export const endpoints = {
  xodimlar: "/employees/",
  yangiliklar: "/news/",
  yangiliklar_boshsahifa: "/news/latest/",
  newsById: (id) => `/news/${id}/`,
  statistika: "/regions/statistics/",
  foydalisaytlar: "/useful-link/",
  oxirtgifoydalisaytlar: "/useful-link/latest/",

  topSozlarById: (id) => `/top-search/${id}/`,
  topSozlar: "/top-search/",
  project: "/publications/",
  contact: "/contact/create/",
  contactData: `/contact/about/`,

  projectCategories: "/project/categories/",
  projectCategoriesById: (id) => `/project/category/${id}/`,
  // sites: "/useful-sites/",
  // slides: "/sliders/",
};
