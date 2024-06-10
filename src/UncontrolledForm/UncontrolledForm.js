import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const UncontrolledForm = () => {

  // Form validation schema
  const validationSchema = Yup.object().shape({
    userType: Yup.string().required('Campo obligatorio'),
    userName: Yup.string().when('userType', {
      is: 'particular',
      then: () => Yup.string().required('Campo obligatorio'),
      otherwise: () => Yup.string().notRequired()
    }),
    companyName: Yup.string().when('userType', {
      is: 'professional',
      then: () => Yup.string().required('Campo obligatorio'),
      otherwise: () => Yup.string().notRequired()
    }),
    email: Yup.string().email('Dirección de correo inválida').required('Campo obligatorio'),
    password: Yup.string().required('Campo obligatorio'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required('Campo obligatorio'),
    privacyPolicy: Yup.bool().oneOf([true], 'Es obligatorio aceptar la política de privacidad'),
  });

  // Form hook
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit'
  });
  
  // User type watch
  const userType = watch('userType');

  // Handle submit
  const onSubmit = (data) => {
    console.log('Formulario enviado:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div>
        <select {...register('userType')} className="form__field">
          <option value="">Tipo de usuario</option>
          <option value="professional">Professional</option>
          <option value="particular">Particular</option>
        </select>
        {errors.userType && <label className="form__field--error">{errors.userType.message}</label>}
      </div>

      {userType === 'professional' && (
      <div>
        <input {...register('companyName')} type="text" className="form__field" placeholder="Nombre empresa" />
        {errors.companyName && <label className="form__field--error">{errors.companyName.message}</label>}
      </div>
      )}

      {userType === 'particular' && (
      <div>
        <input {...register('userName')} type="text" className="form__field" placeholder="Nombre usuario" />
        {errors.userName && <label className="form__field--error">{errors.userName.message}</label>}
      </div>
      )}

      <div>
        <input {...register('email')} type="email" className="form__field" placeholder="Email" />
        {errors.email && <label className="form__field--error">{errors.email.message}</label>}
      </div>

      <div>
        <input {...register('password')} type="password" className="form__field" placeholder="Contraseña" />
        {errors.password && <label className="form__field--error">{errors.password.message}</label>}
      </div>

      <div>
        <input {...register('confirmPassword')} type="password" className="form__field" placeholder="Repetir contraseña" />
        {errors.confirmPassword && <label className="form__field--error">{errors.confirmPassword.message}</label>}
      </div>

      <div>
        <div className="form__field-checkbox">
          <input {...register('privacyPolicy')} type="checkbox" />
          <label htmlFor="privacyPolicy" className="form-check-label">Acepto la política de privacidad</label>
        </div>
        {errors.privacyPolicy && <label className="form__field--error">{errors.privacyPolicy.message}</label>}
      </div>

      <button className="form__submit" type="submit">Registrar</button>
    </form>
  );
};

export default UncontrolledForm;
