const BASE_URL = "http://localhost:5000/api";

export const getToken = () => localStorage.getItem("token");

export const apiFetch = async (endpoint, method = "GET", data = null, isFile = false) => {
  const headers = isFile
    ? { Authorization: `Bearer ${getToken()}` }
    : {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      };

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = isFile ? data : JSON.stringify(data);
  }

  const res = await fetch(`${BASE_URL}/${endpoint}`, options);
  if (!res.ok) throw new Error("İstek başarısız");
  return res.json();
};
