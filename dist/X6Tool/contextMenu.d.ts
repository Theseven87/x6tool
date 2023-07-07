import { Graph, Cell } from '@antv/x6';
import shortKeys from './shortKeys';
export default class X6ContextMenu extends shortKeys {
    private _el;
    protected selectedCell: Cell | null;
    protected cellContextMenu: HTMLElement;
    protected blankContextMenu: HTMLElement;
    protected contexMenuX: number | null;
    protected contexMenuY: number | null;
    constructor(graph: Graph, container: HTMLElement);
    private _createCellContextMenu;
    private _createBlankContextMenu;
    /**
 * 隐藏菜单
 * @param {1|2|undefined} type 1:节点菜单; 2:空白菜单; 否则全部菜单
 */
    hiddenContextMenu(type?: 1 | 2 | undefined): void;
    /**
 * 显示菜单
 * @param {1|2} type 1:节点菜单; 2:空白菜单
 * @param {x:number,y:number} options 菜单显示位置
 */
    showContextMenu(type: 1 | 2, options: {
        x: number;
        y: number;
    }): void;
}
