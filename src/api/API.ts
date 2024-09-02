import checkResponse from "../utils/checkResponse";
import { DocumentType } from "../model/DocumentType";

const BASE_URL: string = "https://test.v5.pryaniky.com";

export const authorize = (username: string, password: string) => {
  return getResource(`ru/data/v3/testmethods/docs/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

export const getTableData = (token: string) => {
  return getResource(`ru/data/v3/testmethods/docs/userdocs/get`, {
    method: "GET",
    headers: {
      "x-auth": token,
    },
  });
};

export const createTableRow = (payload: DocumentType, token: string) => {
  return getResource(`ru/data/v3/testmethods/docs/userdocs/create`, {
    method: "POST",
    headers: {
      "x-auth": token,
    },
    body: JSON.stringify(payload),
  });
};

export const updateTableRow = (
  id: string,
  payload: DocumentType,
  token: string,
) => {
  return getResource(`ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
    method: "POST",
    headers: {
      "x-auth": token,
    },
    body: JSON.stringify(payload),
  });
};

export const deleteTableRow = (id: string, token: string) => {
  return getResource(`ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
    method: "POST",
    headers: {
      "x-auth": token,
    },
  });
};

function getResource<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return fetch(`${BASE_URL}/${endpoint}`, options).then((res) =>
    checkResponse<T>(res),
  );
}

export default getResource;
