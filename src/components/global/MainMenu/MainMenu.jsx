import style from './MainMenu.module.css';
import Link from 'next/link';

const MainMenu = () => {
    return (
        <div className={style.mainmenu}>
            <ul className={style.menu}>
                <li className={style.menu__item}>
                    <Link href="/" className={style.menu__link}>
                        <span>🏠</span>
                        <span>Inicio</span>
                    </Link>
                </li>
                <li className={style.menu__item}>
                    <Link href="/products" className={style.menu__link}>
                        <span>🛍️</span>
                        <span>Productos</span>
                    </Link>
                </li>
                <li className={style.menu__item}>
                    <a href="#" className={style.menu__link}>
                        <span>📦</span>
                        <span>Pedidos</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export { MainMenu }