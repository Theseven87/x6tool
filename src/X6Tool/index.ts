import { Graph, Node, Cell, Edge } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'  //对齐线
import { MiniMap } from '@antv/x6-plugin-minimap'   //小地图    
import { Scroller } from '@antv/x6-plugin-scroller' //滚动条
import { Stencil } from '@antv/x6-plugin-stencil'   //拖拽
import { Transform } from '@antv/x6-plugin-transform'   //节点变形
import { Keyboard } from '@antv/x6-plugin-keyboard'     //快捷键
import { Selection } from '@antv/x6-plugin-selection'   //选择
import { Clipboard } from '@antv/x6-plugin-clipboard'   //复制粘贴
import { History } from '@antv/x6-plugin-history' //撤销重做
import { Export } from '@antv/x6-plugin-export' //导出
import '@easylogic/colorpicker/dist/colorpicker.css';
import {ColorPicker} from '@easylogic/colorpicker'
// import ColorPickerUI from '@easylogic/colorpicker' 
import { registerEdge, inserCss } from './utils'     //工具
// import X6Events from './events' //事件处理
import ToolBar from './toolbar'
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
    minimap?: boolean,
    edit?: boolean
}

const defaultParams: x6ToolParams = {
    minimap: true,
    edit: true
}

const colorpicker =new ColorPicker({
    color: 'blue', // init color code 
    type : 'ColorPicker', // or 'sketch',  default type is 'chromedevtool'
    outputFormat : 'hex'
})
export default class X6Tool {
    private _graph: Graph
    public _el: HTMLElement
    private _events
    private type: 'view' | 'edit'
    constructor(container: HTMLElement, options?: x6ToolParams) {
        const opt = Object.assign({}, defaultParams, options)
        registerEdge()
        this._el = container
        this._el.style.cssText = 'display:flex;'
        this.type = opt.edit ? 'edit' : 'view'
        this._graph = this._initGraph()
        this._addPlugins()
        if (opt.minimap) {
            this._createMinimap()
        }

        if (opt.edit) {
            this._events = new ToolBar(this._graph, container,this.changeEdgeColor.bind(this))
        }
        inserCss()
    }

