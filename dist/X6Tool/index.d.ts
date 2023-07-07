import { Graph } from '@antv/x6';
type stencilData = Array<{
    id: string;
    name: string;
    datas: Array<{
        id: string;
        label: string;
        file: string;
    }>;
}>;
type x6ToolParams = {
    minimap: boolean;
    edit: boolean;
};
export default class X6Tool {
    private _graph;
    _el: HTMLElement;
    private _events;
    private type;
    constructor(container: HTMLElement, options?: x6ToolParams);
    private _initGraph;
    /**
     *使用插件
     * @private
     * @memberof X6Tool
     */
    private _addPlugins;
    /**创建小地图 */
    private _createMinimap;
    /**
     * 初始化拖拽窗口
     * @param stencilContainer HTMLElement
     * @param groupData stencilData
     */
    initStencil(groupData: stencilData): void;
    getInstance(): Graph;
}
export {};
