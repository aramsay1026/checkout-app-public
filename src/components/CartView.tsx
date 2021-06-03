import React, { useState } from "react";
import styled from 'styled-components';
import CartContext from '../providers/CartContext';
import type { Item } from '../providers/CartContext';
import { Button, PageContainer, AlignRight, Table, TableRow, TableCell, CellContents, TextLabelBold } from '../styles/AppStyle';
import Modal from '../components/Modal';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { TextLabelGray } from "../styles/AppStyle";

const ProductPicture = styled.span`
    height: 183px;
    width: 183px;
    display: inline-block;
    background-image: url('${(props: Item) => props.sku + '.png'}');
`;

const ProductModalPicture = styled.span`
    display: inline-block;
    height: 600px;
    width: 600px;
    margin: 0 180px;
    background-image: url('${(props: Item) => props.sku + '.png'}');
    background-repeat: no-repeat;
    background-size: cover;
`;

const ProductModalPictureContainer = styled.div`
    display: block;
    position: relative;
    width: 100%;
`;

const PlusIcon = styled.span`
    height: 26px;
    width: 26px;
    display: inline-block;
    background-image: url('Add.svg');
`;

const MinusIcon = styled.span`
    height: 26px;
    width: 26px;
    display: inline-block;
    background-image: url('Minus.svg');
`;

const QuantityContainer = styled.span`
    display: inline-block;
`;

const ProductQuantityText = styled.span`
    display: inline-block;
    padding: 0 0.5em;
    position: relative;
    top: -0.4em;
`;

const SkuContainer = styled.div`
    text-align: center;
`;

type ChangeProductCountType = (item: Item, newCount: number) => void;
type SelectImageType = (item: Item) => void;
type ProductQuantityProps = {
    item: Item,
    changeProductCount: ChangeProductCountType
};
function ProductQuantity(props: ProductQuantityProps) {
    function onDecrement() {
        const { item } = props;
        props.changeProductCount(item, item.quantity - 1);
    }

    function onIncrement() {
        const { item } = props;
        props.changeProductCount(item, item.quantity + 1);
    }

    return (
        <span>
            <MinusIcon onClick={onDecrement}></MinusIcon>
            <ProductQuantityText>{props.item.quantity}</ProductQuantityText>
            <PlusIcon onClick={onIncrement}></PlusIcon>
        </span>

    )
}

type ProductPriceProps = {
    item: Item
};

function ProductPrice(props: ProductPriceProps) {
    const { item } = props;

    return (
        <span>
            <ProductQuantityText>Price: ${item.unitPrice}</ProductQuantityText>
            <ProductQuantityText>Total: ${item.unitPrice * item.quantity}</ProductQuantityText>
        </span>
    );
}

function productItem(props: Item, changeProductCount: ChangeProductCountType, onSelectImage: SelectImageType) {
    const onClickImage = () => {
        onSelectImage(props);
    };

    return (
        <TableRow>
            <TableCell><ProductPicture {...props} onClick={onClickImage} /></TableCell>
            <TableCell><CellContents>{props.name} <SkuContainer>Sku:{props.sku}</SkuContainer></CellContents></TableCell>
            <TableCell><CellContents><ProductQuantity item={props} changeProductCount={changeProductCount} /></CellContents></TableCell>
            <TableCell><CellContents><ProductPrice item={props} /></CellContents></TableCell>
        </TableRow>
    )
}

export default function ReviewCart() {
    const [modalItem, setModalItem] = useState<Item>();

    const [cartModal, setCartModal] = useState();

    return (
        <CartContext.Consumer>
            {(cartContextValue: any) => {
                const { cart, setCart } = cartContextValue;
                const changeProductCount: ChangeProductCountType = (item: Item, newQuantity: number) => {
                    if (newQuantity <= 1) {
                        item.quantity = 1;
                    } else {
                        item.quantity = newQuantity;
                    }
                    setCart(cart.slice());
                };

                let currentModal = undefined;
                if (modalItem) {
                    const onCloseModal = () => {
                        setModalItem(undefined);
                    };

                    currentModal = (
                        <Modal onClose={onCloseModal}>
                            <ProductModalPictureContainer>
                                <ProductModalPicture {...modalItem} />
                            </ProductModalPictureContainer>
                        </Modal>
                    );
                }

                return (
                    <PageContainer>
                        {currentModal}
                        <Table>
                            <TableRow>
                                <TableCell><TextLabelBold>Your Cart</TextLabelBold></TableCell>
                                <TableCell><TextLabelGray> ITEM</TextLabelGray></TableCell>
                                <TableCell><TextLabelGray> QUANTITY</TextLabelGray></TableCell>
                                <TableCell><TextLabelGray> PRICE</TextLabelGray></TableCell>
                            </TableRow>
                            {cart.map((item: Item) => productItem(item, changeProductCount, setModalItem))}
                        </Table>
                        <AlignRight>
                            <Link to="/check-out">
                                <Button> Proceed To Checkout</Button>
                            </Link>
                        </AlignRight>
                    </PageContainer>

                );
            }}
        </CartContext.Consumer>

    );
}
