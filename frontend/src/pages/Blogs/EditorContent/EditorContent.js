import React, { useEffect, useState } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import styled from 'styled-components';
const EditorStyled = styled.div`
    .hide-toolbar {
        display: ${(p) =>
            p.isHidderTools ? 'none !important' : 'flex !important'};
    }
    .wrapperClassName {
        border: ${(p) =>
            p.isHidderTools ? '1px solid #ccc  !important' : 'none !important'};
        width: 100%;
        height: ${(p) =>
            p.isHidderTools ? '150px !important' : '100% !important'};
        padding-left: 5px;
    }
`;
const TextEditor = ({
    setValue,
    fieldName,
    isHidderTools = false,
    setContentBlog,
    defaultValueProps,
}) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        if (setValue || fieldName) {
            var s = convertToRaw(editorState.getCurrentContent());
            if (s.blocks[0].text.trim().length <= 0) {
                setValue(fieldName, '');
            } else {
                setValue(
                    fieldName,
                    draftToHtml(convertToRaw(editorState.getCurrentContent())),
                );
            }
            console.log(
                'draft',
                draftToHtml(convertToRaw(editorState.getCurrentContent())),
            );
        } else {
            setContentBlog(
                draftToHtml(convertToRaw(editorState.getCurrentContent())),
            );
        }
    };
    function toHtml(es) {
        return draftToHtml(convertToRaw(es.getCurrentContent()));
    }
    useEffect(() => {
        if (toHtml(editorState) === defaultValueProps) return;
        setEditorState(
            EditorState.push(
                editorState,
                ContentState.createFromBlockArray(
                    htmlToDraft(defaultValueProps || ''),
                ),
            ),
        );
    }, [defaultValueProps]);

    return (
        <EditorStyled isHidderTools={isHidderTools}>
            <Editor
                editorState={editorState}
                // toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbarClassName="hide-toolbar"
                onEditorStateChange={onEditorStateChange}
                placeholder={'Nhập nội dung ...'}
            />
        </EditorStyled>
    );
};

export default TextEditor;
