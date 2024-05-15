import React, {useState} from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {SFEditorModel, SFXEditor} from "@pnnh/stele";
import 'prismjs/themes/prism.css';
import 'remixicon/fonts/remixicon.css';
 
const initialValue = {
    children: [{
        name: 'paragraph',
        children: [{name: 'text', text: ''}]
    }]
}

function DevApp() {
    // initialValue = JSON.parse('{"children":[{"children":[{"name":"text","text":""}],"name":"paragraph"},{"children":[{"name":"code","text":"#aaaaa\\n\\n```shell\\nls /home\\n```\\nconsole.log(\\"dddd\\")22"}],"language":"markdown","name":"code-block"}]}')
    const [editorValue, setEditorValue] = useState<SFEditorModel>(initialValue)
    return <div>
        <SFXEditor value={editorValue} onChange={(value) => {
            console.debug('onChange222')
            setEditorValue(value)
        }}/>
        <button onClick={() => {
            console.log(editorValue)
        }}>打印值
        </button>
    </div>
}

//ReactDOM.render(<DevApp/>, document.getElementById('root'))

const container = document.getElementById('root')
if (!container) {
    throw new Error('container is null')
}

const root = ReactDOMClient.createRoot(container)

root.render(<DevApp/>)
