

export const ApiUrl = process.env.API_URL
const ApiPort = `:${process.env.API_PORT}`
const ApiAuthPort = `:${process.env.API_AUTH_PORT}`
const ApiBasketPort = `:${process.env.API_BASKET_PORT}`

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
  getCity: `${ApiUrl}${ApiPort}${UrlApi.getCity}`,
  getCategory: `${ApiUrl}${ApiPort}${UrlApi.getCategory}`,
  getPopulatesId: `${ApiUrl}${ApiPort}${UrlApi.getPopulatesId}`,
  getProducts: `${ApiUrl}${ApiPort}${UrlApi.getProducts}`,
  getProductSpecificationsById: `${ApiUrl}${ApiPort}${UrlApi.getProductSpecificationsById}`,
  getProductReviewsById: `${ApiUrl}${ApiPort}${UrlApi.getProductReviewsById}`,

  getBasketApi: `${ApiUrl}${ApiBasketPort}${UrlApi.getBasketApi}`,
  getOrderApi: `${ApiUrl}${ApiBasketPort}${UrlApi.getOrderApi}`,

  getUserInfoApi: `${ApiUrl}${ApiAuthPort}${UrlApi.getUserInfoApi}`,

  getUserUrlGoogle: `${ApiUrl}${ApiAuthPort}${UrlApi.getUserUrlGoogle}`,
  getUserAuthGoogle: `${ApiUrl}${ApiAuthPort}${UrlApi.getUserAuthGoogle}`,

  getUserSmsUrl: `${ApiUrl}${ApiAuthPort}${UrlApi.getUserSmsUrl}`,
  getUserSmsAuth: `${ApiUrl}${ApiAuthPort}${UrlApi.getUserSmsAuth}`,

  getUserRefreshTokenApi: `${ApiUrl}${ApiAuthPort}${UrlApi.getUserRefreshTokenApi}`,
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
