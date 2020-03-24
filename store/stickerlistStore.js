import util from '../utils/util'
import ListStore from './ListStore'
import Sticker from '../models/Sticker'

/**
 * StickerlistStore 类
 */
class StickerlistStore extends ListStore {
  constructor() {
    super()
    this.itemlist = []
    this.key = '__SL__'
    this.init_key = '__SL_I__'
    this.__init()
  }

  /**
   * 如果未初始化过item_list，在此进行初始化提示
   */
  init_list() {
    this.itemlist = this.itemlist.concat([new Sticker({
      title: '欢迎使用TodoList笔记功能',
      content: 'TodoList笔记，随时随地记录您的思考和见闻，赶快用起来吧！'
    }), new Sticker({
      title: '如何新建笔记？',
      content: '点击下方 + 按钮，输入标题和内容后点击保存就可以新建一个笔记啦！'
    }), new Sticker({
      title: '如何编辑笔记？',
      content: '点击笔记卡片即可进入编辑页面编辑您的笔记'
    }), new Sticker({
      title: '《登鹳雀楼》',
      content: '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。'
    })])
  }
}

export default StickerlistStore