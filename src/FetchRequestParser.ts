import { ClientError } from './client_error';
import { ResponseParser } from './types';

class FetchRequestParser implements ResponseParser<Response> {
  public readonly parseResponse = (response: Response): Promise<Object> =>
    response
      .json()
      .then((json: Object) => {
        if (response.ok) {
          return json;
        }

        return Promise.reject(new ClientError(response, json));
      })
      .catch(() => Promise.reject(new ClientError(response, {})));
}

export default FetchRequestParser;
