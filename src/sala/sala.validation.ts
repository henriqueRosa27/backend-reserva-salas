import * as Yup from 'yup';

export const salaValidation = Yup.object({
    nome: Yup.string()
        .required('Campo obrigatório')
        .max(50, 'Máximo de 50 caracteres'),

    equipamentos: Yup.string()
        .required('Campo Obrigatório')
        .max(500, 'Máximo de 500 caracteres'),

    andar: Yup.number()
        .required('Campo obrigatório')
        .max(9, 'Valor maximo 9')
        .min(-9, 'Valor minimo -9'),

    intervalo_fim: Yup.string()
        .required('Campo obrigatório')
        .max(5, 'Máximo de 5 caracteres'),

    intervalo_inicio: Yup.string()
        .required('Campo obrigatório')
        .max(5, 'Máximo de 5 caracteres'),

    status: Yup.boolean()
        .required('Campo obrigatório'),

    predio_id: Yup.number()
        .required('Campo obrigatório')
        .positive('Id invalido'),

    salas_especiais: Yup.string()
        .max(150, 'Máximo de 150 caracteres'),

    capacidade: Yup.number()
        .required('Campo obrigatório')
        .positive('Somente valores positivos')
        .max(999, 'Máximo de 3 dígitos'),
});

export const altera_statusValidation = Yup.object({
    status: Yup.boolean()
    .required('Campo obrigatório'),
});
