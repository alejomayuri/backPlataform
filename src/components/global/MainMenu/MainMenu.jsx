import style from './MainMenu.module.css';

const MainMenu = () => {
    return (
        <div className={style.mainmenu}>
            <ul className={style.menu}>
                <li className={style.menu__item}>
                    <a href="#" className={style.menu__link}>Home</a>
                </li>
                <li className={style.menu__item}>
                    <a href="#" className={style.menu__link}>Productos</a>
                </li>
                <li className={style.menu__item}>
                    <a href="#" className={style.menu__link}>Pedidos</a>
                </li>
            </ul>
        </div>
    )
}

export { MainMenu }