document.addEventListener('DOMContentLoaded', function() {

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const productListContainer = document.getElementById('product-list-container');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const products = productListContainer.querySelectorAll('.san-pham'); //

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

    addProductBtn.addEventListener('click', function() {
        addProductForm.classList.toggle('hidden');
    });

    const cancelBtn = document.getElementById('cancelBtn');
    const errorMsg = document.getElementById('errorMsg');
    
    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('newName').value.trim();
        const price = document.getElementById('newPrice').value.trim();
        const desc = document.getElementById('newDesc').value.trim();

        const priceNum = parseFloat(price);
        
        if (name === '' || price === '') {
            errorMsg.textContent = 'Vui lòng nhập tên và giá sản phẩm.';
            return;
        }
        
        if (isNaN(priceNum) || priceNum <= 0) {
            errorMsg.textContent = 'Giá phải là một số lớn hơn 0.'; // [cite: 159, 197]
            return;
        }

        errorMsg.textContent = '';

        const newItem = document.createElement('article');
        newItem.className = 'san-pham';
        newItem.style.boxSizing = 'border-box';

        newItem.innerHTML = `
            <img src="https://placehold.co/300x200?text=${name}" alt="Hình ảnh ${name}">
            <h3>${name}</h3>
            <p>${desc}</p>
            <p>Giá: ${priceNum} VNĐ / 500g</p>
        `;

        productListContainer.prepend(newItem);

        addProductForm.reset();
        addProductForm.classList.add('hidden');
    });

    cancelBtn.addEventListener('click', function() {
        errorMsg.textContent = '';
        addProductForm.reset();
        addProductForm.classList.add('hidden');
    });

});