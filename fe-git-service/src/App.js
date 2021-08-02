import React, {useState, useCallback} from 'react';
import Templates from './components/Templates';
import {Input, Button} from 'antd';
import {diffLines, formatLines} from 'unidiff';
import {parseDiff, Diff, Hunk } from 'react-diff-view';
import 'antd/dist/antd.min.css';
import 'react-diff-view/style/index.css';
import './styles/basic.css';

const EMPTY_HUNKS = [];

const App = () => {
    const [oldText, setOldText] = useState('');
    const [newText, setNewText] = useState('');


    const onOldTextChange = (event) => {
        setOldText(event.target.value);
    }

    const onNewTextChange = (event) => {
        setNewText(event.target.value);
    }

    const [{type, hunks}, setDiff] = useState('');
    const updateDiffText = useCallback(() => {
        const diffText = formatLines(diffLines(oldText, newText, {context: 3}));
        console.log(diffText)
        const [diff] = parseDiff(diffText, { nearbySequences: 'zip' });
        setDiff(diff);
    }, [oldText, newText, setDiff]);



    const onTemplateClickHandler = (templateName, oldValue, newValue) => {
        setOldText(oldValue);
        setNewText(newValue);
    }

    const codeEvents = {};

    return (
        <div className='main-container'>
            <header className="header">
                <Templates onTemplateClickHandler={onTemplateClickHandler}></Templates>
                <div className="input">
                    <Input.TextArea className="text" rows={10} placeholder="old text..."  onChange={onOldTextChange} value={oldText}/>
                    <Input.TextArea className="text" rows={10} placeholder="new text..." onChange={onNewTextChange} value={newText}/>
                </div>
                <Button className="submit" type="primary" onClick={updateDiffText}>
                    GENERATE DIFF
                </Button>
            </header>
            <main>
                <Diff viewType="split" diffType={type || 'delete'} hunks={hunks || EMPTY_HUNKS}>
                    {hunks =>
                        hunks.map(hunk => (
                            <Hunk key={hunk.content} hunk={hunk} codeEvents={codeEvents} />
                        ))
                    }
                </Diff>
                {
                    (hunks && hunks.length === 0) ?
                    <div> No differences was found... </div> :
                    <span></span>
                }
            </main>
        </div>
    );
}

export default App;
