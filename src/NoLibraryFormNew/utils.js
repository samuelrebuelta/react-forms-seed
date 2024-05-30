// Simulate form submission
export const submitForm = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

// Field validation
export const validateField = (name, value) => {
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