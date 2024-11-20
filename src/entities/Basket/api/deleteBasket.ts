type StatusCode = number



type DeleteBasket = (uuid:string) => Promise<StatusCode>;


const deleteBasket: DeleteBasket = async (uuid) => {
    return await fetch(`/basket_api/v1/bascket/${uuid}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    }).then((response) => response.status);
  }

  export default deleteBasket