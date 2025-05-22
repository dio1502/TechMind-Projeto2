"use client"

const InputField = ({ label, type = "text", value, onChange, name }) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} value={value} onChange={onChange} className="form-input" />
    </div>
  )
}

export default InputField
