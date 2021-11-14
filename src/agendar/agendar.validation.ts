import * as Yup from 'yup';
import { number } from 'yup/lib/locale';

export const AgendarValidation = Yup.object({
  data_inicial: Yup.date().required('Campo data inicial obrigatório'),

  data_final: Yup.date().required('Campo data final obrigatório'),

  sala_id: Yup.number()
    .required('Campo predio obrigatório')
    .positive('Valor deve ser positivo no campo sala'),

  responsavel: Yup.string()
    .required('Campo quantiade obrigatório')
    .max(100, 'Máximo de 100 caracteres no campo responsável'),

  observacao: Yup.string().max(
    500,
    'Máximo de 500 caracteres no campo observação',
  ),

  status: Yup.boolean().required('Campo status obrigatório'),

  nome_evento: Yup.string()
    .required('Campo nome evento preenchimento obrigatório')
    .max(100, 'Máximo de 100 caracteres'),

  quantidade_pessoas: Yup.number()
    .required('Campo predio obrigatório')
    .positive('Valor deve ser positivo')
    .max(999, 'Máximo de 999 pessoas'),
});

export const altera_statusValidation = Yup.object({
  status: Yup.boolean().required('Campo status obrigatório'),
});
