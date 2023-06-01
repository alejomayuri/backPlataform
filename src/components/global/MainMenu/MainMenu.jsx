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
                    <Link href="/" className={style.menu__link}>
                        <span>Todos los productos</span>
                    </Link>
                </li>
                <li className={style.menu__item}>
                    <Link href="/" className={style.menu__link}>
                        <span>Colecciones</span>
                    </Link>
                </li>
                <li className={style.menu__item}>
                    <Link href="/orders" className={style.menu__link}>
                        <span>📦</span>
                        <span>Pedidos</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export { MainMenu }