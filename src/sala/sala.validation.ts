import * as Yup from 'yup';

export const salaValidation = Yup.object({
  nome: Yup.string()
    .required('Obrigatório informar nome da sala')
    .max(50, 'Máximo de 50 caracteres'),

  equipamentos: Yup.string()
    .required('Obrigatório informar os equipamentos')
    .max(500, 'Máximo de 500 caracteres'),

  andar: Yup.number()
    .required('Obrigatório informar o andar')
    .max(9, 'Valor maximo 9')
    .min(-9, 'Valor minimo -9'),

  intervalo_fim: Yup.string()
    .required('Obrigatório informar intervalo')
    .max(5, 'Máximo de 5 caracteres'),

  intervalo_inicio: Yup.string()
    .required('Obrigatório informar intervalo')
    .max(5, 'Máximo de 5 caracteres'),

  predio_id: Yup.number()
  .required('Obrigatório informar Id do prédio')
  .positive('Id deve ser valor positivo'),

  salas_especiais: Yup.string()
  .max(150, 'Descrição com no máximo de 150 caracteres'),

  capacidade: Yup.number()
    .required('Obrigatório informar capacidade')
    .positive('Somente valores positivos')
    .max(999, 'Máximo de 3 dígitos'),
});

export const altera_statusValidation = Yup.object({
  status: Yup.boolean()
  .required('Definição de status obrigatório'),
});
