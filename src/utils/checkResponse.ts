import RequestError from "./requestError";

async function checkResponse<T>(res: Response): Promise<T> {
  const json = await res.json();

  // If the response is not OK, throw an error
  if (!res.ok) {
    throw new RequestError(
      json.message || "An error occurred",
      res.status,
      json,
    );
  }

  // Check if the response has an `error_code` field
  if ("error_code" in json && json["error_code"] !== 0) {
    throw new RequestError(
      json["error_message"] || json["error_text"],
      json["error_code"],
      json,
    );
  }

  return json;
}

export default checkResponse;
