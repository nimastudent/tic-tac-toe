import './style.css';

interface ISquareProps {
    value: string | null;
    onSquareClick: () => void;
}

/**
 * 井字棋棋子组件
 * @param value 棋子的值
 * @param onSquareClick 点击棋子触发方法
 */
const Square: React.FC<ISquareProps> = ({ value, onSquareClick }) => {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
};

export default Square;
