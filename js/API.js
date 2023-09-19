const getData = (url) => {
  return fetch(url).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw resp.statusText;
    }
  });
};

const patchData = (url, payload) => {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw resp.statusText;
    }
  });
};
