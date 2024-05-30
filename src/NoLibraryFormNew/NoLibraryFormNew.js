import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitForm, validateField } from './utils';

// Ejemplo de formulario sin librerías utilizando el nuevo useActionState (experimental)
function NoLibraryFormNew () {
  // Handle form
  const updateFormAction = async (previousState, formData) => {
    const newFormValue = {
      firstName: { value: formData.get('firstName'), error: validateField('firstName', formData.get('firstName')) },
      lastName: { value: formData.get('lastName'), error: validateField('lastName', formData.get('lastName')) },
      email: { value: formData.get('email'), error: validateField('email', formData.get('email')) },
      password: { value: formData.get('password'), error: validateField('password', formData.get('password')) },
    };

    // Simulate api call
    await submitForm(newFormValue);

    return newFormValue;
  };

  // Use action state to handle form
  const [form, formAction] = useActionState(updateFormAction, {
    firstName: { value: '', error: undefined, dirty: false },
    lastName: { value: '', error: undefined, dirty: false },
    email: { value: '', error: undefined, dirty: false },
    password: { value: '', error: undefined, dirty: false }
  });

  return (
    <form
      className="form"
      action={formAction}
    >
      <input
        className="form__field"
        placeholder="Nombre"
        type="text"
        name="firstName"
        defaultValue={form.firstName.value}
      />
      {form?.firstName?.error && <label className="form__field--error">{form.firstName.error}</label>}

      <input
        className="form__field"
        placeholder="Apellido"
        type="text"
        name="lastName"
        defaultValue={form.lastName.value}
      />
      {form?.lastName?.error && <label className="form__field--error">{form.lastName.error}</label>}

      <input
        className="form__field"
        placeholder="Email"
        type="email"
        name="email"
        defaultValue={form.email.value}
      />
      {form?.email?.error && <label className="form__field--error">{form.email.error}</label>}

      <input
        className="form__field"
        placeholder="Contraseña"
        type="password"
        name="password"
        defaultValue={form.password.value}
      />
      {form?.password?.error && <label className="form__field--error">{form.password.error}</label>}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="form__submit" type="submit" disabled={pending}>{pending ? 'Cargando...' : 'Registrar'}</button>
  );
}

export default NoLibraryFormNew;