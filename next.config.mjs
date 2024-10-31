import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.scss": {
          loaders: ["sass-loader"],
          as: "*.css",
        },
      },
    },
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ru/Astana/main",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Запрос городов
      {
        source: "/api/v1/citys",
        destination: "http://pimenov.kz/api/v1/citys/",
      },
      // Запрос категории
      {
        source: "/api/v1/category",
        destination: "http://pimenov.kz/api/v1/category/",
      },
      //Список всех популярных продуктов
      {
        source: "/api/v1/populates",
        destination: "http://pimenov.kz/api/v1/populates/",
      },
      // Список всех продуктов
      {
        source: "/api/v1/products",
        destination: "http://pimenov.kz/api/v1/products/",
      },
      // Детали конкретного продукта по его слагу
      {
        source: "/api/v1/products/:slug_prod",
        destination: "http://pimenov.kz/api/v1/products/:slug_prod/",
      },
      // Фильтрация продуктов по категории
      {
        source: "/api/v1/products/filter_by_cat/:slug_cat",
        destination:
          "http://pimenov.kz/api/v1/products/filter_by_cat/:slug_cat/",
      },
      // Получение списка слагов всех продуктов
      {
        source: "/api/v1/products/all/slugs",
        destination: "http://pimenov.kz/api/v1/products/all/slugs/",
      },
      //Получение продуктов по списку идентификаторов
      {
        source: "/api/v1/products/by_ids/:ids",
        destination: "http://pimenov.kz/api/v1/products/by_ids/:ids/",
      },
      //Фильтрация продуктов по различным параметрам
      {
        source: "/api/v1/products/set/filter",
        destination: "http://pimenov.kz/api/v1/products/set/filter/",
      },
      // ревью (обзоры)
      {
        source: "/api/v1/reviews/filter_by_prod/:prod_pk",
        destination:
          "http://pimenov.kz/api/v1/reviews/filter_by_prod/:prod_pk/",
      },
      //Спецификации на товар
      {
        source: "/api/v1/specif/filter_by_prod/:prod_pk",
        destination: "http://pimenov.kz/api/v1/specif/filter_by_prod/:prod_pk/",
      },

      // Обработка картинок (проксирование)
      {
        source: "/media/product_images/:patch*",
        destination: "http://pimenov.kz:8000/media/product_images/:patch*/",
      },

      // api корзины
      // Запрос данных их корзины
      {
        source: "/basket_api/v1/bascket/:uuid_id",
        destination: "http://pimenov.kz:8989/basket_api/v1/bascket/:uuid_id/",
      },

      // api заказа
      {
        source: "/basket_api/v1/order",
        destination: "http://pimenov.kz:8989/basket_api/v1/order/",
      },

      //api по работе с пользователем
      // Запрос данных пользователя (инфо)
      {
        source: "/auth_api/v1/user/info",
        destination: "http://pimenov.kz:8999/auth_api/v1/user/info",
      },
      {
        source: "/auth_api/v1/token/refresh",
        destination: "http://pimenov.kz:8999/auth_api/v1/token/refresh",
      },

      //api по работе с пользователем
      //Получение ссылки на авторизацию google
      {
        source: "/auth_api/v1/auth_user/login/google",
        destination:
          "http://pimenov.kz:8999/auth_api/v1/auth_user/login/google/",
      },
      //api по работе с пользователем
      // Создаем пользователя через акаунт google
      {
        source: "/auth_api/v1/auth_user/auth/google",
        destination: "http://pimenov.kz:8999/auth_api/v1/auth_user/auth/google",
      },

      //api по работе с пользователем
      //Endpoint для отправки sms-кода
      {
        source: "/auth_api/v1/auth_user/login/phone",
        destination: "http://pimenov.kz:8999/auth_api/v1/auth_user/login/phone",
      },
      //api по работе с пользователем
      //Через данный endpoint будут выданы ключи доступа.
      {
        source: "/auth_api/v1/auth_user/auth/phone",
        destination: "http://pimenov.kz:8999/auth_api/v1/auth_user/auth/phone",
      },
      //api по работе с пользователем
      //Endpoint для обновления токенов
      {
        source: "/auth_api/v1/token/refresh",
        destination: "http://pimenov.kz:8999/auth_api/v1/token/refresh",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
