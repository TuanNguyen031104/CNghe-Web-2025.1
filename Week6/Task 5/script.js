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

    let products = [];
    const STORAGE_KEY = 'coffeeProducts';
    const INITIAL_PRODUCTS = [
        {
            name: 'Cà phê Arabica Cầu Đất',
            desc: 'Hương thơm nồng nàn, vị chua thanh tao, hậu vị ngọt ngào.',
            price: 120000,
            img: '../images/arabica.jpg'
        },
        {
            name: 'Cà phê Robusta Buôn Ma Thuột',
            desc: 'Hương vị đậm đà, mạnh mẽ, hàm lượng caffeine cao, phù hợp cho một ngày tỉnh táo.',
            price: 80000,
            img: '../images/robusta.jpg'
        },
        {
            name: 'Cà phê Phin Blend (Mix)',
            desc: 'Sự kết hợp hoàn hảo giữa Arabica và Robusta, cân bằng vị, lý tưởng cho pha phin.',
            price: 95000,
            img: '../images/phin.png'
        }
    ];

    function loadProducts() {
        const storedProducts = localStorage.getItem(STORAGE_KEY);
        if (storedProducts) {
            products = JSON.parse(storedProducts);
        } else {
            products = [...INITIAL_PRODUCTS];
            saveProducts();
        }
    }

    function saveProducts() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }

    function renderProducts(filterTerm = '') {
        productListContainer.innerHTML = '';
        const searchTerm = filterTerm.toLowerCase();

        const filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(searchTerm)
        );

        if (filteredProducts.length === 0) {
            productListContainer.innerHTML = '<p style="text-align: center; width: 100%;">Không tìm thấy sản phẩm nào.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productElement = document.createElement('article');
            productElement.className = 'san-pham';
            const imgSrc = product.img || '../images/placeholder.png';
            const imgAlt = `Hình ảnh ${product.name}`;
            const productDesc = product.desc || 'Mô tả sản phẩm đang được cập nhật.';
            const productPrice = Number(product.price).toLocaleString('vi-VN');

            productElement.innerHTML = `
                <img src="${imgSrc}" alt="${imgAlt}">
                <h3>${product.name}</h3>
                <p>${productDesc}</p>
                <p>Giá: ${productPrice} VNĐ / 500g</p>
            `;
            productListContainer.appendChild(productElement);
        });
    }

    function filterProducts() {
        renderProducts(searchInput.value);
    }

    function handleAddProduct(event) {
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

        const newProduct = {
            name: name,
            price: priceValue,
            desc: desc,
            img: '../images/placeholder.png'
        };

        products.unshift(newProduct);
        saveProducts();
        renderProducts(searchInput.value);
        addProductForm.reset();
        addProductForm.classList.add('hidden');
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

    addProductForm.addEventListener('submit', handleAddProduct);

    loadProducts();
    renderProducts();
});