import * as Yup from 'yup';

export const EquipamentoValidation = Yup.object({
    nome_equipamentos: Yup.string()
        .required('Campo obrigatório')
        .max(30, 'Máximo de 30 caracteres'),

    quantidade: Yup.number()
        .required('Campo obrigatório')
        .max(99, 'Máximo e 99 equipamentos')
        .positive('Somente valores positivos'),
        
    });

    export const altera_statusValidation = Yup.object({
        status: Yup.boolean()
        .required('Campo obrigatório'),
    })