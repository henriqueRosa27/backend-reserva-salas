import * as Yup from 'yup';

export const EquipamentoValidation = Yup.object({
  nome: Yup.string()
    .required('Campo nome obrigatório')
    .max(30, 'Máximo de 30 caracteres no campo nome'),

  quantidade: Yup.number()
    .required('Campo quantiade obrigatório')
    .max(99, 'Máximo de 99 equipamentos no campo quantidade')
    .positive('Somente valores positivos no campo quantidade'),

  status: Yup.boolean().required('Campo status obrigatório'),
});

export const altera_statusValidation = Yup.object({
  status: Yup.boolean().required('Campo status obrigatório'),
});
