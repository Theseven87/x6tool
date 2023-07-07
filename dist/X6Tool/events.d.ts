import { Graph } from '@antv/x6';
import contextMenu from './contextMenu';
export default class X6Events extends contextMenu {
    private _container;
    constructor(graph: Graph, container: HTMLElement);
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
    getSelectedCell(): import("@antv/x6").Cell<import("@antv/x6").Cell.Properties> | null;
}
