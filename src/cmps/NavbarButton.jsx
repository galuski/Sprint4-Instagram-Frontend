export function NavbarButton({ title, icon, onClick }) {
    return (

        <button onClick={onClick}
            className="navbar-btn"
        >
            {icon ? <img src={icon} alt="" /> : <i style={{ fontSize: '20px', marginInlineEnd: '15px' }} className="fa-solid fa-user"></i>}

            {title}
        </button>
    )
}

