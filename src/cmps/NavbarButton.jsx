export function NavbarButton({ title, icon, onClick, isProfile }) {
    const buttonStyles = isProfile ? { width: '24px', height: '24px', borderRadius: '50%' } : {};

    return (
        <button onClick={onClick} className="navbar-btn">
            <img className="icon" src={icon} alt={title} style={buttonStyles} />
            <span className="title">{title}</span>
        </button>
    );
}