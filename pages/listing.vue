<template>
    <div>
      <h1>Listing Page</h1>
  
      <!-- Filters -->
      <div>
        <input v-model="searchQuery" placeholder="Search by name" />
        <select v-model="selectedSort">
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>
  
      <!-- Item List -->
      <div>
        <ul>
          <li v-for="item in filteredItems" :key="item.id">
            <h3>{{ item.name }}</h3>
            <p>Price: ₹{{ item.price }}</p>
          </li>
        </ul>
      </div>
  
      <!-- Pagination -->
      <div>
        <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Previous</button>
        <button v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="changePage(page)">
          {{ page }}
        </button>
        <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';

  // Dynamic Meta Tags
// useHead({
//   title: 'Listing Page - Nuxt App',
//   meta: [
//     {
//       name: 'description',
//       content: 'Explore the listing page of our Nuxt app with sorting, filtering, and pagination features.',
//     },
//     {
//       name: 'keywords',
//       content: 'Nuxt, Listing Page, Vue.js, Sorting, Filtering, Pagination',
//     },
//   ],
// });

  
  // Mock Data
  const mockData = [
    { id: 1, name: 'Item A', price: 50 },
    { id: 2, name: 'Item B', price: 30 },
    { id: 3, name: 'Item C', price: 20 },
    { id: 4, name: 'Item D', price: 40 },
    { id: 5, name: 'Item E', price: 10 },
    { id: 6, name: 'Item F', price: 60 },
  ];
  
  // State
  const items = ref(mockData);
  const searchQuery = ref('');
  const selectedSort = ref('');
  const currentPage = ref(1);
  const itemsPerPage = ref(3);
  
  // Computed Properties
  const filteredItems = computed(() => {
    let result = [...items.value];
  
    // Filter by search query
    if (searchQuery.value) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
  
    // Sort items
    if (selectedSort.value === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort.value === 'price') {
      result.sort((a, b) => a.price - b.price);
    }
  
    // Paginate
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return result.slice(start, end);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(
      items.value.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      ).length / itemsPerPage.value
    );
  });
  
  // Methods
  const changePage = (page) => {
    currentPage.value = page;
  };
  </script>
  
  <style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    border: 1px solid #ccc;
    margin: 10px 0;
    padding: 10px;
  }
  
  button {
    margin: 0 5px;
  }
  
  .active {
    font-weight: bold;
  }
  </style>
  