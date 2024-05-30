import { useState } from "react";
import { validateField } from "../NoLibraryFormNew/utils";

// Ejemplo de formulario sin librerías
function NoLibraryForm() {
  // Form state
  const [form, setForm] = useState({
    firstName: { value: undefined, error: undefined, dirty: false },
    lastName: { value: undefined, error: undefined, dirty: false },
    email: { value: undefined, error: undefined, dirty: false },
    password: { value: undefined, error: undefined, dirty: false }
  });

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormValue = { ...form }
    // Update field status
    newFormValue[name] = {
      value,
      error: validateField(name, value),
      dirty: true,
    };
    setForm({ ...newFormValue });
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);
  };

  // Check if there are any errors and all fields are dirty
  const isFormValid = () => {
    if (!form) { return false };
    return !Object.values(form).some(val => val.error) && Object.values(form).every(value => value.dirty);
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <input
        className="form__field"
        placeholder="Nombre"
        type="text"
        name="firstName"
        value={form.firstName.value }
        onChange={handleChange}
        onBlur={handleChange}
      />
      {form.firstName.error && form.firstName.dirty && <label className="form__field--error">{form.firstName.error}</label>}

      <input
        className="form__field"
        placeholder="Apellido"
        type="text"
        name="lastName"
        value={form.lastName.value }
        onChange={handleChange}
        onBlur={handleChange}
      />
      {form.lastName.error && form.lastName.dirty && <label className="form__field--error">{form.lastName.error}</label>}

      <input
        className="form__field"
        placeholder="Email"
        type="email"
        name="email"
        value={form.email.value}
        onChange={handleChange}
        onBlur={handleChange}
      />
      {form.email.error && form.email.dirty && <label className="form__field--error">{form.email.error}</label>}

      <input
        className="form__field"
        placeholder="Contraseña"
        type="password"
        name="password"
        value={form.password.value}
        onChange={handleChange}
        onBlur={handleChange}
      />
      {form.password.error && form.password.dirty && <label className="form__field--error">{form.password.error}</label>}

      <button className="form__submit" disabled={!isFormValid()} type="submit">Registrar</button>
    </form>
  );
}

export default NoLibraryForm;