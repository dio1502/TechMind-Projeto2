import { useState } from "react";

const InputField1 = ({ type, placeholder, icon, value, onChange}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const inputType = type === "password" ? (isPasswordShown ? "text" : "password") : type;// Se o usuário passar type="password", trocamos por "text" quando isPasswordShown for true
  return (
    <div className="input-wrapper">
      <input
        type={inputType}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={onChange}
        required
      />
      <i className="material-symbols-rounded">{icon}</i>
      {type === 'password' && (
        <i onClick={() => setIsPasswordShown(prevState => !prevState)} className="material-symbols-rounded eye-icon">
          {isPasswordShown ? 'visibility' : 'visibility_off'}
        </i>
      )}
    </div>
  )
}
export default InputField1;
