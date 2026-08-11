import React from 'react'

function BrandSection() {
    const brands=[
        "Toyota",
        "BMW",
        "Honda",
        "VolksWegan",
        "Tata",
        "Mahendra",
        "Mercedes",
        "Hyundai"
    ]
  return (
    <section>

      <h2>Popular Brands</h2>

      <div>
        {brands.map((brand) => (
          <button key={brand}>
            {brand}
          </button>
        ))}
      </div>

    </section>
  );
}

export default BrandSection;
