import { useEffect, useState } from "react";
import API from "../api/axios";

const Options = ({ value, onChange }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get("/service-types");
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">
        Select Service
      </label>

      <select
        name="service_type_id"
        value={value}
        onChange={onChange}
        className="border w-full p-3 rounded"
        required
      >
        <option value="">Select Service</option>

        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.service_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Options;