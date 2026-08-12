import "./css/Loading.css";

function Loading({ message = "Loading..." }) {
  return (
    <main className="global-loading">

      <div className="loading-content">

        <div className="loading-spinner">
          <span></span>
        </div>

        <h2>
          DriveSphere
        </h2>

        <p>
          {message}
        </p>

      </div>

    </main>
  );
}

export default Loading;