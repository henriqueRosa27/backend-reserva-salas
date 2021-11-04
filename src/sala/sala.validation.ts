import * as Yup from 'yup';

export const salaValidation = Yup.object({
  nome: Yup.string()
    .required('Campo nome obrigatório')
    .max(50, 'Máximo de 50 caracteres no campo nome'),

  equipamentos: Yup.string()
    .required('Campo equipamentos Obrigatório')
    .max(500, 'Máximo de 500 caracteres no campo equipamentos'),

  andar: Yup.number()
    .required('Campo andar obrigatório')
    .max(9, 'Valor maximo 9 no campo andar')
    .min(-9, 'Valor minimo -9 no campo andar'),

  intervalo_fim: Yup.string()
    .required('Campo intervalo obrigatório')
    .max(5, 'Máximo de 5 caracteres no campo intervalo'),

  intervalo_inicio: Yup.string()
    .required('Campo intervalo obrigatório')
    .max(5, 'Máximo de 5 caracteres no intervalo'),

  predio_id: Yup.number()
  .required('Campo predio obrigatório')
  .positive('Valor deve ser positivo no campo predio'),

  salas_especiais: Yup.string()
  .max(150, 'Máximo de 150 caracteres campo salas especiais'),

  capacidade: Yup.number()
    .required('Campo capacidade obrigatório')
    .positive('Somente valores positivos no campo capacidade')
    .max(999, 'Máximo de 3 dígitos no campo capacidade'),
});

export const altera_statusValidation = Yup.object({
  status: Yup.boolean()
  .required('Campo status obrigatório'),
});