    private _initGraph() {
        const boxDom = document.createElement('div')
        boxDom.className = 'containerBox'
        const parentDiv = document.createElement('div')
        parentDiv.style.cssText = 'width:100%;height:100%;'
        const graphDom = document.createElement('div')
        graphDom.style.cssText = 'width:100%;height:100%;'
        parentDiv.appendChild(graphDom)
        boxDom.appendChild(parentDiv)
        this._el.appendChild(boxDom)
        const graph: Graph = new Graph({
            connecting: {
                createEdge() {
                    return graph.createEdge({
                        shape: 'dag-edge',
                        data: {
                            type: 'edge'
                        },
                        zIndex: -1,
                    })
                },
                router: 'orth', //直角连线
                connector: {
                    name: 'rounded', //转角使用圆角
                    args: {
                        radius: 8,
                    },
                },
                snap: {
                    radius: 50, //连线距离节点20px自动吸附
                },
                allowNode: false, //是否允许边连接到节点
                allowBlank: false, //是否允许连线到空白区域
                allowLoop:false,    //是否允许创建循环连线
                highlight: true,
            },
            container: graphDom,
            autoResize: true,
            scaling: { min: 0.5, max: 4 },
            interacting: () => {
                if (this.type == 'view') {
                    return {
                        nodeMovable: false
                    }
                }
                return {
                    nodeMovable: true
                }
            },
            grid: {
                size: 20,
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
            panning: false, //平移
            mousewheel: {
                enabled: true,
            }
        })

        const pannable = document.querySelector('.x6-graph-pannable') as HTMLElement
        setTimeout(() => {
            // pannable.style.cssText = 'width:100%;height:100%;'
            graph.center()
        }, 300)
        return graph
    }

    /**
     *使用插件
     * @private
     * @memberof X6Tool
     */
    private _addPlugins() {
        if (this.type == 'edit') {

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
                new Export(),
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
        this._graph.use(
            new Scroller({  //滚动条，小地图需要
                enabled: true,
                pannable: true,
                pageVisible: false,
                pageBreak: false,
            }),
        )
        const minimapDom = document.createElement('div');
        minimapDom.style.cssText = `position:absolute;bottom:20px;right:20px`
        this._el.appendChild(minimapDom)

        this._graph.use(
            new MiniMap({  //小地图
                container: minimapDom,
                width: 200,
                height: 160,
                padding: 10
            }),
        )

        if (this.type == 'edit') {
            minimapDom.addEventListener('click', () => {
                this._events!.hiddenContextMenu()
            })
            minimapDom.addEventListener('contextmenu', () => {
                this._events!.hiddenContextMenu()
            })
        }
    }


    /**
     * 初始化拖拽窗口
     * @param stencilContainer HTMLElement
     * @param groupData stencilData
     */
    public async initStencil(groupData: stencilData) {
        const stencilContainer = document.createElement('div')
        stencilContainer.style.cssText = 'width:16rem;position:relative;'
        this._el.insertBefore(stencilContainer, this._el.firstChild)
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
        for (let i = 0; i < groupData.length; i++) {
            const data: Node[] = []

            const item = groupData[i]
            for (let j = 0; j < item.datas.length; j++) {
                const child = item.datas[j]
                const imageData = await this.tansform2Base64(child.file)
                const img = this._graph.createNode({
                    shape: 'image',
                    height: 40,
                    width: 40,
                    data: {
                        label: child.label,
                        type: 'cell'
                    },
                    attrs: {
                        image: {
                            'href': imageData
                        },
                        label: {
                            ref: 'image',
                            text: child.label,
                            refX: '50%',
                            refY: '100%',
                            y: '20'
                        },
                    },
                    ports,
                })

                data.push(img)
            }
            stencil.load(data, item.name)
        }

        if (this.type == 'edit') {
            stencilContainer.addEventListener('click', () => {
                this._events!.hiddenContextMenu()
            })
            stencilContainer.addEventListener('contextmenu', () => {
                this._events!.hiddenContextMenu()
            })
        }

    }

    private tansform2Base64(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = url
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0);
                const data = canvas.toDataURL();
                resolve(data)
            }
            img.onerror = () => {
                reject('图片加载失败')
            }
        })
        // return url
    }

    //获取graph实例
    public getInstance(): Graph {
        return this._graph
    }

    public selectedCell() {
        const cells = this._graph.getSelectedCells()
        if (cells && cells.length) {
            return cells[0]
        }
        return null
    }

    public getSimpleData() {
        const data = this._graph.toJSON()
        const cells = data.cells
        console.log(cells)
        const res: Cell.Properties[] = []
        cells.forEach(item => {
            const tempItem: any = {
                data: item.data,
                zIndex: item.zIndex,
                id: item.id,
                shape: item.shape
            }
            if(item.attrs){
                tempItem.attrs = item.attrs
            }
            if (item.data.type == 'edge') {
                tempItem.source = item.source
                tempItem.target = item.target
            }

            if (item.data.type == 'cell') {
                tempItem.position = item.position
            }
            res.push(tempItem)
        })
        return res
    }

    public getFullData() {
        const data = this._graph.toJSON()
        const cells = data.cells
        return cells
    }

    public importData(data: Cell.Properties[]) {
        data.forEach((item: any) => {
            if (item.data.type === 'edge') {
                if (this.type == 'edit') {
                    item.attrs = {
                        line: {
                            strokeWidth: 2
                        }
                    }
                    item.router = {
                        name: "manhattan"
                    }
                }
            }
            if (item.data.type === 'cell') {
                item.ports = ports
                item.size = {width: 80, height: 80}
                item.visible = true
            }
        })
        this._graph.fromJSON({ cells: data })
    }

    public changeEdgeColor(e:MouseEvent,edge:Cell){
        const defaultColor =  edge.getAttrByPath('line/stroke')||'#C2C8D5'
        colorpicker.show({
            left :e.clientX,
            top : e.clientY,
            hideDelay : 0    // default value is 2000.  color picker don't hide automatically when hideDelay is zero
        }, defaultColor, (newColor:string)=>{
            this._events?.updateEdgeColor(edge,newColor)
        })
    }
}