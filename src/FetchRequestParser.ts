import ClientError from './client_error';
import { ResponseParser } from './types';

class FetchRequestParser implements ResponseParser<Response> {
  public readonly parseResponse = (
    response: Response,
  ): Promise<Record<string, any>> => {
    if (response.status === 204) {
      return Promise.resolve({});
    }
    return response
      .json()
      .then((json: Record<string, any>) => {
        if (response.ok) {
          return json;
        }

        return Promise.reject(new ClientError(response, json));
      })
      .catch(() => Promise.reject(new ClientError(response, {})));
  };
}

export default FetchRequestParser;
