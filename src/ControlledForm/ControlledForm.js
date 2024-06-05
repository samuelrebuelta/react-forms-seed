import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ControlledForm = () => {

  // Form validation schema
  const validationSchema = Yup.object({
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

  // Form submit handler
  const handleSubmit = (data) => {
    console.log('Formulario enviado:', data);
  };

  return (
    <Formik
      initialValues={{
        userType: '',
        companyName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        privacyPolicy: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isValid, dirty,  }) => (
        <Form className="form">
          <div>
            <Field as="select" name="userType" className="form__field">
              <option value="">Tipo de usuario</option>
              <option value="professional">Professional</option>
              <option value="particular">Particular</option>
            </Field>
            <ErrorMessage className="form__field--error" name="userType" component="label" />
          </div>

          {values.userType === 'professional' && (
            <div>
              <Field name="companyName" type="text" className="form__field" placeholder="Nombre empresa" />
              <ErrorMessage className="form__field--error" name="companyName" component="label" />
            </div>
          )}

          {values.userType === 'particular' && (
            <div>
              <Field name="userName" type="text" className="form__field" placeholder="Nombre" />
              <ErrorMessage className="form__field--error" name="userName" component="label" />
            </div>
          )}

          <div>
            <Field name="email" type="email" className="form__field" placeholder="Email" />
            <ErrorMessage className="form__field--error" name="email" component="label" />
          </div>

          <div>
            <Field name="password" type="password" className="form__field" placeholder="Contraseña" />
            <ErrorMessage className="form__field--error" name="password" component="label" />
          </div>

          <div>
            <Field name="confirmPassword" type="password" className="form__field" placeholder="Repetir contraseña" />
            <ErrorMessage className="form__field--error" name="confirmPassword" component="label" />
          </div>

          <div>
            <div className="form__field-checkbox">
              <Field name="privacyPolicy" type="checkbox" />
              <label htmlFor="privacyPolicy" className="form-check-label">Acepto la política de privacidad</label>
            </div>
            <ErrorMessage className="form__field--error" name="privacyPolicy" component="label" />
          </div>

          <button className="form__submit" type="submit" disabled={!isValid || !dirty}>Registrar</button>
        </Form>
      )}
    </Formik>
  );
};

export default ControlledForm;
