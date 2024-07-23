import logo from '../assets/logo.jpg';

export function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="LOGO-food"/>
                <h1>Reactfood</h1>
            </div>
            <button className="text-button">Cart(0)</button>
        </header>
    )
}