import { useActionState, useEffect, useState } from 'react'

// Ejemplo de formulario sin librerías utilizando el nuevo useActionState (experimental)
const NoLibraryFormNew = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  // Handle form
  const updateFormAction = async (previousState, newState) => {
    // Handle errors
    const errors = {}
    if (!newState.get('firstName')) { errors.firstName = 'El nombre es requerido'; }
    if (!newState.get('lastName')) { errors.lastName = 'El apellido es requerido'; }
    if (!newState.get('email')) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(newState.get('email'))) {
      errors.email = 'El email no es válido';
    }
    if (!newState.get('password')) { errors.password = 'La contraseña es requerida'; }

    // Handle submit
    if (Object.keys(errors).length === 0) {
      const newFormData = {
        firstName: newState.get('firstName'),
        lastName: newState.get('lastName'),
        email: newState.get('email'),
        password: newState.get('password'),
      }
      setFormData(newFormData);
      console.log('Formulario enviado:', newFormData);
      return null
    }
    return errors;
  };

  // Use action state to handle form
  const [errors, submitAction] = useActionState(updateFormAction)

  useEffect(() => {
    console.log('Cambios en formData:', formData);
  }, [formData]);


  return (
    <form
      className="form"
      action={submitAction}
    >
      <input className="form__field" placeholder="Nombre" type="text" name="firstName" />
      {errors?.firstName && <label className="form__field--error">Este campo es obligatorio</label>}

      <input className="form__field" placeholder="Apellido" type="text" name="lastName" />
      {errors?.lastName && <label className="form__field--error">Este campo es obligatorio</label>}

      <input className="form__field" placeholder="Email" type="email" name="email" />
      {errors?.email && <label className="form__field--error">Introduce un email válido</label>}

      <input className="form__field" placeholder="Contraseña" type="password" name="password" />
      {errors?.password && <label className="form__field--error">La contraseña debe tener al menos 8 caracteres</label>}

      <button className="form__submit" type="submit">Registrar</button>
    </form>
  );
}

export default NoLibraryFormNew;