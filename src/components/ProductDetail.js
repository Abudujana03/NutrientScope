import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importing necessary hooks from react-router-dom
import axios from 'axios'; // Importing axios for making HTTP requests
import { MdArrowBack } from 'react-icons/md'; // Importing back arrow icon

const ProductDetail = () => {
    // Extracting product ID from the URL parameters
    const { id } = useParams();
    const navigate = useNavigate(); // Hook to programmatically navigate between routes
    const [product, setProduct] = React.useState(null); // State to hold product data
    const [loading, setLoading] = React.useState(true); // State to manage loading status
    const [error, setError] = React.useState(null); // State to manage error messages

    // Effect hook to fetch product details when the component mounts or the product ID changes
    React.useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); // Set loading to true when fetching data
            setError(null); // Reset error state before fetching
            try {
                // Make an API request to fetch product details
                const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${id}.json`);
                setProduct(response.data.product); // Update state with product data
            } catch (error) {
                // Handle any errors during the fetch
                console.error('Error fetching product details:', error);
                setError('Error fetching product details. Please try again later.'); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchProduct(); // Call the fetch function
    }, [id]); // Dependency array includes id, so it runs when id changes

    // If there's an error, display the error message
    if (error) return <div className="text-center text-xl text-red-500">{error}</div>;

    // If still loading, show a loading message
    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center text-2xl font-bold text-red-500">Loading...</div>
            </div>
        );

    // If no product is found, display a message
    if (!product) return <div className="text-center text-xl">No product found.</div>;

    // Function to format the ingredients from the product data
    const formatIngredients = (ingredients) => {
        return Array.isArray(ingredients)
            ? ingredients.map(ingredient => ingredient.split(':')[1]).join(', ') // Join ingredients if they are in an array
            : 'N/A'; // Return 'N/A' if no ingredients are available
    };

    return (
        <div
            className="mx-auto p-6 flex flex-col relative"
            style={{
                backgroundImage: `url(${product.image_url})`, // Set the product image as the background
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh', // Minimum height to fill the viewport
            }}
        >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

            {/* Header with back button and product name */}
            <div className="relative z-20 flex items-center mb-4">
                <button onClick={() => navigate('/')} className="mr-4"> {/* Navigate back to home */}
                    <MdArrowBack className="h-6 w-12 text-white" /> {/* Back arrow icon */}
                </button>
                <h1 className="text-4xl font-bold text-blue-400">{product.product_name}</h1> {/* Display product name */}
            </div>

            {/* Product image and details section */}
            <div className="relative z-20 flex flex-col md:flex-row md:space-x-6 items-center justify-center">
                <div className="flex-none w-full md:w-2/5 p-2 flex justify-center hover:shadow-lg cursor-pointer border rounded-lg 
                    max-h-[400px] max-w-[250px] transition-transform duration-200 ease-in-out hover:scale-110">
                    <img src={product.image_url} alt={product.product_name} className="w-full h-auto rounded-lg" /> {/* Product image */}
                </div>
                <div className="flex-grow justify-between w-full md:w-auto md:max-w-md p-4 cursor-pointer">
                    {/* Nutritional values section */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-transform duration-200 ease-in-out">
                        <h2 className="text-2xl font-semibold mb-2 text-blue-600">Nutritional Values</h2>
                        <p className="text-lg"><span className='font-semibold'>Energy:</span> {product.nutriments?.energy || 'N/A'}</p>
                        <p className="text-lg"><span className='font-semibold'>Fat:</span> {product.nutriments?.fat || 'N/A'}</p>
                        <p className="text-lg"><span className='font-semibold'>Carbs:</span> {product.nutriments?.carbohydrates || 'N/A'}</p>
                        <p className="text-lg"><span className='font-semibold'>Proteins:</span> {product.nutriments?.proteins || 'N/A'}</p>
                        <p className="text-lg"><span className='font-semibold'>Nutrition Grade:</span> {product.nutriments?.nutrition_grade_fr?.toUpperCase() || 'N/A'}</p>
                    </div>

                    {/* Labels section */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-transform duration-200 ease-in-out">
                        <h2 className="text-2xl font-semibold mb-2 text-blue-600">Labels</h2>
                        <p className="text-lg">{product.labels || 'N/A'}</p> {/* Display labels */}
                    </div>
                </div>
            </div>

            {/* Ingredients section */}
            <div className="bg-white p-4 rounded-lg hover:shadow-lg mt-6 z-20 transition-transform duration-200 ease-in-out">
                <h2 className="text-2xl font-semibold mb-2 text-blue-600">Ingredients</h2>
                <p className="text-lg">
                    {formatIngredients(product.ingredients_hierarchy).split(', ').map((ingredient, index) => (
                        <span key={index} className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-sm mr-2 mb-2">
                            {ingredient} {/* Display formatted ingredients */}
                        </span>
                    ))}
                </p>
            </div>

            {/* Additional product details section */}
            <div className="bg-white p-4 rounded-lg hover:shadow-lg mt-6 z-20 transition-transform duration-200 ease-in-out">
                <h2 className="text-2xl font-semibold mb-2 text-blue-600">Additional Details</h2>
                <p className="text-lg"><span className='font-semibold'>Brand : </span> {product.brands || 'N/A'}</p>
                <p className="text-lg">
                    <span className='font-semibold'>Categories : </span>
                    {product.categories
                        ? product.categories.split(',').map(category => category.trim().toUpperCase()).join(', ') // Format and display categories
                        : 'N/A'}
                </p>
                <p className="text-lg">
                    <span className='font-semibold'>Allergens : </span>
                    {product.allergens
                        ? product.allergens.split(',').map(allergen => allergen.replace('en:', '').toUpperCase().trim()).join('  ') // Format and display allergens
                        : 'N/A'}
                </p>
                <p className="text-lg"><span className='font-semibold'>Additives : </span> {product.additives || 'N/A'}</p>
                <p className="text-lg"><span className='font-semibold'>Packaging : </span> {product.packaging || 'N/A'}</p>
            </div>

        </div>
    );
};

export default ProductDetail; // Export the component for use in other parts of the application




