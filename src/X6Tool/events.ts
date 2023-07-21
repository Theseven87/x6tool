import { Graph,Cell,EdgeView, Edge } from '@antv/x6'
import contextMenu from './contextMenu'


export default class X6Events extends contextMenu {
    private _container: HTMLElement
    private _defaultEdgeStyle:{[key:string]:string}
    private _edgeTools:Cell.ToolItem[]
    // private _selectedEvent:CustomEvent;
    constructor(graph: Graph, container: HTMLElement,changeEdgeColorCallBack:Function) {
        super(graph, container)
        this._edgeTools = [
            {
                name: 'vertices',
                args: {
                    stopPropagation: false
                }
            },
            {
                name: 'button-remove',
                args: { distance: -80 }
            },
            {
                name: 'button',
                args: {
                  markup: [
                    {
                      tagName: 'circle',
                      selector: 'button',
                      attrs: {
                        r: 18,
                        stroke: '#fe854f',
                        strokeWidth: 2,
                        fill: 'white',
                        cursor: 'pointer',
                      },
                    },
                    {
                      tagName: 'text',
                      textContent: 'Btn B',
                      selector: 'icon',
                      attrs: {
                        fill: '#fe854f',
                        fontSize: 10,
                        textAnchor: 'middle',
                        pointerEvents: 'none',
                        y: '0.3em',
                      },
                    },
                  ],
                  distance: -40,
                //   onClick({ view }: { view: EdgeView }) {
                //     const edge = view.cell
                //     changeEdgeColorCallBack && changeEdgeColorCallBack(edge)
                //   },
                onClick({view,e}:{view: EdgeView,e:MouseEvent}){
                    const edge = view.cell
                    changeEdgeColorCallBack && changeEdgeColorCallBack(e,edge)
                }
                },
              }
        ]
        this._container = container
        this._defaultEdgeStyle = {}
        // this._selectedEvent = this._regesiterEvent()
        this._mouseEventNode()
        this._onAddCell()
    }

    /**
 * 鼠标事件
 */
    private _mouseEventNode() {
        //点击容器
        this._container.addEventListener('click', () => {
            this.hiddenContextMenu()
        })

        //鼠标移入节点
        this._graph.on('node:mouseenter', (ev) => {
            this._findParent(ev.e.target.parentNode, (dom: HTMLElement) => this._updatePorts(dom, true))
        })

        //鼠标离开节点
        this._graph.on('node:mouseleave', () => {
            this._updatePorts(document.getElementById('container')!, false)
        })

        //右键节点
        this._graph.on('node:contextmenu', ({ e, cell }) => {
            this.selectedCell = cell
            this.showContextMenu(1, { x: e.clientX + 40, y: e.clientY })
            this.hiddenContextMenu(2)
        })

        //右键空白区域
        this._graph.on('blank:contextmenu', ({ e, x, y }) => {
            this.hiddenContextMenu(1)
            this.contexMenuX = x
            this.contexMenuY = y
            this.showContextMenu(2, { x: e.clientX + 40, y: e.clientY })
        })


        //移入边
        this._graph.on('edge:mouseenter',({edge})=>{
            if(!this._defaultEdgeStyle[edge.id]){
                this._defaultEdgeStyle[edge.id] = edge.getAttrByPath('line/stroke')||'#C2C8D5'
            }
            edge.setAttrByPath('line',{stroke:'#1890ff'})
            edge.addTools(this._edgeTools)
        })

        //移出边
        this._graph.on('edge:mouseleave',({edge})=>{
            edge.setAttrByPath('line',{stroke:this._defaultEdgeStyle[edge.id]})
            edge.removeTools()
        })

        this._graph.on('cell:selected',({cell})=>{
            this.selectedCell = cell
            if(cell.data.type==='edge'){
                cell.setAttrByPath('line',{stroke:'#1890ff',strokeWidth:2.5})
            }
            const selectedEvent = new CustomEvent('selected',{detail:cell})
            dispatchEvent(selectedEvent)
        })
        this._graph.on('cell:unselected',({cell})=>{
            this.selectedCell = null
            if(cell.data.type==='edge'){
                cell.setAttrByPath('line',{stroke:this._defaultEdgeStyle[cell.id],strokeWidth:2})
            }
            const selectedEvent = new CustomEvent('selected',{detail:null})
            dispatchEvent(selectedEvent)
        })
    }

    /**
     * 获取当前指针指向的元素的class包含x6-node的父元素
     * @param dom HTMLElement
     * @param callBack Function
     * @returns 
     */
    private _findParent(dom: HTMLElement, callBack: Function) {
        if (dom && dom.classList) {
            if (dom.classList.value.includes('x6-node')) {
                callBack && callBack(dom)
            } else {
                this._findParent(dom.parentNode as HTMLElement, callBack)
            }
        }
    }

    /**
     * 更改连接桩的状态
     * @param target HTMLElement
     * @param show boolean
     */
    private _updatePorts(target: HTMLElement, show: boolean) {
        const ports = target.getElementsByClassName('x6-port-body')
        for (let i = 0, len = ports.length; i < len; i += 1) {
            let element = ports[i] as HTMLElement
            element.style.visibility = show ? 'visible' : 'hidden'
        }
    }


    //向画布中增加元素时修改元素大小，并且改变label位置
    private _onAddCell() {
        this._graph.on('node:added', ({ node }) => {
            this.hiddenContextMenu()
            node.size(80, 80)
        })
    }

    public updateEdgeColor(edge:Cell,color:string){
        this._defaultEdgeStyle[edge.id] = color
        edge.setAttrByPath('line',{stroke:color})
    }

}