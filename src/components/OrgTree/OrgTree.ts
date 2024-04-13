
interface TreeNode {
    id: number;
    name: string;
    children?: TreeNode[];
}

export default class OrgTree extends HTMLElement {
    /// 使用any数组来表示树的数据结构，而不是TreeNode类。
    private _data: TreeNode[] = [];
    // 使用Set<string>来跟踪展开的节点。
    private _expandedNodes: Set<number> = new Set();
    // 跟踪当前选中的节点。
    private _selectedNode: number | null = null;

    // 观察"数据"属性用于响应从外部传递的数据变化。
    static get observedAttributes() {
        return ['data'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.initializeTemplate();
    }

    /**
     * @description 组件添加到DOM后将会调用此方法，渲染初始树结构
     */
    connectedCallback() {
        this.render();
    }

    /**
     * @description 当观察的属性发生变化时调用，用于处理外部传入的新数据
     * @param attrName 属性名
     * @param oldVal   新值
     * @param newVal   旧值
     */
    attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string | null) {
        if (attrName === 'data') {
            this.data = newVal && JSON.parse(newVal);
        }
    }

    /**
     * @description 初始化组件的内部HTML结构和样式
     */
    private initializeTemplate() {
        const style = `
      <style>
        :host {
          display: block;
          user-select: none;
        }
        ul {
          padding-left: 20px;
          margin: 0;
        }
        li {
          list-style: none;
        }
        .toggle {
          cursor: pointer;
        }
        .selected {
          background-color: lightblue;
        }
      </style>
    `;

        const html = `
      ${style}
      <ul class="tree-view"></ul>
    `;

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = html;
        }
    }

    /**
     * @description 设置器，用于接受外部数据并触发重新渲染
     * @param treeData
     */
    set data(treeData: Array<TreeNode>) {
        this._data = treeData;
        this.render();
    }

    /**
     * @description 负责全局渲染树节点的方法
     */
    private render() {
        const rootUl = this.shadowRoot?.querySelector('.tree-view');
        rootUl?.replaceChildren(...this.createTreeFragment(this._data));
    }

    /**
     * @description 根据当前的树数据构建一个文档片段，里面包含所有的ul和li元素
     * @param treeData
     * @return DocumentFragment
     */
    private createTreeFragment(treeData: Array<TreeNode>): DocumentFragment[] {
        return treeData.map(nodeData => this.createNodeElement(nodeData));
    }

    /**
     * @description 创建单个DOMNode元素来表现树节点
     */
    private createNodeElement(treeNode: TreeNode): Node {
        const li = document.createElement('li');
        const toggleSpan = document.createElement('span');
        const labelSpan = document.createElement('span');

        labelSpan.textContent = treeNode.name;
        labelSpan.classList.add('toggle');

        // 设置切换符号，如果当前节点在_setExpandedNodes中，则为展开状态。
        toggleSpan.textContent = this._expandedNodes.has(treeNode.id) ? '▼ ' : (treeNode.children && treeNode.children.length > 0) ? '► ' : '';

        // 如果当前节点被选中，则添加选中样式。
        if (this._selectedNode === treeNode.id) {
            labelSpan.classList.add('selected');
        }

        // 注册点击事件来处理节点展开/收起及选中功能。
        labelSpan.addEventListener('click', (event) => {
            event.stopPropagation();
            this.handleNodeClick(treeNode);
        });

        labelSpan.insertAdjacentElement('afterbegin', toggleSpan);
        li.appendChild(labelSpan);

        // 如果当前节点被展开，则递归渲染子节点。
        if (this._expandedNodes.has(treeNode.id) && treeNode.children) {
            const childrenUl = document.createElement('ul');
            const fragment = document.createDocumentFragment();
            fragment.append(...this.createTreeFragment(treeNode.children));
            childrenUl.appendChild(fragment);
            li.appendChild(childrenUl);
        }

        return li;
    }

    /**
     * @description 处理树节点的点击事件
     * @param treeNode
     */
    private handleNodeClick(treeNode: TreeNode): void {
        // 如果节点有子元素则切换展开/收起状态，否则设置为选中状态。
        if (treeNode.children && treeNode.children.length > 0) {
            if (this._expandedNodes.has(treeNode.id)) {
                this._expandedNodes.delete(treeNode.id);
            } else {
                this._expandedNodes.add(treeNode.id);
            }
        } else {
            this._selectedNode = this._selectedNode === treeNode.id ? null : treeNode.id;
            // dispatch select 事件
            const event = new CustomEvent(`select`, {
                detail: { id: treeNode.id },
                bubbles: true,
            });
            this.dispatchEvent(event);
        }
        requestAnimationFrame(() => this.render())
    }
}

if (!customElements.get('org-tree')) {
    customElements.define('org-tree', OrgTree);
}




