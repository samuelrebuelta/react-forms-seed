import { useActionState, useEffect } from 'react'

// Ejemplo de formulario sin librerías utilizando el nuevo useActionState (experimental)
const NoLibraryFormNew = () => {
  // Handle form
  const updateFormAction = async (previousState, event) => {
    const { name, value } = event.target;
    const formValue = { ...previousState }
    // Update field status
    formValue[name] = {
      value,
      error: validateField(name, value),
      dirty: true,
    };
    
    return formValue;
  };

  // Field validation
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        return !value ? 'El nombre es requerido' : '';
      case 'lastName':
        return !value ? 'El apellido es requerido' : '';
      case 'email':
        return !value ? 'El email es requerido' : !/\S+@\S+\.\S+/.test(value) ? 'El email no es válido' : '';
      case 'password':
        return !value ? 'La contraseña es requerida' : value.length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : '';
      default:
        return '';
    }
  };

  // Use action state to handle form
  const [form, formAction] = useActionState(updateFormAction, {
    firstName: {},
    lastName: {},
    email: {},
    password: {},
  });

  // Check if there are any errors and all fields are dirty
  const isFormValid = () => {
    if (!form) { return false };
    return !Object.values(form).some(val => val.error) && Object.values(form).every(value => value.dirty);
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);
  };

  useEffect(() => {
    isFormValid();
  }, []);

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <input className="form__field" placeholder="Nombre" type="text" name="firstName" onChange={formAction} onBlur={formAction} />
      {form?.firstName?.error && form.firstName.dirty && <label className="form__field--error">Este campo es obligatorio</label>}

      <input className="form__field" placeholder="Apellido" type="text" name="lastName" onChange={formAction} onBlur={formAction} />
      {form?.lastName?.error && form.firstName.dirty && <label className="form__field--error">Este campo es obligatorio</label>}

      <input className="form__field" placeholder="Email" type="email" name="email" onChange={formAction} onBlur={formAction} />
      {form?.email?.error && form.firstName.dirty && <label className="form__field--error">Introduce un email válido</label>}

      <input className="form__field" placeholder="Contraseña" type="password" name="password" onChange={formAction} onBlur={formAction} />
      {form?.password?.error && form.firstName.dirty && <label className="form__field--error">La contraseña debe tener al menos 8 caracteres</label>}

      <button className="form__submit" type="submit" disabled={!isFormValid()}>Registrar</button>
    </form>
  );
}

export default NoLibraryFormNew;