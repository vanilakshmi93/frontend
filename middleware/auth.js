export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('authToken'); // Check for the authentication token
  
    if (!token) {
      // If no token is found, redirect to the login page
      return navigateTo('/login');
    }
  });
  