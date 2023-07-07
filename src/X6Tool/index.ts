import { Graph, Node } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'  //对齐线
import { MiniMap } from '@antv/x6-plugin-minimap'   //小地图    
import { Scroller } from '@antv/x6-plugin-scroller' //滚动条
import { Stencil } from '@antv/x6-plugin-stencil'   //拖拽
import { Transform } from '@antv/x6-plugin-transform'   //节点变形
import { Keyboard } from '@antv/x6-plugin-keyboard'     //快捷键
import { Selection } from '@antv/x6-plugin-selection'   //选择
import { Clipboard } from '@antv/x6-plugin-clipboard'   //复制粘贴
import { History } from '@antv/x6-plugin-history' //撤销重做
import { registerEdge,inserCss } from './utils'     //工具
import X6Events from './events' //事件处理
const ports = {
    groups: {
        port1: {
            position: 'left',
            attrs: {
                circle: {
                    r: 6,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        port2: {
            position: 'top',
            attrs: {
                circle: {
                    r: 6,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        port3: {
            position: 'right',
            attrs: {
                circle: {
                    r: 6,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        port4: {
            position: 'bottom',
            attrs: {
                circle: {
                    r: 6,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
    },
    items: [
        {
            id: 'port1',
            group: 'port1',
        },
        {
            id: 'port2',
            group: 'port2',
        },
        {
            id: 'port3',
            group: 'port3',
        },
        {
            id: 'port4',
            group: 'port4',
        },
    ],
}

type stencilData = Array<{
    id: string,
    name: string,
    datas: Array<{
        id: string,
        label: string,
        file: string
    }>
}>

type x6ToolParams = {
    minimap: boolean,
    edit:boolean
}

const defaultParams:x6ToolParams = {
    minimap:true,
    edit:true
}
export default class X6Tool {
    private _graph: Graph
    public _el: HTMLElement
    private _events
    private type:'view'|'edit'
    constructor(container: HTMLElement, options?: x6ToolParams) {
        const opt = Object.assign({},defaultParams,options)
        registerEdge()
        this._el = container
        this._el.style.cssText = 'position:relative;display:flex;'
        this.type = opt.edit?'edit':'view'
        this._graph = this._initGraph()
        this._addPlugins()

        if(opt.minimap){
            this._createMinimap()
        }

        // const cellContextMenu = this._createCellContextMenu()
        if(opt.edit){
            this._events = new X6Events(this._graph,container)
        }
        // new X6Shortkeys(this._graph)

        inserCss()
    }

    private _initGraph() {
        const graphDom = document.createElement('div')
        graphDom.style.cssText = 'flex:1;'
        // graphDom.style.cssText = 'width:100%;height:100%;'
        this._el.appendChild(graphDom)
        const graph: Graph = new Graph({
            container: graphDom,
            autoResize: true,
            connecting: {
                router: 'manhattan', //直角连线
                connector: {
                    name: 'rounded', //转角使用圆角
                    args: {
                        radius: 8,
                    },
                },
                snap: {
                    radius: 50, //连线距离节点20px自动吸附
                },
                createEdge() {
                    return graph.createEdge({
                        shape: 'dag-edge',
                        attrs: {
                            line: {
                                strokeWidth: 2,
                            },
                        },
                        zIndex: -1,
                    })
                },
                allowNode: false, //是否允许边连接到节点
                allowBlank: false, //是否允许连线到空白区域
                highlight: true,
            },
            interacting:()=>{
                if(this.type=='view'){
                    return {
                        nodeMovable:false
                    }
                }
                return {
                    nodeMovable:true
                }
            },
            grid: {
                size: 10,
                visible: true,
                type: 'mesh',
                args: {
                    color: '#ccc', // 主网格线颜色
                    thickness: 1, // 主网格线宽度
                },
            },
            background: {
                color: '#F2F7FA',
            },
            panning: true, //平移
            mousewheel: true //滚轮缩放
        })

        
        return graph
    }

    /**
     *使用插件
     * @private
     * @memberof X6Tool
     */
    private _addPlugins() {

        this._graph.use(
            new Scroller({  //滚动条，小地图需要
                enabled: true,
                pageVisible: true,
                pageBreak: true,
                pannable: true,
            }),

        )

        if(this.type =='edit'){
            this._graph.use(
                new Snapline({ //水平线 
                    enabled: true,
                }),
            )
            this._graph.use(
                new Keyboard({  //快捷键
                    enabled: true,
                }),
            )
    
            this._graph.use(
                new Selection({
                    enabled: true,
                }),
            )
    
            this._graph.use(
                new Clipboard({
                    enabled: true,
                }),
            )
    
            this._graph.use(
                new History({
                    enabled: true,
                }),
            )
    
            this._graph.use(
                new Transform({ //节点变形
                    resizing: {
                        enabled: true,
                        minWidth: 80,
                        maxWidth: 400,
                        minHeight: 80,
                        maxHeight: 400,
                        orthogonal: false
                    },
                    rotating: {
                        enabled: true
                    }
                }),
            )
        }
    }

    /**创建小地图 */
    private _createMinimap() {
        const minimapDom = document.createElement('div');
        minimapDom.style.cssText = `position:absolute;bottom:20px;right:20px`
        this._el.appendChild(minimapDom)

        this._graph.use(
            new MiniMap({  //小地图
                container: minimapDom,
                width: 200,
                height: 160,
            }),
        )

        if(this.type =='edit'){
            minimapDom.addEventListener('click',()=>{
                this._events!.hiddenContextMenu()
            })
            minimapDom.addEventListener('contextmenu',()=>{
                this._events!.hiddenContextMenu()
            })
        }
    }


    /**
     * 初始化拖拽窗口
     * @param stencilContainer HTMLElement
     * @param groupData stencilData
     */
    public initStencil(groupData: stencilData) {
        const stencilContainer = document.createElement('div')
        stencilContainer.style.cssText = 'width:16rem;position:relative;'
        this._el.insertBefore(stencilContainer,this._el.firstChild)
        const stencil = new Stencil({
            title: '模型',
            search(cell, keyword) {
                return cell.data.label.indexOf(keyword) !== -1
            },
            placeholder: '请输入元件名称搜索',
            notFoundText: '未找到元件',
            collapsable: true,
            target: this._graph,
            groups: groupData,
            stencilGraphHeight: 0,
            stencilGraphPadding: 30,
            layoutOptions: {
                columnWidth: 60,
                rowHeight: 40,
            },
        })

        stencilContainer?.appendChild(stencil.container)

        groupData.forEach(item => {
            const data: Node[] = []
            item.datas.forEach(child => {
                const img = this._graph.createNode({
                    shape: 'image',
                    height: 40,
                    width: 40,
                    data: {
                        label: child.label
                    },
                    attrs: {
                        image: {
                            'xlink:href':child.file,
                        },
                        label:{
                            ref:'image',
                            text:child.label,
                            refX:'50%',
                            refY:'100%',
                            y:'20'
                        },
                    },
                    ports,
                })
                data.push(img)
            })
            stencil.load(data, item.name)
        })

        if(this.type =='edit'){
            stencilContainer.addEventListener('click',()=>{
                this._events!.hiddenContextMenu()
            })
            stencilContainer.addEventListener('contextmenu',()=>{
                this._events!.hiddenContextMenu()
            })
        }

    }

    //获取graph实例
    public getInstance(): Graph {
        return this._graph
    }
}