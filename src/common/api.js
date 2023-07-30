
export const getRequest = async (url) => {
  try {
    let headers = {};
    console.debug('request from get url: ', url);
    let response = await fetch(url, {
      method: "GET",
      headers: headers
    });
    let responseJson = await response.json();
    if (response.status == 500) {
      throw responseJson;
    } else {
      console.debug('response from get url: ' + url + ' is: ', responseJson);
      return responseJson;
    }
  } catch (e) {
    throw e;
  }
};

export const postRequest = async (url, body) => {
  try {
    let headers = { "Content-Type": "application/json" };
    console.log('request from post url---: ' + url + ' is: ', body);

    // Convert the body object to a JSON string
    let requestBody = JSON.stringify(body);

    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: requestBody  // Use the JSON string as the request body
    });

    let responseJson = await response.json();
    if (response.status == 500) {
      throw responseJson;
    } else {
      console.log('response from post url: ' + url + ' is: ', responseJson);
      return responseJson;
    }
  } catch (e) {
    throw e;
  }
};

export const putRequest = async (url, body) => {
  try {
    let headers = { "Content-Type": "application/json" };
    console.log('request from put url: ' + url + ' is: ', body);
    let response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body)
    });
    let responseJson = await response.json();
    if (response.status == 500) {
      throw responseJson;
    } else {
      console.log('response from put url: ' + url + ' is: ', responseJson);
      return responseJson;
    }
  } catch (e) {
    throw e;
  }
};

export const deleteRequest = async (url, body) => {
  try {
    let headers = { "Content-Type": "application/json" };
    console.log('request from put url: ' + url + ' is: ', body);
    let response = await fetch(url, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(body)
    });
    let responseJson = await response.json();
    if (response.status == 500) {
      throw responseJson;
    } else {
      console.log('response from put url: ' + url + ' is: ', responseJson);
      return responseJson;
    }
  } catch (e) {
    throw e;
  }
};
