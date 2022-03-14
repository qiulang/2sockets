When I try to fix a memory leak and also try to test autoUnref feature in 4.x I find that if a global client is used for 2 connections (wrongly), the 2nd connection gets the 1st connection message. 

This sample code is to demonstrate the error.

The server logic is simple, when client connects it needs to send a login message with user_id , if the server finds the same user_id login with a different socket.id, it decides that this is the case that the same user login from a different client so it will emit logoff to the first socket. When the socket gets logoff message it will close its connection.

The client declare socket as a global variable. This is wrong, because it will use for 2 different connections as main() shows.

The correct way is to make socket a function scope variable. But I find when it is a global variable, the second connection gets the logoff message. Why is that ?

