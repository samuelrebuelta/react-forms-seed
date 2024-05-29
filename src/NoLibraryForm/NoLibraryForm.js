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
    if (!formData.password) { newErrors.password = 'La contraseña es requerida'; }
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
    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario enviado:', formData);
      setFormData(formData);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <input className="form__field" placeholder="Nombre" type="text" name="firstName" value={formData.firstName } onChange={handleChange } />
      {errors.firstName && <label className="form__field--error">Este campo es obligatorio</label>}

      <input className="form__field" placeholder="Apellido" type="text" name="lastName" value={formData.lastName } onChange={handleChange } />
      {errors.lastName && <label className="form__field--error">Este campo es obligatorio</label>}

      <input className="form__field" placeholder="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
      {errors.email && <label className="form__field--error">Introduce un email válido</label>}

      <input className="form__field" placeholder="Contraseña" type="password" name="password" value={formData.password} onChange={handleChange} />
      {errors.password && <label className="form__field--error">La contraseña debe tener al menos 8 caracteres</label>}

      <button className="form__submit" type="submit">Registrar</button>
    </form>
  );
}

export default NoLibraryForm;