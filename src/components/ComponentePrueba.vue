<template>
  <div class="productos-container">
    <h2>Productos</h2>
    
    <!-- Category Filter -->
    <div class="filter-container">
      <label for="category-filter">Filtrar por categoría:</label>
      <select id="category-filter" v-model="selectedCategory">
        <option value="">Todas las categorías</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">Cargando productos...</div>
    
    <!-- Products Grid -->
    <div v-else class="productos-grid">
      <div v-for="producto in filteredProducts" :key="producto.id" class="producto-card">
        <div class="producto-content">
          <h3>{{ producto.nombre || 'Sin nombre' }}</h3>
          
          <img 
            :src="producto.imagen" 
            :alt="producto.nombre || 'Producto'" 
            class="producto-imagen"
            @error="handleImageError"
          />
          
          <!-- Product not available overlay -->
          <div v-if="!producto.precio" class="no-disponible">
            Producto no disponible
          </div>
          
          <!-- Product details -->
          <div class="producto-info">
            <p class="categoria">
              <strong>Categoría:</strong> {{ producto.Categorias || 'Sin categoría' }}
            </p>
            
            <p class="precio" v-if="producto.precio">
              <strong>Precio:</strong> \${{ producto.precio }}
            </p>
            
            <p class="descripcion">
              {{ producto.descripcion || 'Sin descripción disponible' }}
            </p>
          </div>
          
          <button 
            class="btn-agregar" 
            @click="agregarCarrito(producto)"
            :disabled="!producto.precio"
          >
            {{ producto.precio ? 'Agregar al carrito' : 'No disponible' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const productos = ref([]);
const loading = ref(true);
const selectedCategory = ref('');

// Load categories from API
const loadCategories = async () => {
  try {
    const response = await fetch('https://sheet2api.com/v1/T0ZA8YOQPyc1/pn2/categorias');
    const categoriesData = await response.json();
    return categoriesData.map(cat => cat.descripcion);
  } catch (error) {
    console.error('Error al cargar categorías:', error);
    return [];
  }
};

// Categories state
const categories = ref([]);

// Filter products by selected category
const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return productos.value;
  }
  return productos.value.filter(p => p.Categorias === selectedCategory.value);
});

// Load products from API
onMounted(async () => {
  try {
    // Load products
    const response = await fetch('https://sheet2api.com/v1/T0ZA8YOQPyc1/pn2/productos');
    productos.value = await response.json();
    // Load categories
    categories.value = await loadCategories();
  } catch (error) {
    console.error('Error al cargar productos o categorías:', error);
  } finally {
    loading.value = false;
  }
});

// Handle image load errors
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/200x200?text=Sin+imagen';
};

// Add to cart function
const agregarCarrito = (producto) => {
  if (producto.precio) {
    console.log('Agregando al carrito:', producto);
  }
};
</script>

<style scoped>
.productos-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

/* Filter Styles */
.filter-container {
  margin-bottom: 30px;
  text-align: center;
}

.filter-container label {
  margin-right: 10px;
  font-weight: bold;
}

.filter-container select {
  padding: 8px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  cursor: pointer;
}

/* Loading State */
.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 40px;
}

/* Products Grid */
.productos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  padding: 20px 0;
}

/* Responsive Grid */
@media (max-width: 1024px) {
  .productos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .productos-grid {
    grid-template-columns: 1fr;
  }
}

/* Product Card */
.producto-card {
  background-color: #d98880; /* Not so bright red */
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.producto-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.producto-content {
  padding: 20px;
}

.producto-card h3 {
  margin: 0 0 15px 0;
  color: #fff;
  font-size: 1.25rem;
  text-align: center;
}

/* Product Image */
.producto-imagen {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

/* Product Not Available Overlay */
.no-disponible {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  z-index: 1;
}

/* Product Info */
.producto-info {
  margin-bottom: 15px;
}

.categoria {
  font-size: 14px;
  color: #fff;
  margin-bottom: 8px;
}

.precio {
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 10px;
}

.descripcion {
  font-size: 14px;
  color: #f8f8f8;
  line-height: 1.5;
  min-height: 40px;
}

/* Button */
.btn-agregar {
  width: 100%;
  padding: 10px 20px;
  background-color: #fff;
  color: #d98880;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-agregar:hover:not(:disabled) {
  background-color: #f8f8f8;
  color: #c0392b;
}

.btn-agregar:disabled {
  background-color: #999;
  color: #fff;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>