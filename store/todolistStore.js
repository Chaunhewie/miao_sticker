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
    this.key = '__TL__'
    this.init_key = '__TL_I__'
    this.__init()
  }

  /**
   * 如果未初始化过item_list，在此进行初始化提示
   */
  init_list() {
    var dateStr = util.formatTime(new Date())
    this.itemlist = this.itemlist.concat([new Todo({
      title: '欢迎使用TodoList',
      level: 1,
      createdAt: dateStr,
      lastChangeAt: dateStr,
      planToCompleteAt: dateStr,
      completed: false,
    }), new Todo({
      title: '点击左边勾选框完成一项任务',
      level: 1,
      createdAt: dateStr,
      lastChangeAt: dateStr,
      planToCompleteAt: dateStr,
      completed: false,
    }), new Todo({
      title: '点击标题或者时间可以编辑任务哦',
      level: 2,
      createdAt: dateStr,
      lastChangeAt: dateStr,
      planToCompleteAt: dateStr,
      completed: false,
    }), new Todo({
      title: '点击`创建时间`切换时间展示类型',
      level: 2,
      createdAt: "2020/03/24 10:00:00",
      lastChangeAt: "2020/03/24 10:10:23",
      planToCompleteAt: dateStr,
      completed: false,
    }), new Todo({
      title: '点击下面的 + 新建一项任务吧',
      level: 4,
      createdAt: "2020/03/24 14:21:43",
      lastChangeAt: "2020/03/24 14:52:52",
      planToCompleteAt: dateStr,
      completed: false,
    }), new Todo({
      title: '长按可删除任务',
      level: 4,
      createdAt: "2020/03/24 22:53:00",
      lastChangeAt: "2020/03/24 22:54:59",
      planToCompleteAt: dateStr,
      completed: false,
    }), new Todo({
      title: '这是一条已完成的任务1',
      level: 1,
      createdAt: "2020/03/23 21:00:30",
      lastChangeAt: "2020/03/24 13:21:14",
      planToCompleteAt: "2020/03/24 22:50:00",
      completedAt: "2020/03/24 21:20:00",
      completed: true,
    }), new Todo({
      title: '这是一条已完成的任务2',
      level: 2,
      createdAt: "2020/03/23 21:00:30",
      lastChangeAt: "2020/03/24 13:21:14",
      planToCompleteAt: "2020/03/24 22:50:00",
      completedAt: "2020/03/24 21:20:00",
      completed: true,
    }), new Todo({
      title: '这是一条已完成的任务3',
      level: 3,
      createdAt: "2020/03/23 21:00:30",
      lastChangeAt: "2020/03/24 13:21:14",
      planToCompleteAt: "2020/03/24 22:50:00",
      completedAt: "2020/03/24 21:20:00",
      completed: true,
    }), new Todo({
      title: '这是一条已完成的任务4',
      level: 4,
      createdAt: "2020/03/23 21:00:30",
      lastChangeAt: "2020/03/24 13:21:14",
      planToCompleteAt: "2020/03/24 22:50:00",
      completedAt: "2020/03/24 21:20:00",
      completed: true,
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