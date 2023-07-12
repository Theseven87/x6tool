import { Graph } from '@antv/x6'
import X6Events from './events'

const svgNS = "http://www.w3.org/2000/svg";
const toolbarConfig = [
    {
        "label": "放大",
        "file": "data:image/png;base64,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",
        "key": "fangda"
    },
    {
        "label": "缩小",
        "file": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAUZklEQVR4nO3djXXTSNuH8f9UgKgApQKcCpArwFSwdgVxKlilgpgK1qkgTgUoFURUgFMBSgW8l1bw8C67fHlG0ox0/865js/uOcRBlm6NZCc4GWNmywaAMTNmA8CYGbMBYMyM2QAwZsZsABgzYzYAjJkxGwDGzJgNAGNmzAaAMTNmA8CYGbMBYMyM2QAwZsZsABgzYzYAjJkxGwDGzJgNgHRk9JLaxwW1cnV9UejXVPrqqK5WTQ29p/bRTJwjE5dc3YG++Fyu7nEMNR3VPba1g+EoMxmOzHgyekULKtSVgkpdNd1TQyZBjsywXlOhrgVNQU2Vuu7IJMIGQP9yfT3oVzQHB6rUDYOjTLQcmfBydQf9WtM5y5+qpr1sGETJkQkjoy8HfSHzXyp1w+CGTAQcGT8LuqAVZWR+rqEDvaWazEhsAJzuD1rLzva+KtmqYDSOzK/LqD3wt5TLhHSUVKq7V9CQGYAj83MZtcv8LWVk+tPQjt5SQ6ZHNgB+LCM78MfR0I5sEPTIBsD3/UlbysiMp6EdXZEJzJH5pxVdUy4Tk6OkDVUywTgynVzSX1TIxKxSNwiOMt4czV1GF1TKpKSU3R/wNvcBUKg76+dKwxPV1FBNrUpftf+voR/JaEFfFOq0/y+jBT2jFBzVrQYqmZM4mqOM/qQtxeqe6s8dNfxOXkjK1Q2EtlcUqx1dUUPmNziam0LxnfXbM3ulr9UUowUV+lpMK4WjbDXw2xzNyZ9UKg7v6fC5mlK0oNXnXlIMSnWrAfMLHM1BLumWFjSm9qDfqzvoj5qWXN0gWGv8YVDTGzrK/JCjqVvRX5TRGB5pRwc6ah5yddt9Sy9oDA1t6EDmOxxN2Z9Uahw3tJddkxbqVgV/0BhK2SXBdzmaooz+ohUN6Yl2n2vIfJXR9nPPaEgH2lBD5v9xNDW5hr/ef6RS3Rnf/FhGKyo17OVBTW/oKPM/jqZkQe8ooyE8Uik78E+1Vrf9XtAQGlpSTQaOpmJFf1FGfXuiLe1lQliru2x6Rn1raEMHmj1HU7BWd/AP4Yp21JAJJ6Mt/UlD2NBeM+codWsNc/Df01p2Ddm3XN2B+Yr6tqG9ZsxRytbq/+Bvl/tr2ZJxaCvaq//Lgg3tNVOOUnVNW+rTDbXP0ZAZXkY7+oP6dEnt88yOoxSt1e+Z/4lWVMnEoH0t9up3NbChvWbGUWrW6vfgv6O17Kwfm4z26v71pb5saK8ZcZSStfo9+C9pRyZeW7qmvmxor5lwlIoV3VIfnqiQfUAkFQuq1N8lwRs60OSlMgAW9I4yCu2eVtSQSUdGB3pFoTW0pJomzVHsckkPlFFoN7SWSdle/bxL0NA5HTVhjmKW0TtaUGiXtCOTvi1dU2g1LamhSXIUs1taUUhPtKW9zJSs1c8N4gO9oUmKeQCUCv+58Ccq1E12Mz0LqhT+5uAVlZogRzFa0S2FZAf/PCyoUvghsKRKE+MoNrnC3/Szg39eFlQp7BBo6JyOmhBHsXmgBYXyRIXs4J+bBVUKOwRqOqfJiG0AlAp73f9EhboXzszPgiqFHQJXVGoiHMWiUPeWXyh28JvWgh4opCVVmgBHMciofZFyhbOhvYwJ/xbhUd2lQENJcxSDHV1QKJfUfk1jvtjSNYXyltqvmbQYBkChsEv/G1rLmH/bK+zHhpdUKWGOxpTRA+UK454KGfN9lcL9ANFR0hkly9GYSoW76/9EuSZwXWZ6ldFR4d4ZuKJSiXI0llzSBwrlnGoy5mcW9EChnNFRCXI0lndUKIxL2pExv2pL1xRCpe5+QHIcjWFFtxTCHbVfz5jfdaDXFMKSKiXG0Rg+UC5/T5TLrvvNaTI6Ksz9gKO6S4GkOBpaqXA3/pZUyZjTreiWQrikHSXD0ZAy+kDto6+3tCVjfO0V5vMBDZ1R+5gER0MqFebs/0S5EtrQJmoZHRXmUuCKSiXC0VDajfyB2kdfb+hAxoSyolvy1dAZtY/RczSUUmHO/vdUyJjwKoX5lOAVlUqAoyFk9IHaR19ndJQx4eXq9lNfDZ1R+xg1R0PY0jX5uqJSxvRnRxfka0N7Rc7RENqpmsvPE+VKYKqapGV0lP8NwaO6VUDUHPVtrTC/jGFDexnTv7Vmss866ts7KuTnkXIZM5yjpBfko1L3YbVoOerTgh7I14b2MmY4a4VZBZxTTVFy1Ke9/D9h9Ui5jBneUf6rgBtaK1KO+pLRB2offWxoL2OGt5b/KqCh5xQlR31Zy3/jPVFGxoyh3feO8n9HYEN7RchRX95RIT9XVMqY8ZTy/wRrpUhvBjrqQ65u+e/rOTVkzFgy+ki+zuioyDjqw5auyccNrWXM+Pbyv5l9STuKiqM+PNCCfCypkjHjK9Rd0vqo6Zyi4ii0XP7L/0fKZUw8jvJ/S/CMjoqIo9C2dE0+LmlHxsRiS5Pbr/sYAAd6TT7O6Chj4pHLf2V7RyuKhqPQPpGP97QgY2JT00vy0ccxd7LQ38yKbsnHJe3ImNhs6Zp8vKEDRSH0ANjRBfl4Tg0ZE5tc/pcBb2lLUXAU0gMt6FTvyefPG9O3ml7Sqdo/f05RCDkAMvpIPq6olDHxKuX/0eDn1NDoHIWyolvycU41GROrBT2Qjzd0oNGFHACl/CbjE2VkTOwaekanuqJSEXAUSiW/36l+RysyJnYHek2nuqdCEXAUyifycUk7MiZ2W7omHyGPvZOF+iZy+b89ck41GRO7BT2QjzM6amSOQljRLfkI9b0YM4RP5OMNHWhUoQ66Un43AO+pkDHpqOR3z+uKSo3MUQjtJHtNp3pLWzImFTu6oFPd0YpGFWoAPNCCTrWhvYxJx5au6VQ1ndOoHIXwiXwsqZIx6Sjk/1uCHI0qxDeQ0UfyEeL7MGZon8jHc2poNCEOvEJ+k/CJMjImNQ09o1MtqdKIHPla0S2d6p4KGZOeSn7vBLyhA43Gka9Sfm8B3tGKjEnNgV7Tqa6o1Igc+SrlNwCuqJQx6SmV+L7vyNdefv9owhWVMiY9pfwGwA2tNSJHvir5XQctqVK6cnUfCCnk91mIOWmoUreEvqFUFfK7AX5PhUbkyFel+Q6Aa9qSOd1R3c2wmlJTyAbA3wfvKzrVkiql54EWZPw11A6BSmkpZAMg/Q9DnGBHF2TCaeicjkpHLr8fg2//zs9pNI58fSIfIb6HIeXye9HN993QWmn5RD4cjSbEkye9AU6wIzv79ye1/SHp/T/Ekye9AU7wQAsy/VhSpXQkvf+HePKkN8AJfP++5scuaUep8N0fRt3/Qzx50hvgBL5/X/NjNgAGFOLJk94AJ6jpJZl+LKlSOpLe/0M8edIb4AQ7uiDTj9T2h6T3/xBPnvQGOEEuexuwLze0Vlo+kQ9Hownx5L4b4Dk1lJId2SogrCda0FHpyOV/MnA0mhBPXtNLOtWSKqXH9+9tvmoP/kLdNk1JIfso8N8H7ys61ZIqpWlHF2RO90grqik1hWwA/H3wvqJTLalSunJ1PxFYyFYEv6o941fqfhx4r3St6JZOdU+FRuTI1172C0HMPJWyXwjivRGuqJQx6SmV+L7vyFcpv41wR+1SypjUHOg1neqKSo3Ika8V3dKp7qmQMemp5Hf/6w0daDSOfBXyuxPa0HMyJjUfKaNTLanSiBz5ajdAuyF8hPg+jBnaJ/LRnvgaGk2oA893QyypkjHpKOS38m05GlWob6Cml3SqDe1lTDq2dE2nek8LGpWjEA70mk71lrZkTCp2dEGnuqMVjSrUACjl91bgPRUyJh2V/N4BuKJSI3MUQjvJbslHqO/FmCF8Ih9LqjQyRyHk8v+xyHOqyZjYLeiBfJzRUSNzFMon8nFJOzImdlu6plM9UUajCzkAKvldE93RioyJ3YFe06nuqVAEHIVSyu9GYEPPyZjYfaSMTnVFpSLgKJQV3ZKPc6rJmFgt6IF8LKlSBByFktFH8nFFpYyJVym/lW7rOTU0Okch1fSSTtX++XMyJlYPtKBTvSefPx9U6AGwowvy8ZwaMiY2ufzf7n5LW4qCo5BWdEs+LmlHxsRmS9fkY0mVIuEotE/ko6ZzMiY2D7SgUz1RRtHoYwAc6DX5OKOjjIlHLv/l/x2tKBqOQtvSNfm4pB0ZE4st+e7XG9orIo5Cy+U/KY/qVgHGxKLdp3P5eU4NRcNRH2p6ST6WVMmY8RXy/+0/d7SiqDjqw5auyccNrWXM+Pby+8dvWhvaKzKO+pCrWzL5ek4NGTOWjD6Sryj3ZUd9qeT304GtKyplzHhK+X/0945WFB1HfVlL+ot8NHRG7aMxQ8voA7WPPt7QgaLjqC8ZHSU9Ix8b2suY4a3lfxJ7ovZYiJKjPu3lf/PkqG4VYMzQPlAuP29pS1Fy1KcFPZCvDe1lzHDW8j/7t87oqEg56lsl/5uBR3Ub0pihfKBcfu6pUMQc9W2tMJN0Q3sZ078tXZOvJVWKmKMhHCW9IB8NnVH7aExfMvpA7aOPR8oVOUdD2FKIiXpFpYzpz44uyNeG9oqcoyFkdJT/W4KtMzrKmPBydWd/X4+UKwGOhlLK/xNVrUrdtZUxob2jQv42tFcCHA0l5CrgDR3ImFBWdEu+HilXIhwNqVSYVUBDZ9Q+GuMrow/UPvra0F6JcDSkdgMfFWYVcENrGeNvL/9PrLYeKVdCHA2tVJhVQGtJlYw53YpuKYQN7ZUQR2M4yv9zAa2Gzqh9NOZ3ZfSB2kdf91QoMY7GUKi74xrCgdqbgsb8rnYfLBTGkiolxtFYKvn/jMAXl7QjY37Vlq4phDtaUXLGHAC5uuVXKOdUkzE/s6AHCuGJciV6GepoTKXC3RBsX4Azah+N+Z6MPlD7GMIl7ShJjsaUUU0vKIRK3bWYMd/TnvkXFMJ7CvW1RuFobIW6mzGh7NW9HWPMt/6itcI5p5qS5SgGO7qgUC6p/ZrGfLGlawrlikolzlEMMqrpBYWyob2M6c76f1Eo72lByXMUi0JhLwUaWlJNZr4W9EChPFGhiexXjmJSKty7Aq2GllSTmZ8FvaOMQrmkHU2Co9jU9JJCaWhJNZn5WFDog/+OVjQZjmKTqztYn1EoDS2pJjN9Cwp98D/SghqaDEcxWtEthdTQkmoy07Wg0Ad/65xqmhRHsSoV9n5Aq6El1WSmZ0HvKKOQNrTXBDmK2YFeU2gb2stMyVph3+r74obWmihHMcuoUtibgl9s6S2Z9F3QjkK7p0IT5ih2ubol+zMKba9uNWDS1Z711wrvPRXqLhsny1EKFlSpnyFQqfuFIg2ZdGT0jhYU2hMV6k48k5bKAGit6Jb60NCSajLxW1B78GcU2mwO/pajlKzVLfn6sqW3ZOJ1QTvqyznVNAupDYDWWv0OgQNtqCETj4xuqVB/LmlHs+EoRWv1OwQaekOVTAxW1L7eGfWppiU1NAuOUlUq/AeFvrVXd1aYzQ4RmYyuaa3h1LSkhibPUcrW6s4MfWp3hA0dyAxnRe1rm9HQalpSQ5PmKHVrdTtK3yp1g+Ao06dc3etZaFw1LamhyXI0BWt1O80QSnXvFEx6xxhBRn/SlmJR05IamiRHU7Givfr5sNC3GtrSDRl/f9COMopNTUtqaHIcTcmCKg0zBFpHdSuCGzK/rz3wS0m54lbTkhqaFEdTk6u7YfeShnJUtyPfUUPm+zJ6TaW61yoVNS2poclwNEUZ7dXtaENqaEdvqSHzVUYXtKWMUlTTkhqaBEdTVqq7sTSGvbpLg0rzVqhb6q81DTUtqaHkOZq6Fe013H2Bbx3VrQru6Kh5yNWtvraUaxyP1NBLCq2mJTWUNEdzkGv4+wL/paa9pjkMcnUH/VrdzdgxvaVSnUr9vO41LamhZDmak1LjXRJ8q6YD3VFNKVrQa1rRgsb2RGt12/WLjCrZEPhPjuamUHcWfkGxaHegSl33VFOMFvSKCnVlFIt2u62ooW9lVMmGwL84mqOMSnV3pWNVqdu52o7qdvAhtQf6gnJ1j4Xi1J71S3X3WX4ko0o2BP7B0ZwVim818CPtDlZTQzW1Kn31nhr6kVz//PsW6iwoowVllIJ7WqsbkL+i/XtVsiHwP47mLqMt/UkmDY/UvmYH+l0ZVbIh8DdHppOrWw28IhOvK9pRQ6fKqJINATky/1SoGwQvyMTjntb69eX+z2RUaeZDwJH5b1sqNd4HiEznkdrX4kChZVRpxkPAkfm+jLafe0ZmOI9UqluN9SmjSjMdAo7Mz2W0/dwzMv25px0daCgZVZrhEHBkfl1GKypl9whCu6dS3YE4howqzWwIODKnWavrFZnT3dBe3cE3towqzWgIODJ+FrSlFT0j83OPtKO9IjsgkFGlmQwBRyactbpsVfDfbmiv7gCLWUaVZjAEHJnwcnUrgrX62YlSckeHzzWUiowq9fP61bSkhkblyPQrVzcMCnU/Ojt1j1SpO+DbUpZRpQkPAUdmWCsq1NXHjjWGe6rUHfA1TUlGlfp5rWpaUkOjcGTGk1Gh7kZioTTuHTxSpW7nbas0fRlVmuAQcGTikqsbCF/K1c+O9zNPVNNRXZW6/25ojjKq1M9rUdOSGhqUI5OGjBaU0YJaubq++NkK4p6+1VBNDdXUUE3m3zKqNKEh4MgY8+syqjSRIeDIGPN7Mqo0gSHgyBjz+zKq1N8QOKfe2QAw5nQZVepnCOwlbahXjowxp+tzCCypUo8cGWP89DUE7mhFvbEBYEwYGVUKOwQaek69sQFgTDgZVQo7BHo9Rnv94sbMUOghcEZH9cSRMSaskEOg12O01y9uzIyFGAL3VKhHjowx/fAdAhvaq0eOjDH9OXUIvKcF9coGgDH9y6jSrw+BJ1rQUT2zAWDMcPaS/qAfeU8rOmoANgCMGVah7tfIF/rnr5FvD/wd7TUgGwDGjCf73FEjsQFgzIzZADBmxmwAGDNjNgCMmTEbAMbMmA0AY2bMBoAxM2YDwJgZswFgzIzZADBmxmwAGDNjNgCMmTEbAMbMmA0AY2bMBoAxM/Z/AVkuPUjbsyQAAAAASUVORK5CYII=",
        "key": "suoxiao"
    },
    {
        "label": "撤销",
        "file": "data:image/png;base64,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",
        "key": "chexiao"
    },
    {
        "label": "恢复",
        "file": "data:image/png;base64,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",
        "key": "huifu",
    },
    {
        "label": "导出",
        "file": "data:image/png;base64,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",
        "key": "export",
        children: [
            {
                "label": "导出svg",
                "key": "export-svg"
            },
            {
                "label": "导出png",
                "key": "export-png"
            },
            {
                "label": "导出jpeg",
                "key": "export-jpeg"
            },
        ]
    },
]
export default class ToolBar extends X6Events {
    constructor(graph: Graph, container: HTMLElement) {
        super(graph, container)
        this._createToolVarElement()
    }
    private _createToolVarElement() {
        const el = document.querySelector('.containerBox')!
        const container = document.createElement('div')
        container.className = 'toolbarContainer'
        el.appendChild(container)
        toolbarConfig.forEach(item => {
            const box = document.createElement('div')
            box.className = 'toolBox'
            const image = document.createElement('img')
            image.src = item.file
            image.alt = item.label;
            image.setAttribute('key', item.key)
            box.appendChild(image)

            const tips = document.createElement('span')
            tips.innerText = item.label;
            box.appendChild(tips)

            if (item.children && item.children.length) {
                const menu = document.createElement('ul')
                menu.className = 'toolMenu'
                item.children.forEach(child => {
                    const li = document.createElement('li')
                    li.innerText = child.label
                    li.setAttribute('key', child.key)
                    menu.appendChild(li)
                })
                box.appendChild(menu)
            }

            container.appendChild(box)
        })
        container.addEventListener('click', (ev) => {
            this._toolHandler(ev)
        })
    }
    private _toolHandler(ev: MouseEvent) {
        const target = ev.target as HTMLLIElement
        if (target) {
            const key = target.getAttribute('key')
            if (key) {
                switch (key) {
                    case 'fangda':
                        this.upZoom()
                        break;
                    case 'suoxiao':
                        this.downZoom()
                        break;
                    case 'chexiao':
                        this.undo()
                        break;
                    case 'huifu':
                        this.redo()
                        break;
                    case 'export-svg':
                        this.exportSVG()
                        break;
                    case 'export-png':
                        this.exportPNG()
                        break;
                    case 'export-jpeg':
                        this.exportJPEG()
                        break;

                    default:
                        break;
                }

            }
        }
    }
}