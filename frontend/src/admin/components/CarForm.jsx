import { useEffect, useState } from "react";

const initialForm = {
  brand: "",
  model: "",
  variant: "",
  year: "",
  price: "",
  bodyType: "",
  fuelType: "",
  transmission: "",
  seatingCapacity: "",

  engine: {
    cc: "",
    horsepower: "",
    torque: "",
    mileage: "",
    topSpeed: "",
  },

  dimensions: {
    length: "",
    width: "",
    height: "",
    wheelbase: "",
    groundClearance: "",
    bootSpace: "",
  },

  safety: {
    airbags: "",
    abs: false,
    esp: false,
    hillAssist: false,
    tractionControl: false,
    ncapRating: "",
  },

  features: {
    sunroof: false,
    touchscreen: false,
    adas: false,
    cruiseControl: false,
    wirelessCharging: false,
    ventilatedSeats: false,
    panoramicSunroof: false,
  },

  images: {
    thumbnail: "",
    gallery: "",
  },
};


function CarForm({
  initialData = null,
  onSubmit,
  loading = false,
  submitText = "Save Car",
}) {

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");


  // ========================================
  // LOAD EXISTING CAR
  // ========================================

  useEffect(() => {

    if (!initialData) {
      setForm(initialForm);
      return;
    }

    setForm({
      brand: initialData.brand || "",
      model: initialData.model || "",
      variant: initialData.variant || "",
      year: initialData.year || "",
      price: initialData.price || "",
      bodyType: initialData.bodyType || "",
      fuelType: initialData.fuelType || "",
      transmission: initialData.transmission || "",
      seatingCapacity:
        initialData.seatingCapacity || "",

      engine: {
        cc: initialData.engine?.cc || "",
        horsepower:
          initialData.engine?.horsepower || "",
        torque: initialData.engine?.torque || "",
        mileage: initialData.engine?.mileage || "",
        topSpeed:
          initialData.engine?.topSpeed || "",
      },

      dimensions: {
        length:
          initialData.dimensions?.length || "",
        width:
          initialData.dimensions?.width || "",
        height:
          initialData.dimensions?.height || "",
        wheelbase:
          initialData.dimensions?.wheelbase || "",
        groundClearance:
          initialData.dimensions?.groundClearance || "",
        bootSpace:
          initialData.dimensions?.bootSpace || "",
      },

      safety: {
        airbags:
          initialData.safety?.airbags || "",
        abs:
          initialData.safety?.abs || false,
        esp:
          initialData.safety?.esp || false,
        hillAssist:
          initialData.safety?.hillAssist || false,
        tractionControl:
          initialData.safety?.tractionControl || false,
        ncapRating:
          initialData.safety?.ncapRating || "",
      },

      features: {
        sunroof:
          initialData.features?.sunroof || false,
        touchscreen:
          initialData.features?.touchscreen || false,
        adas:
          initialData.features?.adas || false,
        cruiseControl:
          initialData.features?.cruiseControl || false,
        wirelessCharging:
          initialData.features?.wirelessCharging || false,
        ventilatedSeats:
          initialData.features?.ventilatedSeats || false,
        panoramicSunroof:
          initialData.features?.panoramicSunroof || false,
      },

      images: {
        thumbnail:
          initialData.images?.thumbnail || "",

        gallery:
          initialData.images?.gallery?.join(", ") || "",
      },
    });

  }, [initialData]);


  // ========================================
  // BASIC CHANGE
  // ========================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // ========================================
  // NESTED CHANGE
  // ========================================

  const handleNestedChange = (
    section,
    event
  ) => {

    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previous) => ({
      ...previous,

      [section]: {
        ...previous[section],

        [name]:
          type === "checkbox"
            ? checked
            : value,
      },
    }));
  };


  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");


    if (
      !form.brand ||
      !form.model ||
      !form.year ||
      !form.price ||
      !form.bodyType ||
      !form.fuelType ||
      !form.transmission ||
      !form.seatingCapacity
    ) {

      setError(
        "Please fill all required fields."
      );

      return;
    }


    const carData = {

      brand: form.brand,

      model: form.model,

      variant: form.variant,

      year: Number(form.year),

      price: Number(form.price),

      bodyType: form.bodyType,

      fuelType: form.fuelType,

      transmission: form.transmission,

      seatingCapacity:
        Number(form.seatingCapacity),


      engine: {
        cc: form.engine.cc
          ? Number(form.engine.cc)
          : undefined,

        horsepower: form.engine.horsepower
          ? Number(form.engine.horsepower)
          : undefined,

        torque: form.engine.torque
          ? Number(form.engine.torque)
          : undefined,

        mileage: form.engine.mileage
          ? Number(form.engine.mileage)
          : undefined,

        topSpeed: form.engine.topSpeed
          ? Number(form.engine.topSpeed)
          : undefined,
      },


      dimensions: {
        length: form.dimensions.length
          ? Number(form.dimensions.length)
          : undefined,

        width: form.dimensions.width
          ? Number(form.dimensions.width)
          : undefined,

        height: form.dimensions.height
          ? Number(form.dimensions.height)
          : undefined,

        wheelbase: form.dimensions.wheelbase
          ? Number(form.dimensions.wheelbase)
          : undefined,

        groundClearance:
          form.dimensions.groundClearance
            ? Number(
                form.dimensions.groundClearance
              )
            : undefined,

        bootSpace: form.dimensions.bootSpace
          ? Number(form.dimensions.bootSpace)
          : undefined,
      },


      safety: {
        airbags: form.safety.airbags
          ? Number(form.safety.airbags)
          : undefined,

        abs: form.safety.abs,

        esp: form.safety.esp,

        hillAssist:
          form.safety.hillAssist,

        tractionControl:
          form.safety.tractionControl,

        ncapRating:
          form.safety.ncapRating
            ? Number(
                form.safety.ncapRating
              )
            : undefined,
      },


      features: {
        sunroof:
          form.features.sunroof,

        touchscreen:
          form.features.touchscreen,

        adas:
          form.features.adas,

        cruiseControl:
          form.features.cruiseControl,

        wirelessCharging:
          form.features.wirelessCharging,

        ventilatedSeats:
          form.features.ventilatedSeats,

        panoramicSunroof:
          form.features.panoramaSunroof,
      },


      images: {
        thumbnail:
          form.images.thumbnail,

        gallery:
          form.images.gallery
            ? form.images.gallery
                .split(",")
                .map((url) => url.trim())
                .filter(Boolean)
            : [],
      },
    };


    await onSubmit(carData);

  };


  return (
    <form
      className="admin-car-form"
      onSubmit={handleSubmit}
    >

      {error && (
        <div className="admin-form-message error">
          {error}
        </div>
      )}


      {/* BASIC INFORMATION */}

      <FormSection
        title="Basic Information"
        description="Essential information about the vehicle."
      >

        <div className="admin-form-grid">

          <FormInput
            label="Brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
            placeholder="e.g. BMW"
          />

          <FormInput
            label="Model"
            name="model"
            value={form.model}
            onChange={handleChange}
            required
            placeholder="e.g. M4"
          />

          <FormInput
            label="Variant"
            name="variant"
            value={form.variant}
            onChange={handleChange}
            placeholder="e.g. Competition"
          />

          <FormInput
            label="Year"
            name="year"
            type="number"
            value={form.year}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Seating Capacity"
            name="seatingCapacity"
            type="number"
            value={form.seatingCapacity}
            onChange={handleChange}
            required
          />

          <FormSelect
            label="Body Type"
            name="bodyType"
            value={form.bodyType}
            onChange={handleChange}
            required
            options={[
              "Hatchback",
              "Sedan",
              "SUV",
              "MUV",
              "Coupe",
              "Convertible",
              "Wagon",
            ]}
          />

          <FormSelect
            label="Fuel Type"
            name="fuelType"
            value={form.fuelType}
            onChange={handleChange}
            required
            options={[
              "Petrol",
              "Diesel",
              "Electric",
              "Hybrid",
              "CNG",
            ]}
          />

          <FormSelect
            label="Transmission"
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
            required
            options={[
              "Manual",
              "Automatic",
              "AMT",
              "CVT",
              "DCT",
            ]}
          />

        </div>

      </FormSection>


      {/* ENGINE */}

      <FormSection
        title="Engine & Performance"
        description="Technical engine specifications."
      >

        <div className="admin-form-grid">

          {[
            ["cc", "Engine CC"],
            ["horsepower", "Horsepower"],
            ["torque", "Torque"],
            ["mileage", "Mileage"],
            ["topSpeed", "Top Speed"],
          ].map(([name, label]) => (

            <FormInput
              key={name}
              label={label}
              name={name}
              type="number"
              value={form.engine[name]}
              onChange={(event) =>
                handleNestedChange(
                  "engine",
                  event
                )
              }
            />

          ))}

        </div>

      </FormSection>


      {/* DIMENSIONS */}

      <FormSection
        title="Dimensions"
        description="Vehicle dimensions and storage information."
      >

        <div className="admin-form-grid">

          {[
            ["length", "Length"],
            ["width", "Width"],
            ["height", "Height"],
            ["wheelbase", "Wheelbase"],
            [
              "groundClearance",
              "Ground Clearance",
            ],
            ["bootSpace", "Boot Space"],
          ].map(([name, label]) => (

            <FormInput
              key={name}
              label={label}
              name={name}
              type="number"
              value={form.dimensions[name]}
              onChange={(event) =>
                handleNestedChange(
                  "dimensions",
                  event
                )
              }
            />

          ))}

        </div>

      </FormSection>


      {/* SAFETY */}

      <FormSection
        title="Safety"
        description="Safety equipment and ratings."
      >

        <div className="admin-form-grid">

          <FormInput
            label="Airbags"
            name="airbags"
            type="number"
            value={form.safety.airbags}
            onChange={(event) =>
              handleNestedChange(
                "safety",
                event
              )
            }
          />

          <FormInput
            label="NCAP Rating"
            name="ncapRating"
            type="number"
            value={form.safety.ncapRating}
            onChange={(event) =>
              handleNestedChange(
                "safety",
                event
              )
            }
          />

          {[
            ["abs", "ABS"],
            ["esp", "ESP"],
            ["hillAssist", "Hill Assist"],
            [
              "tractionControl",
              "Traction Control",
            ],
          ].map(([name, label]) => (

            <FormCheckbox
              key={name}
              label={label}
              name={name}
              checked={form.safety[name]}
              onChange={(event) =>
                handleNestedChange(
                  "safety",
                  event
                )
              }
            />

          ))}

        </div>

      </FormSection>


      {/* FEATURES */}

      <FormSection
        title="Features"
        description="Comfort, technology and convenience features."
      >

        <div className="admin-form-checkbox-grid">

          {[
            ["sunroof", "Sunroof"],
            ["touchscreen", "Touchscreen"],
            ["adas", "ADAS"],
            [
              "cruiseControl",
              "Cruise Control",
            ],
            [
              "wirelessCharging",
              "Wireless Charging",
            ],
            [
              "ventilatedSeats",
              "Ventilated Seats",
            ],
            [
              "panoramicSunroof",
              "Panoramic Sunroof",
            ],
          ].map(([name, label]) => (

            <FormCheckbox
              key={name}
              label={label}
              name={name}
              checked={form.features[name]}
              onChange={(event) =>
                handleNestedChange(
                  "features",
                  event
                )
              }
            />

          ))}

        </div>

      </FormSection>


      {/* IMAGES */}

      <FormSection
        title="Images"
        description="Add image URLs for the vehicle."
      >

        <div className="admin-form-grid">

          <FormInput
            label="Thumbnail URL"
            name="thumbnail"
            value={form.images.thumbnail}
            onChange={(event) =>
              handleNestedChange(
                "images",
                event
              )
            }
          />

          <div className="admin-form-field">

            <label>
              Gallery URLs
            </label>

            <textarea
              name="gallery"
              value={form.images.gallery}
              onChange={(event) =>
                handleNestedChange(
                  "images",
                  event
                )
              }
              rows="4"
              placeholder="URL1, URL2, URL3"
            />

          </div>

        </div>

      </FormSection>


      {/* ACTIONS */}

      <div className="admin-form-actions">

        <button
          type="submit"
          className="admin-primary-btn"
          disabled={loading}
        >

          {loading
            ? "Saving..."
            : submitText}

        </button>

      </div>

    </form>
  );
}


// ========================================
// FORM SECTION
// ========================================

function FormSection({
  title,
  description,
  children,
}) {

  return (
    <div className="admin-form-section">

      <div className="admin-form-section-header">

        <h2>{title}</h2>

        <p>{description}</p>

      </div>

      {children}

    </div>
  );
}


// ========================================
// INPUT
// ========================================

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
}) {

  return (
    <div className="admin-form-field">

      <label>

        {label}

        {required && (
          <span className="required">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />

    </div>
  );
}


// ========================================
// SELECT
// ========================================

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) {

  return (
    <div className="admin-form-field">

      <label>

        {label}

        {required && (
          <span className="required">
            *
          </span>
        )}

      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >

        <option value="">
          Select {label}
        </option>

        {options.map((option) => (

          <option
            key={option}
            value={option}
          >
            {option}
          </option>

        ))}

      </select>

    </div>
  );
}


// ========================================
// CHECKBOX
// ========================================

function FormCheckbox({
  label,
  name,
  checked,
  onChange,
}) {

  return (
    <label className="admin-checkbox">

      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />

      <span>
        {label}
      </span>

    </label>
  );
}


export default CarForm;