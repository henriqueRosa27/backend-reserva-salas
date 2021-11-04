import * as Yup from 'yup';

export const EquipamentoValidation = Yup.object({
    nome_equipamentos: Yup.string()
        .required('Obrigatório Informa nome')
        .max(30, 'Máximo de 30 caracteres'),

    quantidade: Yup.number()
        .required('Obrigatório informar quantidade')
        .max(99, 'Máximo de 99 equipamentos')
        .positive('Somente valores positivos'),
        
    });

    export const altera_statusValidation = Yup.object({
        status: Yup.boolean()
        .required('Definição de status obrigatório'),
    })