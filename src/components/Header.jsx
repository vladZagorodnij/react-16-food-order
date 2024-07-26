import {useState} from "react";

import logo from '../assets/logo.jpg';
import Modal from "./Modal.jsx";
import Cart from "./Cart.jsx";

export function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function handleCartOpen() {
        setModalIsOpen(true);
    }

    function handleCartClose() {
        setModalIsOpen(false);
    }

    return (
        <>
            <header id="main-header">
                <div id="title">
                    <img src={logo} alt="LOGO-food"/>
                    <h1>Reactfood</h1>
                </div>
                <button className="text-button" onClick={handleCartOpen}>Cart(0)</button>
            </header>
            <Modal open={modalIsOpen} onClose={handleCartClose}>
                <Cart/>
            </Modal>
        </>
    )
}