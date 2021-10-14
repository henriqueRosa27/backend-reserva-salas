import * as Yup from 'yup';

export const salaValidation = Yup.object({
    nome: Yup.string()
        .required('Campo obrigatório')
        .length(100, 'Máximo de 100 caracteres'),

    equipamento: Yup.string()
        .length(100, 'Máximo de 100 caracteres'),

    andar: Yup.number()
        .required('Campo obrigatório'),

    intervalo: Yup.string()
        .required('Campo obrigatório')
        .length(20, 'Máximo de 20 caracteres'),

    acessibilidade: Yup.boolean()
        .required('Campo obrigatório'),

    local: Yup.string()
        .required('Campo obrigatório'),

    sala_especial: Yup.string()
        .length(100, 'Máximo de 100 caracteres'),

    capacidade: Yup.number()
        .required('Campo obrigatório')
        .positive('Somente valores positivos')
        .max(999, 'Máximo de 3 dígitos'),
});
