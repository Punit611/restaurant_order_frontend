import { postRequest, getRequest ,putRequest,deleteRequest} from "../common/api";

const URI= "https://resturant-ordering-backend.onrender.com"

export const getMainData = async () => {

    
    const url = `${URI}/orders`;
    let result = await getRequest(url);
    console.log("result", result, url)
    return result;
}

export const putMainData = async (data) => {

    let d={completed: true,id:data._id};
    // /orders/:id/completion
    const url = `${URI}/orders/completion`;
    let result = await putRequest(url,d);
    console.log("result", result, url)
    return result;
}
export const postMainData = async (data) => {

    const url = `${URI}/add_orders`;
    let result = await postRequest(url,data);
    console.log("result", result, url)
    return result;
}
export const deleteMainData = async (data) => {

    let d={id:data._id};
    
    const url = `${URI}/delete`;
    let result = await deleteRequest(url,d);
    console.log("result", result, url)
    return result;
}
