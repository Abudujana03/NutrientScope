
// // Sidebar.js
// import React from 'react';
// import { FaSearch, FaTimes } from 'react-icons/fa';
// import logo from '../assets/logo.png';
// const Sidebar = ({
//     searchQuery,
//     setSearchQuery,
//     barcodeQuery,
//     setBarcodeQuery,
//     handleSearchClick,
//     fetchProductByBarcode,
//     sortOption,
//     setSortOption,
//     categories,
//     selectedCategory,
//     setSelectedCategory,
//     isOpen,
//     toggleSidebar,
// }) => {
//     return (
//         <div className={`sidebar fixed inset-0 bg-gray-200 p-4 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:w-64 z-50`}>

//             <div className='flex justify-between items-center mb-4'>
//                 <img src={logo} alt="Logo " className="h-24 w-auto mb-2 rounded-md md:w-full md:h-auto" /> {/* Logo added here */}
              
//                 <button onClick={toggleSidebar} className="md:hidden mb-4 text-red-500 flex items-center">
//                     <FaTimes className="mr-2 h-6 w-6" />
//                 </button>
//             </div>
//             <h2 className="text-xl font-bold  ">Filters</h2>
//             {/* Existing filtering and search elements */}
//             <div className="mb-4">
//                 <label className="block mb-2 font-semibold">Sort by:</label>
//                 <select
//                     value={sortOption}
//                     onChange={(e) => setSortOption(e.target.value)}
//                     className="p-2 border rounded w-full"
//                 >
//                     <option value="name_asc">Name (A - Z)</option>
//                     <option value="name_desc">Name (Z - A)</option>
//                     <option value="nutrition_grade_asc">Grade Ascending</option>
//                     <option value="nutrition_grade_desc">Grade Descending</option>
//                 </select>
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-2 font-semibold">Filter by Category:</label>
//                 <select
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     className="p-2 border rounded w-full"
//                 >
//                     <option value="">All Categories</option>
//                     {categories.map((category) => (
//                         <option key={category.id} value={category.name}>{category.name}</option>
//                     ))}
//                 </select>
//             </div>

//             <div className="mb-4 md:w-52">
//                 <label className="block mb-2 font-semibold">Search for Products :</label>
//                 <div className="relative">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Enter product name"
//                         className="w-full p-2 border rounded outline-none"
//                     />
//                     <button
//                         onClick={handleSearchClick}
//                         className="absolute right-0 top-0 bottom-0 p-2 bg-blue-500 text-white rounded-r"
//                     >
//                         <FaSearch className="h-6 w-6" />
//                     </button>
//                 </div>
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-2 font-semibold">Search by Barcode:</label>
//                 <div className="relative">
//                     <input
//                         type="text"
//                         value={barcodeQuery}
//                         onChange={(e) => setBarcodeQuery(e.target.value)}
//                         placeholder="Enter barcode"
//                         className="w-full p-2 border rounded outline-none"
//                         onKeyDown={(e) => e.key === 'Enter' && fetchProductByBarcode()}
//                     />
//                     <button
//                         onClick={fetchProductByBarcode}
//                         className="absolute right-0 top-0 bottom-0 p-2 bg-blue-500 text-white rounded-r"
//                     >
//                         <FaSearch className="h-6 w-6" />
//                     </button>
//                 </div>
//             </div>

//             {/* Footer for license and copyright notice */}
//             <div className="mt-auto text-center text-sm text-gray-600">
//                 <p>&copy; {new Date().getFullYear()} Muhammad Abudujana. All rights reserved.</p>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;












































// Sidebar.js
import React from 'react'; // Import React library for building UI components
import { FaSearch, FaTimes } from 'react-icons/fa'; // Import icons for search and close
import logo from '../assets/logo.png'; // Import logo image

const Sidebar = ({
    searchQuery,
    setSearchQuery,
    barcodeQuery,
    setBarcodeQuery,
    handleSearchClick,
    fetchProductByBarcode,
    sortOption,
    setSortOption,
    categories,
    selectedCategory,
    setSelectedCategory,
    isOpen,
    toggleSidebar,
}) => {
    return (
        // Sidebar container with fixed position and transition effect for opening/closing
        <div className={`sidebar fixed inset-0 bg-gray-200 p-4 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:w-64 z-50`}>
            
            {/* Logo and close button container */}
            <div className='flex justify-between items-center mb-4'>
                <img src={logo} alt="Logo" className="h-24 w-auto mb-2 rounded-md md:w-full md:h-auto" /> {/* Logo image */}
                
                {/* Close button for small screens */}
                <button onClick={toggleSidebar} className="md:hidden mb-4 text-red-500 flex items-center">
                    <FaTimes className="mr-2 h-6 w-6" />
                </button>
            </div>

            <h2 className="text-xl font-bold">Filters</h2>

            {/* Dropdown for sorting options */}
            <div className="mb-4 w-full">
                <label className="block mb-2 font-semibold">Sort by:</label>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)} // Update sort option on change
                    className="w-full   p-2 border rounded" // Responsive width with max limit
                >
                    <option value="name_asc w-full ">Name (A - Z)</option>
                    <option value="name_desc">Name (Z - A)</option>
                    <option value="nutrition_grade_asc">Grade Ascending</option>
                    <option value="nutrition_grade_desc">Grade Descending</option>
                </select>
            </div>

            {/* Dropdown for filtering by category */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Filter by Category:</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category on change
                    className="w-full max-w-xs p-2 border rounded" // Responsive width with max limit
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>{category.name}</option> // Render categories
                    ))}
                </select>
            </div>

            {/* Search input for product name */}
            <div className="mb-4 md:w-52">
                <label className="block mb-2 font-semibold">Search for Products :</label>
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                        placeholder="Enter product name"
                        className="w-full p-2 border rounded outline-none" // Full width input
                    />
                    {/* Search button */}
                    <button
                        onClick={handleSearchClick} // Trigger search on click
                        className="absolute right-0 top-0 bottom-0 p-2 bg-blue-500 text-white rounded-r"
                    >
                        <FaSearch className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Search input for barcode */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Search by Barcode:</label>
                <div className="relative">
                    <input
                        type="text"
                        value={barcodeQuery}
                        onChange={(e) => setBarcodeQuery(e.target.value)} // Update barcode query on change
                        placeholder="Enter barcode"
                        className="w-full p-2 border rounded outline-none" // Full width input
                        onKeyDown={(e) => e.key === 'Enter' && fetchProductByBarcode()} // Trigger search on Enter key
                    />
                    {/* Search button for barcode */}
                    <button
                        onClick={fetchProductByBarcode} // Trigger barcode search on click
                        className="absolute right-0 top-0 bottom-0 p-2 bg-blue-500 text-white rounded-r"
                    >
                        <FaSearch className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Footer with copyright notice */}
            <div className="mt-auto text-center text-sm text-gray-600">
                <p>&copy; {new Date().getFullYear()} Muhammad Abudujana. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Sidebar; // Export Sidebar component for use in other parts of the application
