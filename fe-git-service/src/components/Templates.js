import React, { useState } from 'react';
import templateService from './../services/template';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import 'react-diff-view/style/index.css';
import './../styles/basic.css';


const Templates = ({ onTemplateClickHandler }) => {
    const [templatesMap, setTemplatesMap] = useState({});

    const getTemplates = async () => {
        const accData = JSON.parse(await templateService.getAccTemplates());
        const testData = JSON.parse(await templateService.getTestTemplates());
        const templatesMap = {};
        accData.templates.sort((template1, template2) => template1.name.localeCompare(template2.name));
        testData.templates.sort((template1, template2) => template1.name.localeCompare(template2.name));

        accData.templates.slice(0, 10).forEach(template => {
            templatesMap[template.name] = {
                matched: false,
                accTemplate: template.content
            };
        });
        testData.templates.slice(0, 10).forEach(template => {
            templatesMap[template.name] && templatesMap[template.name].matched === false && (templatesMap[template.name] = {
                ...templatesMap[template.name],
                matched: true,
                testTemplate: template.content
            })
        });
        setTemplatesMap(templatesMap);
    }


    return (
        <>
            <Button className="submit" type="primary" onClick={getTemplates}>
                GET TEMPLATES
            </Button>
            {
                <section className='template-btns-container'>

                    {
                        Object.keys(templatesMap).map(
                            (templateName, index) => {
                                return (
                                    <Button key={templateName} 
                                            className='template-btn'
                                            onClick={() => 
                                            onTemplateClickHandler(templateName, 
                                            templatesMap[templateName].testTemplate,
                                            templatesMap[templateName].accTemplate)}
                                            >
                                            {templateName}
                                    </Button>
                                )
                            }
                        )
                    }

                </section>
            }
        </>
    )
}



export default Templates;