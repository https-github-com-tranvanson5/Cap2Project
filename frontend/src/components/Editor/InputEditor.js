/* eslint-disable react-hooks/exhaustive-deps */
import { Editor } from 'react-draft-wysiwyg';
import {
    ContentState,
    convertFromHTML,
    convertFromRaw,
    convertToRaw,
    EditorState,
} from 'draft-js';
import classNames from 'classnames/bind';
import { useState } from 'react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './InputEditor.module.scss';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function InputEditor({ defaultValue }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    // const [editorState, setEditorState] = useState(
    //     EditorState.createWithContent(
    //         ContentState.createFromBlockArray(
    //             convertFromHTML(`<p>${defaultValue}</p>`),
    //         ),
    //     ),
    // );

    useEffect(() => {
        const contentState = convertFromRaw(defaultValue);
        setEditorState(EditorState.createWithContent(contentState));
    }, []);

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        // console.log(
        //     'onEditorStateChange:::',
        //     editorState.getCurrentContent().getPlainText(''),
        // );
        // console.log(
        //     'editorState:::: ',
        //     convertToRaw(editorState.getCurrentContent()),
        // );
    };

    return (
        <div className={cx('wrapper')}>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName={cx('wrapper-editor')}
                toolbarClassName={cx('toolbar-editor')}
                editorClassName={cx('editor')}
                toolbarOnFocus
                toolbar={{
                    options: ['inline', 'list'],
                    inline: {
                        options: ['bold', 'italic', 'underline'],
                        bold: { className: cx('editor-item') },
                        italic: { className: cx('editor-item') },
                        underline: { className: cx('editor-item') },
                    },
                    list: {
                        options: ['unordered', 'ordered'],
                        unordered: { className: cx('editor-item') },
                        ordered: { className: cx('editor-item') },
                    },
                }}
            />
        </div>
    );
}

export default InputEditor;
