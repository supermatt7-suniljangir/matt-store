let timeOut = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(
        new Error(
          "could not fetch data, please check your network connection and try again"
        )
      );
    }, s * 1000);
  });
};

export let AJAX = async function (query) {
  try {
    let fetchData = fetch(`https://dummyjson.com/products/${query}`);
    let res = await Promise.race([fetchData, timeOut(10)]);
    let data = await res.json();
    return data;
    if (!res.ok) {
      throw new Error(
        "could not fetch data, please try again with a proper internet connection."
      );
    }
  } catch (err) {
    throw err;
  }
};
