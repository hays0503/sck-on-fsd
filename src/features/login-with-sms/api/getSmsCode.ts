
export type GetSmsCodeResponse = {
    id: string;
}

export type GetSmsCode = (number_phone: string) => Promise<GetSmsCodeResponse>;

const getSmsCode: GetSmsCode = async(number_phone) => {
  return await fetch("/auth_api/v1/auth_user/login/phone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      country_code: "+7",
      number: number_phone,
    }),
  }).then((response) => response.json());
};


export default getSmsCode