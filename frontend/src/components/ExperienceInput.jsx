const ExperienceInput = ({ formData, handleChange }) => {
    if (formData.role !== "provider") {
      return null;
    }
  
    return (
      <div className="mb-3">
        <label className="form-label">Experience (Years)</label>
  
        <input
          type="number"
          className="form-control"
          name="experience_years"
          min="0"
          max="100"
          value={formData.experience_years}
          onChange={handleChange}
          placeholder="Enter experience (0-100)"
          required
        />
      </div>
    );
  };
  
  export default ExperienceInput;