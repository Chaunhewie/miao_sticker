// components/todo/todo.js
import Todo from '../../models/Todo'
import util from '../../utils/util'

Component({
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    todo: {
      type: Todo,
      default: new Todo()
    },

    autoFocusTitle: {
      type: Boolean,
      default: false
    },

    disableChangeTitle: {
      type: Boolean,
      default: false
    },

    disableChangeDate: {
      type: Boolean,
      default: false
    },

    showDateType: {
      type: Number,
      default: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handleTitleTap(e) {
      this.triggerEvent('titleTap')
    },

    handleDateTap(e) {
      this.triggerEvent('dateTap')
    },

    handleCompletedChange(e) {
      let index = e.detail.dataset.index
      let checked = e.detail.data.checked
      this.data.todo.completed = checked
      if (checked) {
        this.data.todo.completedAt = util.formatTime(new Date())
      } else {
        this.data.todo.completedAt = ""
      }
      this.update()
    },

    handleTitleChange(e) {
      this.data.todo.title = e.detail.value
      this.update()
    },

    handleDateChange(e) {
      this.data.todo.date = e.detail.value.replace(/\-/g, '/')
      this.update()
    },

    update(data) {
      data = data || this.data
      this.setData(data)
      this.triggerEvent('change', this)
    }
  }
})