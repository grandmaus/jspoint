import React from 'react';
import styled from 'styled-components';
import { CameraControl } from '../utils/CameraControl';

const CameraContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px solid white;
  border-radius: 5px;
  background: black;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

/**
 * Fires callback for switching camera input
 * @param value - Value of the selected option in camera selector
 * @param cameras - Array of cameras
 * @param onCameraSelect - Callback to be fired on camera selection
 */
const handleCameraSelectChage = ({ target: { value } }, { cameras, onCameraSelect }) => {
  onCameraSelect(cameras[value]);
};

const ApplicationCamera = props => {
  const sourceSelcetor = () => (
    <select
      onChange={e => {
        handleCameraSelectChage(e, props);
      }}
    >
      {props.cameras.map((camera, index) => (
        <option value={index} key={index}>
          {camera.label}
        </option>
      ))}
    </select>
  );
  return <CameraContainer>{props.videoSource}</CameraContainer>;
};

const CameraHandler = props => <CameraControl width="100%" renderTo={ApplicationCamera} />;

export default CameraHandler;
