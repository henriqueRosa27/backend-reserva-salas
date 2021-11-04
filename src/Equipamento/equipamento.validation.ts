import * as Yup from 'yup';

export const EquipamentoValidation = Yup.object({
    nome_equipamentos: Yup.string()
        .required('Campo nome obrigatório')
        .max(30, 'Máximo de 30 caracteres no campo nome'),

    quantidade: Yup.number()
        .required('Campo quantiade obrigatório')
        .max(99, 'Máximo e 99 equipamentos no campo quantidade')
        .positive('Somente valores positivos no campo quantidade'),
        
    });

    export const altera_statusValidation = Yup.object({
        status: Yup.boolean()
        .required('Campo status obrigatório'),
    })