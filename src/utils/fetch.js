export const postRequest = async (api, body) => {
  const res = await fetch(api, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const getRequest = async (api, type) => {
  const res = await fetch(api, {
    method: type,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const putRequest = async (api, body) => {
  const res = await fetch(api, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },

    body: JSON.stringify(body),
  });
  return await res.json();
};

export const deleteRequest = async (api, body) => {
  const res = await fetch(api, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },

    body: JSON.stringify(body),
  });
  return await res.json();
};

export const getDataByBody = async (api, body) => {
  const res = await fetch(api, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },

    body: JSON.stringify(body),
  });
  return await res.json();
};

export const getDataByBodyParams = async (api, body) => {
  const res = await fetch(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },

    params: JSON.stringify(body),
  });
  return await res.json();
};
