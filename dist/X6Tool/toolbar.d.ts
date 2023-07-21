import { Graph } from '@antv/x6';
import X6Events from './events';
export default class ToolBar extends X6Events {
    constructor(graph: Graph, container: HTMLElement, changeEdgeColorCallBack: Function);
    private _createToolVarElement;
    private _toolHandler;
}
