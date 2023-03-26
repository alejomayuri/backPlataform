import style from "./TitleAndDescription.module.css";

const TitleAndDescription = ({ onChange }) => {
    return (
        <div className={style.container}>
            <div>
                <h3>Nombre</h3>
                <input
                    type="text"
                    onChange={onChange}
                    name="name"
                />
            </div>
            <div>
                <h3>Descripción</h3>
                <textarea
                    onChange={onChange}
                    name="description"
                />
            </div>
        </div>
    );
}

export { TitleAndDescription };