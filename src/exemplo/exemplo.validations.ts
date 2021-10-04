import * as Yup from 'yup';

export const exemploValidation = Yup.object({
  nome: Yup.string()
    .required('Campo obrigatório')
    .max(50, 'Máximo de 50 caracteres'),
});
