export function NavbarButton({ title, icon, onClick }) {
    return (

        <button onClick={onClick}
            className="navbar-btn"
        >
            {<img className="icon" src={icon} alt={title} />}

            <span className="title">{title}</span>
        </button>
    )
}

