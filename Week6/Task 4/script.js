document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const productListContainer = document.getElementById('product-list-container');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');

    const cancelBtn = document.getElementById('cancelBtn');
    const errorMsg = document.getElementById('errorMsg');
    
    const newNameInput = document.getElementById('newName');
    const newPriceInput = document.getElementById('newPrice');
    const newDescInput = document.getElementById('newDesc');

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
        errorMsg.textContent = '';
    });

    cancelBtn.addEventListener('click', function () {
        addProductForm.classList.add('hidden');
        addProductForm.reset();
        errorMsg.textContent = '';
    });

    addProductForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = newNameInput.value.trim();
        const price = newPriceInput.value.trim();
        const desc = newDescInput.value.trim();

        const priceValue = Number(price);

        if (name === '' || price === '') {
            errorMsg.textContent = 'Vui lòng nhập đầy đủ Tên và Giá sản phẩm.';
            return;
        }

        if (isNaN(priceValue) || priceValue <= 0) {
            errorMsg.textContent = 'Giá sản phẩm phải là một số lớn hơn 0.';
            return;
        }

        errorMsg.textContent = '';

        const newProduct = document.createElement('article');
        newProduct.className = 'san-pham';
        
        newProduct.innerHTML = `
            <img src="../images/placeholder.png" alt="Hình ảnh ${name}">
            <h3>${name}</h3>
            <p>${desc || 'Mô tả sản phẩm đang được cập nhật.'}</p>
            <p>Giá: ${priceValue.toLocaleString('vi-VN')} VNĐ / 500g</p>
        `;

        productListContainer.prepend(newProduct);

        addProductForm.reset();
        addProductForm.classList.add('hidden');
    });

});