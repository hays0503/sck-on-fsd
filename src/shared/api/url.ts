

export const ApiUrl = "http://pimenov.kz:8888";

const UrlApi = {
  //Запрос всех городов
  getCity: `/api/v1/citys/`,
  getCategory: `/api/v1/category/`,
  getPopulatesId: `/api/v1/populates/`,
  getProducts: `/api/v1/products/`,
  getProductSpecificationsById: `/api/v1/specif/`,
  getProductReviewsById: `/api/v1/reviews/filter_by_prod/`,

  getBasketApi: `/basket_api/v1/bascket`,
  getOrderApi: `/basket_api/v1/order`,

  getUserInfoApi: `/auth_api/v1/user/info`,
  getUserRefreshTokenApi: `/auth_api/v1/token/refresh`,

  getUserUrlGoogle: `/auth_api/v1/auth_user/login/google`,
  getUserAuthGoogle: `/auth_api/v1/auth_user/auth/google`,

  getUserSmsUrl: `/auth_api/v1/auth_user/login/phone`,
  getUserSmsAuth: `/auth_api/v1/auth_user/auth/phone`,

};

const UrlApiWithDomain = {
  getCity: `${ApiUrl}${UrlApi.getCity}`,
  getCategory: `${ApiUrl}${UrlApi.getCategory}`,
  getPopulatesId: `${ApiUrl}${UrlApi.getPopulatesId}`,
  getProducts: `${ApiUrl}${UrlApi.getProducts}`,
  getProductSpecificationsById: `${ApiUrl}${UrlApi.getProductSpecificationsById}`,
  getProductReviewsById: `${ApiUrl}${UrlApi.getProductReviewsById}`,

  getBasketApi: `${ApiUrl}${UrlApi.getBasketApi}`,
  getOrderApi: `${ApiUrl}${UrlApi.getOrderApi}`,

  getUserInfoApi: `${ApiUrl}${UrlApi.getUserInfoApi}`,

  getUserUrlGoogle: `${ApiUrl}${UrlApi.getUserUrlGoogle}`,
  getUserAuthGoogle: `${ApiUrl}${UrlApi.getUserAuthGoogle}`,

  getUserSmsUrl: `${ApiUrl}${UrlApi.getUserSmsUrl}`,
  getUserSmsAuth: `${ApiUrl}${UrlApi.getUserSmsAuth}`,

  getUserRefreshTokenApi: `${ApiUrl}${UrlApi.getUserRefreshTokenApi}`,
};

const revalidateDefault = 60;

const UrlRevalidate = {
  getCity: {
    next: {
      tags: [`/api/v1/citys/`],
      revalidate: revalidateDefault,
    },
  },
  getCategory: {
    next: {
      tags: [`/api/v1/category/`],
      revalidate: revalidateDefault,
    },
  },
  getPopulatesId: {
    next: {
      tags: [`/api/v1/populates/`],
      revalidate: revalidateDefault,
    },
  },
  getProducts: {
    next: {
      tags: [`/api/v1/product/`],
      revalidate: revalidateDefault,
    },
  },
  getProductSpecificationsById: {
    next: {
      tags: [`/api/v1/specifications/`],
      revalidate: revalidateDefault,
    },
  },
  getProductReviewsById: {
    next: {
      tags: [`/api/v1/reviews/`],
      revalidate: revalidateDefault,
    },
  },
};

export { UrlApiWithDomain, UrlApi, UrlRevalidate };
