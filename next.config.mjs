import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */



const nextConfig = {

  reactStrictMode: true,
  productionBrowserSourceMaps: true,


  experimental: {
    turbo: {
      rules: {
        "*.scss": {
          loaders: [`sass-loader`],
          as: `*.css`,
        },
      },
    },
  },
  pageExtensions: [`mdx`, `md`, `jsx`, `js`, `tsx`, `ts`],
  
  async redirects() {
    return [
      {
        source: `/`,
        destination: `/ru/city/Astana/main`,
        permanent: true,
      },
      {
        source: `/:lang/city/:city/catalog/menu`,
        destination: `/:lang/city/:city/catalog/menu/main`,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Запрос городов
      {
        source: `/api/v1/citys`,
        destination: `http://${process.env.API_URL}/api/v1/citys/`,
      },
      // Запрос категории
      {
        source: `/api/v1/category`,
        destination: `http://${process.env.API_URL}/api/v1/category/`,
      },
      //Список всех популярных продуктов
      {
        source: `/api/v1/populates`,
        destination: `http://${process.env.API_URL}/api/v1/populates/`,
      },
      // Список всех продуктов
      {
        source: `/api/v1/products`,
        destination: `http://${process.env.API_URL}/api/v1/products/`,
      },
      // Детали конкретного продукта по его слагу
      {
        source: `/api/v1/products/:slug_prod`,
        destination: `http://${process.env.API_URL}/api/v1/products/:slug_prod/`,
      },
      // Фильтрация продуктов по категории
      {
        source: `/api/v1/products/filter_by_cat/:slug_cat`,
        destination:
          `http://${process.env.API_URL}/api/v1/products/filter_by_cat/:slug_cat/`,
      },
      // Получение списка слагов всех продуктов
      {
        source: `/api/v1/products/all/slugs`,
        destination: `http://${process.env.API_URL}/api/v1/products/all/slugs/`,
      },
      //Получение продуктов по списку идентификаторов
      {
        source: `/api/v1/products/by_ids/:ids`,
        destination: `http://${process.env.API_URL}/api/v1/products/by_ids/:ids/`,
      },
      //Фильтрация продуктов по различным параметрам
      {
        source: `/api/v1/products/set/filter`,
        destination: `http://${process.env.API_URL}/api/v1/products/set/filter/`,
      },
      // ревью (обзоры)
      {
        source: `/api/v1/reviews/filter_by_prod/:prod_pk`,
        destination:
          `http://${process.env.API_URL}/api/v1/reviews/filter_by_prod/:prod_pk/`,
      },
      //Спецификации на товар
      {
        source: `/api/v1/specif/filter_by_prod/:prod_pk`,
        destination: `http://${process.env.API_URL}/api/v1/specif/filter_by_prod/:prod_pk/`,
      },

      // Обработка картинок (проксирование)
      {
        source: `/media/product_images/:patch*`,
        destination: `http://${process.env.API_URL}:8000/media/product_images/:patch*/`,
      },

      // api корзины
      // Запрос данных их корзины
      {
        source: `/basket_api/v1/bascket/:url*`,
        destination: `http://${process.env.API_URL}:8777/basket_api/v1/bascket/:url*/`,
      },

      // api заказа
      {
        source: `/basket_api/v1/order/:url*`,
        destination: `http://${process.env.API_URL}:8777/basket_api/v1/order/:url*/`,
      },

      //api по работе с пользователем
      // Запрос данных пользователя (инфо)
      {
        source: `/auth_api/v1/user/info`,
        destination: `http://${process.env.API_URL}:8999/auth_api/v1/user/info`,
      },
      {
        source: `/auth_api/v1/token/refresh`,
        destination: `http://${process.env.API_URL}:8999/auth_api/v1/token/refresh`,
      },

      //api по работе с пользователем
      //Получение ссылки на авторизацию google
      {
        source: `/auth_api/v1/auth_user/login/google`,
        destination:
          `http://${process.env.API_URL}:8999/auth_api/v1/auth_user/login/google/`,
      },
      //api по работе с пользователем
      // Создаем пользователя через акаунт google
      {
        source: `/auth_api/v1/auth_user/auth/google`,
        destination: `http://${process.env.API_URL}:8999/auth_api/v1/auth_user/auth/google`,
      },

      //api по работе с пользователем
      //Endpoint для отправки sms-кода
      {
        source: `/auth_api/v1/auth_user/login/phone`,
        destination: `http://${process.env.API_URL}:8999/auth_api/v1/auth_user/login/phone`,
      },
      //api по работе с пользователем
      //Через данный endpoint будут выданы ключи доступа.
      {
        source: `/auth_api/v1/auth_user/auth/phone`,
        destination: `http://${process.env.API_URL}:8999/auth_api/v1/auth_user/auth/phone`,
      },
      //api по работе с пользователем
      //Endpoint для обновления токенов
      {
        source: `/auth_api/v1/token/refresh`,
        destination: `http://${process.env.API_URL}:8999/auth_api/v1/token/refresh`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
