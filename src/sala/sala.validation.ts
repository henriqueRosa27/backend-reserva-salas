import * as Yup from 'yup';

export const salaValidation = Yup.object({
    nome: Yup.string()
        .required('Campo obrigatório')
        .max(100, 'Máximo de 100 caracteres'),

    numero_sala: Yup.number()
        .max(3, 'Máximo de 3 dígitos'),

    equipamento: Yup.string()
        .max(100, 'Máximo de 100 caracteres'),

    andar: Yup.number()
        .required('Campo obrigatório'),

    intervalo: Yup.string()
        .required('Campo obrigatório')
        .max(20, 'Máximo de 20 caracteres'),

    acessibilidade: Yup.boolean()
        .required('Campo obrigatório'),

    local: Yup.string()
        .required('Campo obrigatório'),

    sala_especial: Yup.string()
        .max(100, 'Máximo de 100 caracteres'),

    capacidade: Yup.number()
        .required('Campo obrigatório')
        .max(3, 'Máximo de 3 dígitos'),
});
