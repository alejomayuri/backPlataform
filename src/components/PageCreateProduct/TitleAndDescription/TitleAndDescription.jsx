import { BoxLayout } from "../BoxLayout/BoxLayout";

const TitleAndDescription = ({ onChange, name, description }) => {
    return (
        <BoxLayout>
            <div>
                <h3>Nombre</h3>
                <input
                    type="text"
                    onChange={onChange}
                    name="name"
                    value={name}
                />
            </div>
            <div>
                <h3>Descripción</h3>
                <textarea
                    onChange={onChange}
                    name="description"
                    value={description}
                />
            </div>
        </BoxLayout>
    );
}

export { TitleAndDescription };