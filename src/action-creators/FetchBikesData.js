export const fetchData = async (url,data,method) => {
  try {
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      console.log(method)
      const response = await fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: method,
        body: JSON.stringify(data)
      })
      .then(response => response.json());
      return response;
    }

    else if (method === 'GET') {
      const response = await fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: method
      })
      .then(response => response.json());
      return response;
    }
  } catch (e) {
        throw e;
    }
}

export const getBikesData = (url,action) => {
    return dispatch => {
        fetchData(url,undefined, 'GET')
          .then(response => { 
              dispatch({ type: action, payload: response });
        })
            .catch(e => { console.log(`External error: ${e}`); });
    }
};

