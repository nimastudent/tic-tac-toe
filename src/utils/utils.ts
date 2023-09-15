/**
 * 通过递归根据搜索方向查找连子个数
 * @param squares 当前棋局
 * @param rowInd 落子行下标
 * @param itemInd 落子列下标
 * @param rowAdd 搜索 行方向
 * @param itemAdd 搜索 列方向
 * @param color 目标颜色
 * @param temp 临时变量计算连子数
 * @returns 该方向上连子个数
 */
export function searchWinner (squares:Array<Array<null|string>>, rowInd:number, itemInd:number, rowAdd:number, itemAdd:number, color:string, temp:number) :number {
    const afterRowInd = rowInd + rowAdd;
    const afterItemInd = itemInd + itemAdd;
    // 判断下标是否越界
    if (afterRowInd < 0 || afterRowInd >= 15 || afterItemInd < 0 || afterItemInd >= 15) {
        return temp;
    }
    // 判断是否为空或者颜色不同
    const afterColor = squares[afterRowInd][afterItemInd];
    if (afterColor === null || afterColor  !== color) {
        return temp;
    }
    // 颜色相同临时变量增加
    temp += 1;
    return searchWinner(squares, afterRowInd, afterItemInd, rowAdd, itemAdd, color, temp);
}
