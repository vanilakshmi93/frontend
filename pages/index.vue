<template>
    <div>
      <h1>Welcome to Nuxt!</h1>
      <p>This is the home page.</p>
      <nuxt-link to="/login">Go to Login</nuxt-link>
      <nuxt-link to="/listing">Go to Listing Page</nuxt-link>
    </div>
  </template>
  <script setup>
  definePageMeta({
    middleware: 'auth',
  });
  </script>
  