import Store from './Store'
/**
 * ListStore 基类
 */
class ListStore extends Store {
  constructor() {
    super()
    this.itemlist = []
    this.key = '__IL__' // 在使用时自行更改指定
    this.init_key = '__IL_I__' // 在使用时自行更改指定
  }

  /**
   * 初始化
   */
  __init() {
    let isInited = wx.getStorageSync(this.init_key)
    if (isInited) return
    console.log("first shot: init " + this.key)
    this.init_list()
    this.save()
    wx.setStorageSync(this.init_key, true)
  }

  /**
   * 如果对item_list有一开始的初始化展示，在此进行初始化设置
   */
  init_list() {}

  /**
   * 获取笔记列表
   */
  getItemlist() {
    return this.itemlist
  }

  /**
   * 根据UUID获取笔记
   */
  getItem(uuid) {
    return this.itemlist.find((item) => item.uuid === uuid)
  }

  /**
   * 根据索引获取笔记
   */
  getItemByIndex(index) {
    return this.itemlist[index]
  }

  /**
   * 获取笔记索引
   */
  getIndex(item) {
    return this.itemlist.indexOf(item)
  }

  /**
   * 设置笔记列表
   */
  setItemlist(itemlist) {
    this.itemlist = itemlist
  }

  /**
   * 添加笔记
   */
  addItem(item) {
    this.itemlist.push(item)
  }

  /**
   * 编辑笔记
   */
  editItem(uuid, newItem) {
    let item = this.getItem(uuid)
    if (item) Object.assign(item, newItem)
  }

  /**
   * 删除笔记
   */
  removeItem(uuid) {
    let item = this.getItem(uuid)
    let index = this.getIndex(item)
    if (index < 0) return false
    return this.removeItemByIndex(index)
  }

  /**
   * 根据索引删除笔记
   */
  removeItemByIndex(index) {
    this.itemlist.splice(index, 1)
    return true
  }

  /**
   * 读取
   */
  read() {
    let itemlist = wx.getStorageSync(this.key) || []
    this.itemlist = itemlist
    console.log("Store Read " + this.key)
    // todo 请求服务器同步数据
  }

  /**
   * 保存
   */
  save() {
    wx.setStorageSync(this.key, this.itemlist)
    console.log("Store Saved " + this.key)
    // todo 发送服务器同步数据
  }
}

export default ListStore