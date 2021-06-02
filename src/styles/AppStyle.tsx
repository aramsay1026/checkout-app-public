import styled from 'styled-components';

const Button = styled.button`
    border: none;
    color: gray;
    background-color: white;
    border-radius: 25px;
    font-family: 'SF Pro Text';
    padding: .8em;
    font-size: 1.2em;
`;

const PageContainer = styled.div`
    font-family: 'SF Pro Text';
    margin: 3em auto;
    border-radius: 65px;
    background-color: #ededed;
    width: 960px;
    padding: 35px 54px;
`;

const AlignRight = styled.div`
    width: 100%;
    text-align: right;
`;

const AlignCenter = styled.div`
    padding: 3em;
    width: 90%;
    text-align: center;
`;

const Table = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 3em 0;
    padding: 0;
`;

const TableRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const TableCell = styled.div`
    text-align: center;
    box-sizing: border-box;
    flex-grow: 1;
    width: 25%;  // Default to full width
    padding: 0.8em 1.2em;
    overflow: hidden; // Or flex might break
    list-style: none;
    border: solid @bw white;
    background: fade(slategrey,100%);
`;

const CellContents = styled.div`
    margin: 35% auto 0;
    text-align: center;
`;

const TextLabelGray = styled.span`
    padding: 0 1em;
    color: gray;
`;

const TextLabelBold = styled.span`
    position: relative;
    top: -0.3em;
    font-weight: bold;
    font-size: 1.5em;
`;

const HeavyText = styled.h1`
    font-weight: 900;
    color: #686868;
`;

const LightText = styled.h5`
    font-family: 'SF Pro Text';
    font-weight: 300;
    color: #686868;
    margin: 0
`;

export { Button, PageContainer, AlignRight, Table, TableRow, TableCell, CellContents, HeavyText, LightText, TextLabelGray, TextLabelBold, AlignCenter };
