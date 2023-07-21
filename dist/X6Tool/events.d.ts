import { Graph, Cell } from '@antv/x6';
import contextMenu from './contextMenu';
export default class X6Events extends contextMenu {
    private _container;
    private _defaultEdgeStyle;
    private _edgeTools;
    constructor(graph: Graph, container: HTMLElement, changeEdgeColorCallBack: Function);
    /**
 * 鼠标事件
 */
    private _mouseEventNode;
    /**
     * 获取当前指针指向的元素的class包含x6-node的父元素
     * @param dom HTMLElement
     * @param callBack Function
     * @returns
     */
    private _findParent;
    /**
     * 更改连接桩的状态
     * @param target HTMLElement
     * @param show boolean
     */
    private _updatePorts;
    private _onAddCell;
    updateEdgeColor(edge: Cell, color: string): void;
}
