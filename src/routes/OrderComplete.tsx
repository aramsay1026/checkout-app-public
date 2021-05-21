import React from "react";
import styled from 'styled-components';
import { Button, PageContainer, TextLabelBold, AlignCenter } from '../AppStyle';

export default function OrderComplete() {
    return (
        <PageContainer>
            <AlignCenter>
                <TextLabelBold>
                    Thank you for your order!
            </TextLabelBold>
            </AlignCenter>
        </PageContainer>
    );
}
