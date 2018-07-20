import React, { Component } from "react";
import { number, bool, func } from "prop-types";

export class CameraControl extends Component {
  static propTypes = {
    width: number,
    height: number,
    renderTo: func
  };

  constructor() {
    super();
    this.videoFrame = {};
  }

  state = {
    cameras: [],
    activeCamera: {}
  };

  componentDidMount() {
    this.updateVideoSourcesList();
    this.updateVideoFrame();
  }

  /**
   * Updates specified video element object with a frame from a specified or default camera
   * @param {MediaDeviceInfo} [camera] Camera that user wants to attach to the video frame
   */
  updateVideoFrame = camera => {
    const streamOptions = camera ? { deviceId: camera.deviceId } : true;
    getVideoStream(streamOptions).then(stream => {
      this.videoFrame.srcObject = stream;
      this.setActiveCamera(camera, stream);
    });
  };

  /**
   * Receives list of available cameras and stores them in state
   */
  updateVideoSourcesList = () => {
    getAvailableDevices().then(devices => {
      const cameras = getVideoDevices(devices);
      this.setState(() => ({
        cameras
      }));
    });
  };

  /**
   * Updates application state with info about currently active camera
   * @param {MediaDeviceInfo} [camera] Active camera. Undefined upon initial mount
   * @param {MediaStream} stream Media stream from active camera
   */
  setActiveCamera = (camera, stream) => {
    const activeCamera = camera ? camera : stream.getVideoTracks()[0];
    this.setState(() => ({
      activeCamera
    }));
  };

  /**
   * Attaches component ref to a video output
   * @param {HTMLElement} node
   */
  getVideoRef = node => {
    this.videoFrame = node;
  };

  renderVideoSource = () => (
    <video width={this.props.width} height={this.props.height} autoPlay={true} ref={this.getVideoRef} />
  );

  render() {
    const Element = this.props.renderTo;
    return (
      <Element
        videoSource={this.renderVideoSource()}
        cameras={this.state.cameras}
        onCameraSelect={this.updateVideoFrame}
      />
    );
  }
}

/**
 * Fetches all available media devices
 * @returns {Promise<MediaDeviceInfo[]>}
 */
function getAvailableDevices() {
  return navigator.mediaDevices.enumerateDevices();
}

/**
 * Given array of MediaDevices returns only those,
 * who are video inputs
 * @param {MediaDeviceInfo[]} devices
 */
function getVideoDevices(devices) {
  return devices.filter(d => d.kind === "videoinput");
}

/**
 *
 * @param streamOptions
 * @returns {Promise<MediaStream>}
 */
function getVideoStream(streamOptions) {
  return navigator.mediaDevices.getUserMedia({ video: streamOptions });
}
