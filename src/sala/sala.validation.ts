import * as Yup from 'yup';

export const salaValidation = Yup.object({
    nome: Yup.string()
        .required('Campo obrigatório')
        .max(100, 'Máximo de 100 caracteres'),

    numeroDaSala: Yup.number()
        .required('Campo obrigatório')
        .max(999, 'Máximo de 3 dígitos'),

    equipamento: Yup.string()
        .required('Campo obrigatório')
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

    salaEspecial: Yup.string()
        .required('Campo obrigatório')
        .max(100, 'Máximo de 100 caracteres'),

    capacidade: Yup.number()
        .required('Campo obrigatório')
        .max(999, 'Máximo de 3 dígitos'),
});
