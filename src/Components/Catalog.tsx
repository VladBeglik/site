export default function Catalog() {

    const products = [
        { id: 1, name: "Диван", price: "20 000₽", image: "https://via.placeholder.com/300" },
        { id: 2, name: "Стол", price: "10 000₽", image: "https://via.placeholder.com/300" },
        { id: 3, name: "Кресло", price: "15 000₽", image: "https://via.placeholder.com/300" }
    ];

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-4">Каталог</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg text-center">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-lg">{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}