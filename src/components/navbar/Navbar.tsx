type NavBarProps = {
    isLoggedIn: boolean;
    handleClick: () => void
}

export const Navbar = (props: NavBarProps) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">Jiqnz</a>
                <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarSupportedContent">
                    <button className="btn btn-primary" type="button" onClick={props.handleClick}>
                        {props.isLoggedIn ? 'LogOut' : 'LogIn'}
                    </button>
                </div>
            </div>
        </nav>
    );
};