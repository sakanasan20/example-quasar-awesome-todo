import { uid } from 'quasar'

const state = {
  tasks: {
    'ID1': {
      name: 'Go to shop',
      completed: false,
      dueDate: '2023/07/07',
      dueTime: '18:00'
    },
    'ID2': {
      name: 'Get banana',
      completed: true,
      dueDate: '2023/07/08',
      dueTime: '19:00'
    },
    'ID3': {
      name: 'Get apple',
      completed: false,
      dueDate: '2023/07/09',
      dueTime: '16:00'
    }
  },
  search: ''
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    delete state.tasks[id]
  },
  addTask(state, payload) {
    Object.assign(state.tasks, payload)
  },
  setSearch(state, value) {
    state.search = value
  }
}

const actions = {
  updateTask({ commit }, payload) {
    commit('updateTask', payload)
  },
  deleteTask({ commit }, id) {
    commit('deleteTask', id)
  },
  addTask({ commit }, task) {
    let taskId = uid()
    let payload = {
      [taskId]: { ...task }
    }
    commit('addTask', payload)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  }
}

const getters = {
  tasksFiltered: (state) => {
    let tasksFiltered = {}
    if (state.search) {
      Object.keys(state.tasks).forEach(key => {
        let task = state.tasks[key]
        let taskNameLowerCase = task.name.toLowerCase()
        let searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return state.tasks
  },
  tasksTodo: (state, getters)  => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}

    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key]
      if (!task.completed) {
        tasks[key] = task
      }
    })

    return tasks
  },
  tasksCompleted: (state, getters)  => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}

    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key]
      if (task.completed) {
        tasks[key] = task
      }
    })

    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
