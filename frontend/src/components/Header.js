import headerLogo from '../images/header-logo.svg';

function Header({ children }) {

    return (
        <header className="header page__header">
            <img className="header__logo" src={headerLogo} alt="Логотип Место" />

            <div className="header__account">
                {children}
            </div>

        </header>
    )
}

export default Header;