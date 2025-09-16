# Authentication
Protecting routes and backed resources by checking is a user the person they say they are.
There are two main ways to do this:
- Sessions and Cookies -> We store the clientId on the server and a sessionId in a cookie on the client side. Every time the client makes a request, the cookie is sent along and the server checks if the sessionId is valid.
- Tokens (ex. JWT) -> The server generates a token (JWT) and sends it to the client. The client stores it (usually in localStorage) and sends it along with every request (usually in the Authorization header). The server checks if the token is valid, only the server that created the token can confirm its validity.