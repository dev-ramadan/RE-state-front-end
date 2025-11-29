// ./src/mocks/handlers.ts
import { http, HttpResponse } from "msw"; // Importing http and HttpResponse from MSW for mocking API requests.
import { endpoints } from "./endpoints";  // Importing endpoint configurations from another file.

/**
 * Type alias for a function that takes a request with params and returns either an object (T) or an array of objects (T[]).
 * This is used to define the structure of dynamic responses.
 * 
 * @template T - Generic type representing the structure of the response.
 */
type EndpointResponse<T> = (req: {
    params: { [key: string]: string };
}) => T | T[];

/**
 * An array of handlers that MSW will use to intercept requests.
 * Each handler corresponds to an API route and defines the HTTP method, path, and the response.
 */
const handlers: ReturnType<typeof http.get | typeof http.post>[] = [];

/**
 * Iterating over each resource defined in the `endpoints` object to dynamically create handlers.
 * Each resource can have multiple endpoints, each with its own method, path, and response.
 */
Object.keys(endpoints)?.forEach((resource) => {
    endpoints[resource]?.map((endpoint) => {
        const { method, path, response } = endpoint;  // Destructure method, path, and response from each endpoint object.

        /**
         * The response handler is a function that will return the mock response.
         * If the response is a function, it is executed with the incoming request params.
         * If the response is static, it is directly returned as JSON.
         * 
         * @param request - The incoming request object, containing parameters from the URL.
         * @returns {HttpResponse} - Returns the mock response in JSON format.
         */
        const responseHandler = (request: {
            params: { [key: string]: string };
        }) => {
            // Check if the response is a function; if so, call it with the request params.
            if (typeof response === "function") {
                return HttpResponse.json(
                    response(request) as EndpointResponse<unknown>
                );
            }

            // If the response is static, return it directly.
            return HttpResponse.json(response);
        };

        // Get the appropriate HTTP method from the msw `http` object (e.g., `http.get` or `http.post`).
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const httpMethod = (http as any)[method.toLowerCase()];

        // Check if the HTTP method exists; if so, create a handler for the path and response.
        if (httpMethod) {
            handlers.push(httpMethod(path, responseHandler)); // Push the handler into the handlers array.
        } else {
            // Throw an error if the HTTP method is not supported.
            throw new Error(`Unsupported HTTP method: ${method}`);
        }
    });
});

export { handlers };  // Export the array of handlers so they can be used in the mock service worker setup.