document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    let allProducts = [];

    // แสดง Loader ก่อนโหลดข้อมูล
    loader.style.display = 'block';

    fetch('js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            setTimeout(() => {
                displayProducts(allProducts);
                loader.style.display = 'none';
            }, 2000); // หน่วงเวลา 2000 มิลลิวินาที = 2 วินาที
        });

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const formattedPrice = product.price.toLocaleString('th-TH');
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${formattedPrice} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // ✅ ปรับปรุง logic การค้นหา + Validation ช่องว่าง
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === '') {
            // ✅ ถ้า input ว่าง ให้แสดงสินค้าทั้งหมด
            displayProducts(allProducts);
            return;
        }

        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        displayProducts(filtered);
    });
});
