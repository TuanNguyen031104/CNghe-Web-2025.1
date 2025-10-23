document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const productListContainer = document.getElementById('product-list-container');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const errorMsg = document.getElementById('errorMsg');

    const LOCAL_STORAGE_KEY = 'products';

    let products = [];
    function saveProducts() {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    }

    function createProductElement(product) {
        const newItem = document.createElement('article');
        newItem.className = 'san-pham';
        newItem.style.boxSizing = 'border-box';

        const safeName = encodeURIComponent(product.name);

        newItem.innerHTML = `
            <img src="https://placehold.co/300x200?text=${safeName}" alt="Hình ảnh ${product.name}">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <p>Giá: ${product.price.toLocaleString('vi-VN')} VNĐ / 500g</p>
        `;
        return newItem;
    }

    function renderProducts() {
        productListContainer.innerHTML = '';

        products.forEach(product => {
            const productElement = createProductElement(product);
            productListContainer.appendChild(productElement);
        });
    }

    function loadProducts() {
        const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (storedProducts) {
            products = JSON.parse(storedProducts);
        } else {
            products = [
                { name: 'Cà phê Arabica Cầu Đất', price: 120000, desc: 'Hương thơm nồng nàn, vị chua thanh tao, hậu vị ngọt ngào.' },
                { name: 'Cà phê Robusta Buôn Ma Thuột', price: 80000, desc: 'Hương vị đậm đà, mạnh mẽ, hàm lượng caffeine cao, phù hợp cho một ngày tỉnh táo.' },
                { name: 'Cà phê Phin Blend (Mix)', price: 95000, desc: 'Sự kết hợp hoàn hảo giữa Arabica và Robusta, cân bằng vị, lý tưởng cho pha phin.' }
            ];
            saveProducts();
        }

        renderProducts();
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const allProductElements = productListContainer.querySelectorAll('.san-pham');

        allProductElements.forEach(product => {
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

    cancelBtn.addEventListener('click', function () {
        errorMsg.textContent = '';
        addProductForm.reset();
        addProductForm.classList.add('hidden');
    });

    addProductForm.addEventListener('submit', function (event) {
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
            errorMsg.textContent = 'Giá phải là một số lớn hơn 0.';
            return;
        }
        errorMsg.textContent = '';

        const newProduct = {
            name: name,
            price: priceNum,
            desc: desc
        };

        products.unshift(newProduct);
        saveProducts();
        renderProducts();

        addProductForm.reset();
        addProductForm.classList.add('hidden');
    });

    loadProducts();
});