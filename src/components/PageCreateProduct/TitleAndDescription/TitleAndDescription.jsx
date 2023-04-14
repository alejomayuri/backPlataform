import { BoxLayout } from "../BoxLayout/BoxLayout";

const TitleAndDescription = ({ onChange }) => {
    return (
        <BoxLayout>
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
        </BoxLayout>
    );
}

export { TitleAndDescription };