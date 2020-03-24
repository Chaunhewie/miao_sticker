import Model from './Model'
import util from '../utils/util'

/**
 * Todo 模型类
 */
class Todo extends Model {
  constructor(model) {
    super()
    Object.assign(this, {
      title: '', // 标题
      content: '', // 内容
      createdAt: util.formatTime(new Date()), //创建时间
      level: 2, //优先级
      lastChangeAt: util.formatTime(new Date()), // 上次修改时间
      planToCompleteAt: util.formatTime(new Date()), // 计划完成时间
      completedAt: '', // 完成时间
      completed: false, // 是否完成
    }, model)

    // 日期格式化
    if (this.createdAt.constructor === Date) {
      this.createdAt = util.formatTime(this.createdAt)
    }
    if (this.planToCompleteAt.constructor === Date) {
      this.planToCompleteAt = util.formatTime(this.planToCompleteAt)
    }
    if (this.lastChangeAt.constructor === Date) {
      this.lastChangeAt = util.formatTime(this.lastChangeAt)
    }
  }
}

export default Todo