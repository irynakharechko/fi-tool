const gitApi = 'https://api.github.com/repos/taiitake/test/contents/fe-git-service';
const fiTestApi = 'https://test-integrator.formsengine.io';
const fiAccApi = 'https://acc-integrator.formsengine.io';
const appName = 'ACA';


export const Api = {
    // GIT
    GET_ACC_TEMPLATES: `${gitApi}/acc-json-templates.json`,
    GET_TEST_TEMPLATES: `${gitApi}/test-json-templates.json`,

    // FORMS INTEGRATOR
    UPDATE_FI_TEST_TEMPLATE: 
        (templateName) => `${fiTestApi}/v1/apps/${appName}/templates/${templateName}`,
    UPDATE_FI_ACC_TEMPLATE: 
        (templateName) => `${fiAccApi}/v1/apps/${appName}/templates/${templateName}`
}


