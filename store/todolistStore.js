import util from '../utils/util'
import ListStore from './ListStore'
import Todo from '../models/Todo'

/**
 * TodolistStore 类
 */
class TodolistStore extends ListStore {
  constructor() {
    super()
    this.itemlist = []
    this.key = '__todolist__'
    this.init_key = '__todolist_inited__'
    this.__init()
  }

  /**
   * 如果未初始化过item_list，在此进行初始化提示
   */
  init_list() {
    this.itemlist = this.itemlist.concat([new Todo({
      title: '欢迎使用TodoList',
      completed: false,
      level: 1,
      createdAt: new Date()
    }), new Todo({
      title: '点击左边勾选框完成一项任务',
      completed: false,
      level: 1,
      createdAt: new Date()
    }), new Todo({
      title: '点击标题可以编辑任务哦',
      completed: false,
      level: 2,
      createdAt: new Date()
    }), new Todo({
      title: '点击右边日期可修改日期',
      completed: false,
      level: 3,
      createdAt: new Date()
    }), new Todo({
      title: '点击下面的 + 新建一项任务吧',
      completed: false,
      level: 4,
      createdAt: new Date()
    }), new Todo({
      title: '长按可删除任务',
      completed: false,
      level: 4,
      createdAt: new Date()
    }), new Todo({
      title: '这是一条已完成的任务1',
      completed: true,
      level: 4,
      date: new Date('2017/11/18'),
      createdAt: new Date(),
      completedAt: new Date('2017/11/18')
    }), new Todo({
      title: '这是一条已完成的任务2',
      completed: true,
      level: 4,
      date: new Date('2017/11/19'),
      createdAt: new Date(),
      completedAt: new Date('2017/11/19')
    }), new Todo({
      title: '这是一条已完成的任务3',
      completed: true,
      level: 4,
      date: new Date('2017/11/20'),
      createdAt: new Date(),
      completedAt: new Date('2017/11/20')
    }), new Todo({
      title: '这是一条已完成的任务4',
      completed: true,
      level: 4,
      date: new Date('2017/11/20'),
      createdAt: new Date(),
      completedAt: new Date('2017/11/20')
    })])
  }

  /**
   * 获取未完成的 todo 列表
   */
  getUncompletedItemlist() {
    return this.itemlist.filter(item => !item.completed)
  }

  /**
   * 获取已完成的 todo 列表
   */
  getCompletedItemlist() {
    return this.itemlist.filter(item => item.completed)
  }

  /**
   * 获取今天完成的 todo 列表
   */
  getTodayCompletedItemlist() {
    let itemlist = this.getCompletedItemlist()
    let date = util.formatTime(new Date())
    return itemlist.filter(item => item.completedAt === date)
  }

  /**
   * 获取日期统计数据
   */
  getStatisticsByDate() {
    let result = []
    let itemlist = this.getCompletedItemlist()
    let temp = {}
    itemlist.forEach((item) => {
      temp[item.completedAt] = temp[item.completedAt] ? temp[item.completedAt] + 1 : 1
    })
    for (let key in temp) {
      result.push({
        completedAt: key,
        count: temp[key]
      })
    }
    result = result.sort((a, b) => (a.completedAt > b.completedAt))
    return result
  }
}

export default TodolistStore