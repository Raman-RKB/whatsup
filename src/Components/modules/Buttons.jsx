import '../style/MessageContainer.css';

export const Button = ({ type, handler, buttonName }) => {

    return (
        <button
            type={type}
            onClick={handler}
        >
            {buttonName}
        </button>
    );
};