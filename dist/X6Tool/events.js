import contextMenu from './contextMenu';
export default class X6Events extends contextMenu {
    constructor(graph, container) {
        super(graph, container);
        this._container = container;
        this._mouseEventNode();
        this._onAddCell();
    }
    /**
 * 鼠标事件
 */
    _mouseEventNode() {
        //点击容器
        this._container.addEventListener('click', () => {
            this.hiddenContextMenu();
        });
        //鼠标移入节点
        this._graph.on('node:mouseenter', (ev) => {
            this._findParent(ev.e.target.parentNode, (dom) => this._updatePorts(dom, true));
        });
        //鼠标离开节点
        this._graph.on('node:mouseleave', () => {
            this._updatePorts(document.getElementById('container'), false);
        });
        //右键节点
        this._graph.on('node:contextmenu', ({ e, cell }) => {
            this.selectedCell = cell;
            this.showContextMenu(1, { x: e.clientX + 40, y: e.clientY });
            this.hiddenContextMenu(2);
        });
        //右键空白区域
        this._graph.on('blank:contextmenu', ({ e, x, y }) => {
            this.hiddenContextMenu(1);
            this.contexMenuX = x;
            this.contexMenuY = y;
            this.showContextMenu(2, { x: e.clientX + 40, y: e.clientY });
        });
    }
    /**
     * 获取当前指针指向的元素的class包含x6-node的父元素
     * @param dom HTMLElement
     * @param callBack Function
     * @returns
     */
    _findParent(dom, callBack) {
        if (dom && dom.classList) {
            if (dom.classList.value.includes('x6-node')) {
                callBack && callBack(dom);
            }
            else {
                this._findParent(dom.parentNode, callBack);
            }
        }
    }
    /**
     * 更改连接桩的状态
     * @param target HTMLElement
     * @param show boolean
     */
    _updatePorts(target, show) {
        const ports = target.getElementsByClassName('x6-port-body');
        for (let i = 0, len = ports.length; i < len; i += 1) {
            let element = ports[i];
            element.style.visibility = show ? 'visible' : 'hidden';
        }
    }
    //向画布中增加元素时修改元素大小，并且改变label位置
    _onAddCell() {
        this._graph.on('node:added', ({ node }) => {
            this.hiddenContextMenu();
            node.size(80, 80);
        });
    }
    getSelectedCell() {
        return this.selectedCell;
    }
}
