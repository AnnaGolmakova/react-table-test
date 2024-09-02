import RequestError from "./requestError";

async function checkResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (res.ok) {
    return json;
  }
  return Promise.reject(new RequestError(json.message, res.status, json));
}

export default checkResponse;
