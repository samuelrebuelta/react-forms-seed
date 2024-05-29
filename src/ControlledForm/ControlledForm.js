import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ControlledForm = () => {

  // Form validation schema
  const validationSchema = Yup.object({
    userType: Yup.string().required('Campo obligatorio'),
    firstName: Yup.string().required('Campo obligatorio'),
    lastName: Yup.string().required('Campo obligatorio'),
    email: Yup.string().email('Dirección de correo inválida').required('Campo obligatorio'),
    password: Yup.string().required('Campo obligatorio'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required('Campo obligatorio'),
    companyName: Yup.string().when('userType', {
      is: () => 'professional',
      then: () => Yup.string().required('Campo obligatorio'),
      otherwise: () => Yup.string().notRequired()
    }),
    privacyPolicy: Yup.bool().oneOf([true], 'You must accept the privacy policy').required('Campo obligatorio')
  });

  // Form submit handler
  const handleSubmit = (data) => {
    console.log('Formulario enviado:', data);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
        companyName: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isValid, dirty }) => (
        <Form className="form">
          <div>
            <Field as="select" name="userType" className="form__field">
              <option value="">Select user type</option>
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

          <div>
            <Field name="firstName" type="text" className="form__field" placeholder="Nombre" />
            <ErrorMessage className="form__field--error" name="firstName" component="label" />
          </div>

          <div>
            <Field name="lastName" type="text" className="form__field" placeholder="Apellido" />
            <ErrorMessage className="form__field--error" name="lastName" component="label" />
          </div>

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

          <div className="form__field-checkbox">
            <Field name="privacyPolicy" type="checkbox" />
            <label htmlFor="privacyPolicy" className="form-check-label">Acepto la política de privacidad</label>
            <ErrorMessage className="form__field--error" name="privacyPolicy" component="label" />
          </div>

          <button className="form__submit" disabled={!isValid || !dirty } type="submit">Registrar</button>
        </Form>
      )}
    </Formik>
  );
};

export default ControlledForm;
