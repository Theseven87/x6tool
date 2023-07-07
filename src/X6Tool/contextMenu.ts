import { Graph, Cell } from '@antv/x6'
import shortKeys from './shortKeys'
export default class X6ContextMenu extends shortKeys {

    private _el: HTMLElement
    protected selectedCell: Cell | null
    protected cellContextMenu: HTMLElement
    protected blankContextMenu: HTMLElement
    protected contexMenuX: number | null
    protected contexMenuY: number | null
    constructor(graph: Graph, container: HTMLElement) {
        super(graph)
        this._el = container
        this.selectedCell = null
        this.contexMenuX = null
        this.contexMenuY = null
        this.cellContextMenu = this._createCellContextMenu()
        this.blankContextMenu = this._createBlankContextMenu()
    }


    private _createCellContextMenu() {
        const actions = [
            {
                label: '复制',
                value: '1',
                shortKey: 'ctrl + c'
            },
            {
                label: '删除',
                value: '2',
                shortKey: 'backspace'
            },
            {
                label: '上移一层',
                value: '3',
                shortKey: 'alt + +'
            },
            {
                label: '下移一层',
                value: '4',
                shortKey: 'alt + -'
            },
            {
                label: '置顶层',
                value: '5',
                shortKey: 'ctrl+alt++'
            },
            {
                label: '置底层',
                value: '6',
                shortKey: 'ctrl+alt+-'
            },
            {
                label: '显示/隐藏名称',
                value: '7',
            },
        ]
        const div = document.createElement('div')
        div.className = 'x6Tool-contextMenu'
        const ul = document.createElement('ul')
        actions.forEach(item => {
            const li = document.createElement('li')
            const text = document.createElement('span')
            text.textContent = item.label
            li.appendChild(text)
            if (item.shortKey) {
                const shorKey = document.createElement('span')
                shorKey.className = 'shortkey'
                shorKey.textContent = item.shortKey
                li.appendChild(shorKey)
            }
            li.setAttribute('value', item.value)
            ul.appendChild(li)
        })
        div.appendChild(ul)
        this._el.appendChild(div)

        div.addEventListener('click', (ev) => {
            const cell = this.selectedCell
            if (cell){
                const menuValue = (ev.target as HTMLElement).getAttribute('value')
                switch (Number(menuValue)) {
                    case 1:
                        if (cell) {
                            this.copyCells([cell])
                        }
                        break;
                    case 2:
                        if(cell){
                            this.removeCells([cell])
                        }
                        break;
                    case 3:
                        if (cell) {
                            this.upZIndex(cell)
                        }
                        break;
                    case 4:
                        if (cell) {
                            this.downZIndex(cell)
                        }
                        break;
                    case 5:
                        if (cell) {
                            this.toFront(cell)
                        }
                        break;
                    case 6:
                        if (cell) {
                            this.toBack(cell)
                        }
                        break;
                    case 7:
                        if (cell) {
                            const labelAttr = cell.getAttrByPath('label') as { visibility: 'show' | 'hidden' }
                            if (labelAttr.visibility && labelAttr.visibility == 'hidden') {
                                cell.setAttrByPath('label', { visibility: 'show' })
                            } else {
                                cell.setAttrByPath('label', { visibility: 'hidden' })
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        })
        return div
    }

    private _createBlankContextMenu() {
        const actions = [
            {
                label: '粘贴',
                value: '1',
                shortKey: 'ctrl + v'
            },
            {
                label: '放大',
                value: '2',
                shortKey: 'ctrl+shift++'
            },
            {
                label: '缩小',
                value: '3',
                shortKey: 'ctrl+shift--'
            },
            {
                label: '撤销',
                value: '4',
                shortKey: 'ctrl+z'
            },
            {
                label: '恢复',
                value: '5',
                shortKey: 'ctrl+y'
            },
        ]
        const div = document.createElement('div')
        div.className = 'x6Tool-contextMenu'
        const ul = document.createElement('ul')
        actions.forEach(item => {
            const li = document.createElement('li')
            const text = document.createElement('span')
            text.textContent = item.label
            li.appendChild(text)
            if (item.shortKey) {
                const shorKey = document.createElement('span')
                shorKey.className = 'shortkey'
                shorKey.textContent = item.shortKey
                li.appendChild(shorKey)
            }
            li.setAttribute('value', item.value)
            ul.appendChild(li)
        })
        div.appendChild(ul)
        this._el.appendChild(div)

        div.addEventListener('click', (ev) => {
            const menuValue = (ev.target as HTMLElement).getAttribute('value')
            switch (Number(menuValue)) {
                case 1:
                    this.pasteCells({ x: this.contexMenuX! + 20, y: this.contexMenuY! })
                    break;
                case 2:
                    this.upZoom()
                    break;
                case 3:
                    this.downZoom()
                    break;
                case 4:
                    this.undo()
                    break;
                case 5:
                    this.redo()
                    break;
                default:
                    break;
            }
        })
        return div
    }


    /**
 * 隐藏菜单
 * @param {1|2|undefined} type 1:节点菜单; 2:空白菜单; 否则全部菜单
 */
    public hiddenContextMenu(type?: 1 | 2 | undefined) {
        if (!type) {
            this.cellContextMenu.style.visibility = 'hidden'
            this.blankContextMenu.style.visibility = 'hidden'
        }

        if (type == 1) {
            this.cellContextMenu.style.visibility = 'hidden'
        }

        if (type == 2) {
            this.blankContextMenu.style.visibility = 'hidden'
        }
    }


    /**
 * 显示菜单
 * @param {1|2} type 1:节点菜单; 2:空白菜单
 * @param {x:number,y:number} options 菜单显示位置
 */
    public showContextMenu(type: 1 | 2, options: { x: number, y: number }) {

        if (type == 1) {
            this.cellContextMenu.style.visibility = 'visible'
            this.cellContextMenu.style.left = options.x + 'px'
            this.cellContextMenu.style.top = options.y + 'px'
        }

        if (type == 2) {
            this.blankContextMenu.style.visibility = 'visible'
            this.blankContextMenu.style.left = options.x + 'px'
            this.blankContextMenu.style.top = options.y + 'px'
        }
    }
}