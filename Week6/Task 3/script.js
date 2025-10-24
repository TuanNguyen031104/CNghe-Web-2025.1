document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const productListContainer = document.getElementById('product-list-container');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const products = productListContainer.querySelectorAll('.san-pham');

        products.forEach(product => {
            const productNameElement = product.querySelector('h3');
            let productName = '';
            if (productNameElement) {
                productName = productNameElement.textContent.toLowerCase();
            }
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    searchBtn.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', filterProducts);

    addProductBtn.addEventListener('click', function () {
        addProductForm.classList.toggle('hidden');
    });

});