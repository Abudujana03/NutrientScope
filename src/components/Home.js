// Home.js
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import Sidebar component
import { FaBars } from 'react-icons/fa'; // Import menu icon
import logo from '../assets/logo.png';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');
  const [noProductFound, setNoProductFound] = useState(false);
  const [sortOption, setSortOption] = useState('name_asc');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const observer = useRef();
  const navigate = useNavigate();

  const lastProductElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  const fetchProducts = async (searchTerm = '', pageNumber = 1, category = '') => {
    setLoading(true);
    try {
      const endpoint = searchTerm
        ? `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&page=${pageNumber}&json=true`
        : category
          ? `https://world.openfoodfacts.org/category/${category}.json?page=${pageNumber}`
          : `https://world.openfoodfacts.org/category/snacks.json?page=${pageNumber}`;
      const response = await axios.get(endpoint);
      setProducts(prevProducts => pageNumber === 1
        ? response.data.products
        : [...prevProducts, ...response.data.products]);
      setHasMore(response.data.products.length > 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://world.openfoodfacts.org/categories.json');
      setCategories(response.data.tags);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(searchQuery, page, selectedCategory);
  }, [searchQuery, page, selectedCategory]);

  const fetchProductByBarcode = async () => {
    setLoading(true);
    setNoProductFound(false);
    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcodeQuery}.json`);
      if (response.data.product) {
        setProducts([response.data.product]);
      } else {
        setNoProductFound(true);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching product by barcode:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    setPage(1);
    fetchProducts(searchQuery, 1, selectedCategory);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption.startsWith('name')) {
      return sortOption === 'name_asc'
        ? a.product_name.localeCompare(b.product_name)
        : b.product_name.localeCompare(a.product_name);
    } else if (sortOption.startsWith('nutrition_grade')) {
      return sortOption === 'nutrition_grade_asc'
        ? a.nutrition_grades.localeCompare(b.nutrition_grades)
        : b.nutrition_grades.localeCompare(a.nutrition_grades);
    }
    return 0;
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        barcodeQuery={barcodeQuery}
        setBarcodeQuery={setBarcodeQuery}
        handleSearchClick={handleSearchClick}
        fetchProductByBarcode={fetchProductByBarcode}
        sortOption={sortOption}
        setSortOption={setSortOption}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isOpen={isSidebarOpen} // Pass the state to Sidebar
        toggleSidebar={toggleSidebar} // Pass toggle function
      />
      <div className="p-6 w-full">
        <button onClick={toggleSidebar} className="md:hidden mb-4">
          <FaBars className="text-2xl" /> {/* Menu icon */}
        </button>
        <div className=' py-4 mb-12 w-full flex item-center justify-center '>
          <img src={logo} alt="Logo " className="h-12 w-auto mb-2 rounded-full " />
          <h1 className="pl-2 pt-1 text-2xl text-center text-green-600">
            <span className='text-gray-200'>Nutrient</span><span className='text-green-600 font-semibold text-3xl'>S</span>cope
          </h1>
        </div>

        {noProductFound && (
          <div className='flex items-center justify-center h-72'>
            <div className='text-center mt-4 text-2xl font-bold text-red-500'>No product found for this barcode.</div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
          {sortedProducts.map((product, index) => (
            <div
              key={product.id}
              ref={products.length === index + 1 ? lastProductElementRef : null}
              onClick={() => navigate(`/product/${product.id}`)} // Navigate to detail page
              className="border p-2 rounded-lg hover:shadow-lg transition-transform duration-200 hover:scale-110"
            >
              <img src={product.image_url} alt={product.product_name} className="w-full h-40 object-cover mb-2" />
              <h2 className="text-xl font-semibold line-clamp-1 pr-6 text-blue-600 px-auto">{product.product_name}</h2>
              <p className="text-lg line-clamp-1"><span className='font-semibold'>Category:</span> {product.categories || 'N/A'} </p>
              <p className="text-lg line-clamp-1"><span className='font-semibold'>Nutrition Grade:</span> {product.nutrition_grades || 'N/A'}</p>
              <p className="text-lg line-clamp-1 pr-6">
                <span className='font-semibold'>Ingredients:</span> {Array.isArray(product.ingredients_hierarchy)
                  ? product.ingredients_hierarchy.map(ingredient => ingredient.split(':')[1]).join(', ')
                  : 'N/A'}
              </p>
            </div>
          ))}
        </div>

        {loading && <div className='text-center mt-4 text-2xl font-bold text-red-500'>Loading...</div>}
      </div>
    </div>
  );
};

export default Home;







































































































































