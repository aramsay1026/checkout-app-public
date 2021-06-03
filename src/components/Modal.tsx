import React from "react";
import styled from 'styled-components';

const ModalContainer = styled.div`
    margin: 6em auto;
    border-radius: 65px;
    background-color: white;
    width: 960px;
    padding: 35px 54px;
`;

const PageOverlay = styled.div`
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background: rgba(0, 0, 0, 0.1);
`;

type ModalProps = {
    onClose?: () => void,
    children: any
};

export default function Modal(props: ModalProps) {
    let modalClicked = false;

    function onPageOverlayClick() {
        if (!modalClicked) {
            if (typeof props.onClose === 'function') {
                props.onClose();
            }
        }
        modalClicked = false;
    }

    function onModalClick() {
        modalClicked = true;
    }
    return (
        <PageOverlay onClick={onPageOverlayClick}>
            <ModalContainer onClick={onModalClick}>
                {props.children}
            </ModalContainer>
        </PageOverlay>
    );
}
