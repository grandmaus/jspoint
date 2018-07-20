import React from 'react';
import styled from 'styled-components';

const BSODWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: blue;
  color: white;
  z-index: 5000;
  font-family: monospace;
  font-size: 25px;
`;

export const BSOD = () => (
  <BSODWrapper>
    A problem has been detected and Windows has been shut down to prevent damage to your computer.<br />
    <br />
    The problem seems to be caused by the following file: xNtKrnl.exe <br />
    <br />
    SYSTEM_THREAD_EXCEPTION_NOT_HANDLED If this is the first time you've seen this stop error
    screen, restart your computer. <br /> If this screen appears again, follow these steps:
    <br />
    <br />
    Check to make sure any new hardware or software is properly installed. If this is a new
    installation, ask your hardware or software manufacturer for any Windows updates you might need.

    <br />
    <br />
    If problems continue, disable or remove any newly installed hardware or software. Disable BIOS
    memory options such as caching or shadowing.
    <br />
    <br />
    If you need to use safe mode to remove or disable components, restart your computer, press F8 to
    select Advanced Startup Options, and then select Safe Mode.
    <br />
    <br />Technical Information: *** STOP: 0x1000007e (0xffffffffc0000005, 0xfffff80002e55151,
    0xfffff880009a99d8, 0xfffff880009a9230) *** xNtKrnl.exe - Address 0xfffff80002e55151 base at
    0xfffff80002e0d000 DateStamp 0x4ce7951a
  </BSODWrapper>
);
