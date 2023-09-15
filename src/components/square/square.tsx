import './style.css';
interface ISquareProps {
    value: string | null;
    onSquareClick: () => void;
}

/**
 *
 */
const Square: React.FC<ISquareProps> = ({ value, onSquareClick }) => {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
};

export default Square;
