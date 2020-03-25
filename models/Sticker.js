import Model from './Model'
import util from '../utils/util'

/**
 * Sticker 模型类
 */
class Sticker extends Model {
  constructor(model) {
    super()
    Object.assign(this, {
      title: '',
      content: '',
      disabled: false,
      createdAt: util.formatTime(new Date()), // 创建时间
      lastChangeAt: util.formatTime(new Date()), // 上次修改时间
    }, model)

    // 日期格式化
    if (this.createdAt.constructor === Date) {
      this.createdAt = util.formatTime(this.createdAt)
    }
    if (this.lastChangeAt.constructor === Date) {
      this.lastChangeAt = util.formatTime(this.lastChangeAt)
    }
  }
}

export default Sticker