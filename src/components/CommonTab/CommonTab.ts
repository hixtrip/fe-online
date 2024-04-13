export default class CommonTab extends HTMLElement {
    // tab header
    private tabHeadersContainer: HTMLElement;
    // tab panel
    private tabPanels: NodeListOf<Element>;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
        :host {
          display: block;
        }
        
        .tabs-header {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          border-bottom: 1px solid #ccc;
        }
        
        .tabs-header li {
          padding: 10px 20px;
          cursor: pointer;
          border: 1px solid #ccc;
          margin-bottom: -1px;
          background-color: #e0e0e0;
          transition: background-color 0.3s ease;
        }
        
        .tabs-header li.active,
        .tabs-header li:hover {
          background-color: #fff;
          border-bottom-color: transparent;
        }
        
        ::slotted(tab-panel) {
          display: none;
          padding: 10px;
          border: 1px solid #ccc;
          border-top: none;
        }
        
        ::slotted(tab-panel.active) {
          display: block;
        }
      </style>
            <ul class="tabs-header"></ul>
            <slot></slot>
        `;
        this.tabHeadersContainer = this.shadowRoot.querySelector('.tabs-header');
    }

    connectedCallback() {
        this.tabPanels = this.querySelectorAll('tab-panel');
        this.initializeTabs();
    }

    /**
     * @description 初始化 tab
     */
    initializeTabs() {
        this.tabHeadersContainer.innerHTML = '';

        // 获取 panel 进行初始化
        this.tabPanels.forEach((panel, index) => {
            panel.id = `tab-panel-${index}`;
            const title = panel.getAttribute('title');
            const tabHeader = document.createElement('li');

            tabHeader.textContent = title;
            tabHeader.setAttribute('selected', 'false');
            tabHeader.setAttribute('tabindex', index.toString());

            tabHeader.onclick = () => this.selectTab(index);

            this.tabHeadersContainer.appendChild(tabHeader);

            // 默认选中第一个
            if (index === 0) {
                tabHeader.classList.add('active');
                tabHeader.setAttribute('selected', 'true');
                panel.classList.add('active');
            }
        });
    }

    /**
     * @description tab select 事件逻辑处理
     * @param index tab panel index
     */
    selectTab(index: number) {
        const tabs = this.tabHeadersContainer.querySelectorAll('li');

        // 设置 active panel
        tabs.forEach((tab, tabIndex) => {
            const isSelected = tabIndex === index;
            tab.classList.toggle('active', isSelected);
            tab.setAttribute('selected', `${isSelected}`);
            this.tabPanels[tabIndex].classList.toggle('active', isSelected);
        });

        // dispatch select 事件
        const event = new CustomEvent(`select`, {
            detail: { index },
            bubbles: true
        });
        this.dispatchEvent(event);
    }
}

customElements.define('common-tab', CommonTab);
