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
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { stateToHTML } from 'draft-js-export-html';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function InputEditor({ defaultValue, setContent }) {
    const { id } = useParams();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    // const [editorState, setEditorState] = useState(
    //     EditorState.createWithContent(
    //         ContentState.createFromBlockArray(
    //             convertFromHTML(`<p>${defaultValue}</p>`),
    //         ),
    //     ),
    // );
    function toHtml(es) {
        return draftToHtml(convertToRaw(es.getCurrentContent()));
    }

    useEffect(() => {
        const contentState = convertFromRaw(defaultValue);
        setEditorState(EditorState.createWithContent(contentState));
        // const contentState = convertFromRaw(defaultValue);
        // const newHtmlString = stateToHTML(contentState);
        // const string = JSON.stringify(newHtmlString);
        // console.log('string' ,string)
        // const decodedText = newHtmlString.replace(/&lt;(\/)?(p|strong|li|ul)&gt;|&amp;nbsp;/g, '');
        // // console.log('decodedText' , decodedText)
        // // console.log('editorstate' , newHtmlString)
        // if (toHtml(editorState) === string) return;
        // setEditorState(
        //     EditorState.push(
        //         editorState,
        //         ContentState.createFromBlockArray(
        //             htmlToDraft(string),
        //         ),
        //     ),
        // );
    }, []);

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        // convertToRaw(editorState.getCurrentContent(editorState))
        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        // console.log(
        //     'onEditorStateChange:::',
        //     editorState.getCurrentContent().getPlainText(''),
        // );
        // console.log(
        //     'editorState:::: ',
        //     convertToRaw(editorState.getCurrentContent(editorState)),
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
