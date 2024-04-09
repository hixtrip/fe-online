import { defineStore } from 'pinia'

export const useBreadcrumbStore = defineStore('breadcrumb', {
    state: () => ({ breadcrumb: [] as string[] }),
    getters: {
        getBreadcrumb: (state) => state.breadcrumb,
    },
    actions: {
        add(name: string) {
            this.breadcrumb.push(name)
        },
    },
})
