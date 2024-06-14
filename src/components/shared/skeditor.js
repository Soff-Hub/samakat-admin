import React from 'react';

export default function CKeditor({ onChange, name, value, disabled }) {
    const CKEditor = require('@ckeditor/ckeditor5-react').CKEditor;
    const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');

    return (
        <>
            <CKEditor
            disabled={disabled}
                editor={ClassicEditor}
                name={name}
                data={value}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        </>
    );
}
