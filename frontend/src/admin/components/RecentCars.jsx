import { Link } from "react-router-dom";

function RecentCars({ cars = [] }) {
  return (
    <section className="admin-recent-section">

      {/* HEADER */}

      <div className="admin-section-header">

        <div>
          <p className="admin-eyebrow">
            Vehicle Activity
          </p>

          <h2>
            Recent Cars
          </h2>
        </div>

        <Link
          to="/admin/cars"
          className="admin-section-link"
        >
          View All
        </Link>

      </div>


      {/* EMPTY STATE */}

      {cars.length === 0 ? (

        <div className="admin-state">
          No cars found.
        </div>

      ) : (

        <div className="admin-recent-table-wrapper">

          <table className="admin-recent-table">

            <thead>
              <tr>
                <th>Car</th>
                <th>Year</th>
                <th>Price</th>
                <th>Added</th>
                <th>Action</th>
              </tr>
            </thead>


            <tbody>

              {cars.map((car) => (

                <tr key={car._id}>

                  {/* CAR */}

                  <td>

                    <div className="admin-recent-car">

                      <img
                        src={
                          car.images?.thumbnail ||
                          car.images?.gallery?.[0]
                        }
                        alt={`${car.brand} ${car.model}`}
                        className="admin-recent-car-image"
                      />

                      <div>

                        <strong>
                          {car.brand} {car.model}
                        </strong>

                        {car.variant && (
                          <span>
                            {car.variant}
                          </span>
                        )}

                      </div>

                    </div>

                  </td>


                  {/* YEAR */}

                  <td>
                    {car.year}
                  </td>


                  {/* PRICE */}

                  <td>
                    ₹
                    {Number(
                      car.price
                    ).toLocaleString("en-IN")}
                  </td>


                  {/* DATE */}

                  <td>
                    {car.createdAt
                      ? new Date(
                          car.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "-"}
                  </td>


                  {/* ACTION */}

                  <td>

                    <Link
                      to={`/cars/${car._id}`}
                      className="admin-action view"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </section>
  );
}

export default RecentCars;