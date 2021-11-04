import * as Yup from 'yup';

export const predioValidation = Yup.object({
  nome: Yup.string()
    .required('Campo nome obrigatório')
    .max(100, 'Máximo de 100 caracteres no campo nome'),
    status: Yup.boolean()
    .required('Campo status obrigatório'),
});
export const altera_statusValidation = Yup.object({
      status: Yup.boolean()
    .required('Campo status obrigatório'),
});
