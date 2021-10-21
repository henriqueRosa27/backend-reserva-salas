import * as Yup from 'yup';

export const salasValidation = Yup.object({
  nome: Yup.string()
    .required('Campo obrigatório')
    .max(100, 'Máximo de 100 caracteres'),

    equipamentos: Yup.string()
    .max(100, 'Máximo de 100 caracteres'),

    //acessibilidade: Yup.boolean()
    //.required('Campo obrigatório'),

   // predio: Yup.string()
   // .required('Campo obrigatório'),
    andar: Yup.number()
    .required('Campo obrigatório')
    .max(999, 'Máximo de 3 numeros'),

    status_sala: Yup.boolean()
    .required('Campo Obrigatório'),

    predio_id: Yup.number()
    .required('Campo obrigatório')
    .max(9, 'Máximo de 1 numero'),

    intervalo: Yup.string()
    .required('Campo obrigatório')
    .max(20, 'Máximo de 20 caracteres'),

    SalasEspeciais: Yup.string()
    .max(100, 'Máximo de 100 caracteres'),

    capacidade: Yup.number()
    .required('Campo obrigatório')
    .max(999, 'Máximo de 3 numeros'),


});