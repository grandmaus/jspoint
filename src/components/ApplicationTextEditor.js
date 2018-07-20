import React from 'react';
import styled from 'styled-components';
import TextEditor from '../utils/TextEditor';

const EditorContainer = styled.div`
  position: absolute;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  #codemirror {
    height: 100%;
  }
  .CodeMirror {
    font-family: 'Fira Code Medium';
    height: 100%;
    font-size: 45px;
  }
`;

const DEFAULT_EDITOR_TEXT = `import React from 'react';
import { func } from 'prop-types';

/**
 * Extract necessary touch parameters
 * @param {TouchEvent} event
 * @returns {{windowWidth: *, windowHeight: *, x: *}}
 */
const getTouchParameters = event => {
  return {
    windowWidth: availWidth,
    windowHeight: availHeight,
    x: changedTouches[0].screenX
  };
};
`;

const ApplicationTextEditor = props => (
  <EditorContainer>
    <TextEditor initialValue={DEFAULT_EDITOR_TEXT} close={props.close} />
  </EditorContainer>
);

export default ApplicationTextEditor;
