async function loadProductsFromJSON() {
    try {
        const response = await fetch('js/data/items.json'); 
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json(); 
        return products;
    } catch (error) {
        console.error('Error loading products:', error);
        return []; 
    }
}


loadProductsFromJSON().then(products => {
    const ctx = document.getElementById('myChart');

    const labels = products.map(product => product.name); 
    const prices = products.map(product => parseFloat(product.price.replace('$', ''))); 

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price',
                data: prices,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
