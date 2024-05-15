'use client'

import React, {useState} from 'react'
import {SFEditorModel, SFXEditor} from "@pnnh/stele";
import 'prismjs/themes/prism.css';
import 'remixicon/fonts/remixicon.css';

const initialValue = {
    children: [{
        name: 'paragraph',
        children: [{name: 'text', text: ''}]
    }]
}

export default function Page() {
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
