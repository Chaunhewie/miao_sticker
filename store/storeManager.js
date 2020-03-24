import Store from './Store'
import TodolistStore from './todolistStore'
import StickerlistStore from './stickerlistStore'

/**
 * store 管理类
 */
class StoreManager extends Store {
  constructor() {
    super()
    this.todolistStore = null
    this.stickerlistStore = null
    this.__init()
  }

  /**
   * 初始化
   */
  __init() {
    this.todolistStore = new TodolistStore()
    this.stickerlistStore = new StickerlistStore()
  }
  /**
   * 读取
   */
  read() {
    this.todolistStore.read()
    this.stickerlistStore.read()
    console.info("store manager read.")
  }

  /**
   * 保存
   */
  save() {
    this.todolistStore.save()
    this.stickerlistStore.save()
    console.info("store manager saved.")
  }

  getStickerlistStore() {
    if (this.stickerlistStore == null) {
      this.stickerlistStore = new StickerlistStore()
    }
    return this.stickerlistStore
  }

  getTodolistStore() {
    if (this.todolistStore == null) {
      this.todolistStore = new StickerlistStore()
    }
    return this.todolistStore
  }

}

export default new StoreManager()