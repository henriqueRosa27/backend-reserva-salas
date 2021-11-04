import * as Yup from 'yup';

export const predioValidation = Yup.object({
  nome: Yup.string()
    .required('Obrigatório informar nome do prédio')
    .max(100, 'Máximo de 100 caracteres'),
    status: Yup.boolean()
    .required('Definição de status obrigatório'),
});
export const altera_statusValidation = Yup.object({
      status: Yup.boolean()
    .required('Definição de status obrigatório'),
});
