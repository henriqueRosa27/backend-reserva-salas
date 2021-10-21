import * as Yup from 'yup';

export const predioValidation = Yup.object({
  nome: Yup.string()
    .required('Campo obrigatório')
    .max(100, 'Máximo de 100 caracteres'),
    status: Yup.boolean()
    .required('Campo obrigatório'),
});
export const altera_statusValidation = Yup.object({
      status: Yup.boolean()
    .required('Campo obrigatório'),
});
