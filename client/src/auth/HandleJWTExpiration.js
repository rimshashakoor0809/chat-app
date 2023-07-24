export const HandleJWTExpiration = () => {
  console.log('removing tokens')
  // Remove tokens from sessionStorage
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');

  // Redirect the user to the login page
  window.location.href = '/login'; 
};