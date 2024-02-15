// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const RefreshTokenHandler = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const refreshToken = getRefreshTokenFromCookie(); // Implement this function to retrieve the refresh token from the cookie

//     const fetchNewTokens = async () => {
//       try {
//         const response = await axios.post(
//           "/api/refreshToken", // Replace this with your backend route for refreshing tokens
//           { refreshToken }
//         );

//         const { accessToken, refreshToken: newRefreshToken } = response.data;

//         // Update the access token in the cookie or wherever you store it
//         updateAccessTokenInCookie(accessToken);

//         // Update the refresh token in the cookie or wherever you store it
//         updateRefreshTokenInCookie(newRefreshToken);
//       } catch (error) {
//         console.error("Error refreshing tokens:", error);
//         // Handle token refresh error (e.g., log user out, redirect to login page)
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNewTokens();
//   }, []);

//   if (loading) {
//     // Optional: Show a loading spinner or indicator while refreshing tokens
//     return <div>Loading...</div>;
//   }

//   // Once tokens are refreshed, render children components
//   return <>{children}</>;
// };

// export default RefreshTokenHandler;
