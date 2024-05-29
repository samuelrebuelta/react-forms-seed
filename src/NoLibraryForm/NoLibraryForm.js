import { useState } from "react";

// Ejemplo de formulario sin librerías
const NoLibraryForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  // Errors state
  const [errors, setErrors] = useState({});

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) { newErrors.firstName = 'El nombre es requerido'; }
    if (!formData.lastName) { newErrors.lastName = 'El apellido es requerido'; }
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    return newErrors;
  };

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario enviado:', formData); 
    }
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <input className="form__field" placeholder="Nombre" type="text" name="firstName" value={formData.firstName } onChange={handleChange } />
      {errors.firstName && <label className="form__field--error">{errors.firstName}</label>}

      <input className="form__field" placeholder="Apellido" type="text" name="lastName" value={formData.lastName } onChange={handleChange } />
      {errors.lastName && <label className="form__field--error">{errors.lastName}</label>}

      <input className="form__field" placeholder="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
      {errors.email && <label className="form__field--error">{errors.email}</label>}

      <input className="form__field" placeholder="Contraseña" type="password" name="password" value={formData.password} onChange={handleChange} />
      {errors.password && <label className="form__field--error">{errors.password}</label>}

      <button className="form__submit" type="submit">Registrar</button>
    </form>
  );
}

export default NoLibraryForm;