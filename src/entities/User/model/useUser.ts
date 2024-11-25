"use client";
import { useCallback, useEffect, useState } from "react";
import { getRefreshToken, getUserInfo } from "../api";
import { ResponseUserInfo } from "../api/getUserInfo";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { ResponseRefreshToken } from "../api/getRefreshToken";

// Тип токена
type Token = { token: string };

// Проверка: пользователь анонимный или нет
const useIsAnonymous = (): boolean => {
  const accessToken = useReadLocalStorage<Token>("accessToken");
  return !accessToken?.token;
};

// Получение информации о пользователе
const useUserInfo = () => {
  const [info, setInfo] = useState<ResponseUserInfo | null>(null);
  const [error, setError] = useState(false);

  const [refreshToken, , removeRefreshToken] = useLocalStorage<Token>(
    "refreshToken",
    { token: "" }
  );
  const [accessToken, setAccessToken, removeAccessToken] =
    useLocalStorage<Token>("accessToken", { token: "" });

  // Обновление токена
  const fetchRefreshToken = useCallback(async () => {
    if (!refreshToken.token) return;

    try {
      const refreshResponse: ResponseRefreshToken = await getRefreshToken(
        refreshToken.token
      );

      if (refreshResponse?.token) {
        setAccessToken({ token: refreshResponse.token });
        console.log("Токен обновлен");
        return refreshResponse.token;
      } else {
        console.log("Не удалось обновить токен");
        removeRefreshToken();
        removeAccessToken();
        setInfo(null);
        setError(true);
      }
    } catch (err) {
      console.error("Ошибка обновления токена", err);
      setError(true);
    }
  }, [
    refreshToken.token,
    setAccessToken,
    removeAccessToken,
    removeRefreshToken,
  ]);

  // Получение информации о пользователе
  const userInfo = useCallback(async () => {
    if (!accessToken.token) {
      console.log("Пользователь не авторизован");
      return;
    }

    try {
      const response = await getUserInfo(accessToken.token);

      if (response?.detail) {
        const tokenErrors = [
          "Token expired",
          "Signature verification failed",
          "Not enough segments",
          "Invalid crypto padding",
        ];

        if (tokenErrors.includes(response.detail)) {
          const newToken = await fetchRefreshToken();
          if (newToken) {
            const refreshedResponse = await getUserInfo(newToken);
            setInfo(refreshedResponse);
          } else {
            console.log("Не удалось обновить токен");
          }
        }
      } else {
        // if (JSON.stringify(response) !== JSON.stringify(info)) {
          setInfo(response);
          // console.log("Пользователь вошел в систему", response);
        // }
        
      }
    } catch (err) {
      console.error("Ошибка при получении информации о пользователе", err);
      setError(true);
    }
  }, []);

  // Автоматическая загрузка информации о пользователе
  useEffect(() => {
    userInfo();
  }, [userInfo]);

  return { info, error, accessToken };
};

// Общий хук для работы с пользователем
const useUser = () => {
  const { info, error, accessToken } = useUserInfo();

  return {
    isAnonymous: useIsAnonymous(),
    info,
    error,
    accessToken,
  };
};

export default useUser;
