import axios from 'axios';
import { ACCESS_TOKEN } from './../constants/ACCESS_TOKEN';
// import { FI_TEST_ACCESS_TOKEN } from '../constants/FE_TEST_ACCESS_TOKEN.JS';
import { Api } from './../constants/Urls';

const getAccTemplates = async() => {
    const path = Api.GET_ACC_TEMPLATES;
    try {
    const response = await axios.get(path, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
    });
    const content = atob(response.data.content);
    return content;
    } catch (error) {
        console.log(error);
    }
}

const getTestTemplates = async() => {
    const path = Api.GET_TEST_TEMPLATES;
    try{
        const response = await axios.get(path, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
        const content = atob(response.data.content);
        return content;
    } catch(error) {
        console.log(error);
    }
}



// const updateFITestTemplate = async ({ templateName, content }) => {
//     const path = Api.UPDATE_FI_TEST_TEMPLATE(templateName);
//     try {
//         await axios.put(path,
//             { content },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${FI_TEST_ACCESS_TOKEN }`
//                 }
//             });
//     } catch (error) {
//         console.log(error);
//     }
// }

// const updateFIAccTemplate = async ({ templateName, content }) => {
//     const path = Api.UPDATE_FI_ACC_TEMPLATE(templateName);

//     try {
//         await axios.put(path,
//             { content },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${FI_TEST_ACCESS_TOKEN }`
//                 }
//             });
//     } catch (error) {
//         console.log(error);
//     }
// }

const templateService = {
    getAccTemplates,
    getTestTemplates,
    // updateFITestTemplate,
    // updateFIAccTemplate
};


export default templateService;