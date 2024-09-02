import checkResponse from "../utils/checkResponse";

const BASE_URL: string = "https://example.com/api";

function getResource<T>(
  endpoint: string,
  options: Record<string, string | number | boolean>,
): Promise<T> {
  const params = new URLSearchParams(
    options as Record<string, string>,
  ).toString();

  return fetch(`${BASE_URL}/${endpoint}/?${params}`, {
    method: "GET",
  }).then((res) => checkResponse<T>(res));
}

export default getResource;
