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
    },
    'ID4': {
      name: 'Go to shop',
      completed: false,
      dueDate: '2023/07/07',
      dueTime: '18:00'
    },
    'ID5': {
      name: 'Get banana',
      completed: true,
      dueDate: '2023/07/08',
      dueTime: '19:00'
    },
    'ID6': {
      name: 'Get apple',
      completed: false,
      dueDate: '2023/07/09',
      dueTime: '16:00'
    },
    'ID7': {
      name: 'Go to shop',
      completed: false,
      dueDate: '2023/07/07',
      dueTime: '18:00'
    },
    'ID8': {
      name: 'Get banana',
      completed: true,
      dueDate: '2023/07/08',
      dueTime: '19:00'
    },
    'ID9': {
      name: 'Get apple',
      completed: false,
      dueDate: '2023/07/09',
      dueTime: '16:00'
    },
    'ID10': {
      name: 'Go to shop',
      completed: false,
      dueDate: '2023/07/07',
      dueTime: '18:00'
    },
    'ID11': {
      name: 'Get banana',
      completed: true,
      dueDate: '2023/07/08',
      dueTime: '19:00'
    },
    'ID12': {
      name: 'Get apple',
      completed: false,
      dueDate: '2023/07/09',
      dueTime: '16:00'
    },
    'ID13': {
      name: 'Go to shop',
      completed: false,
      dueDate: '2023/07/07',
      dueTime: '18:00'
    },
    'ID14': {
      name: 'Get banana',
      completed: true,
      dueDate: '2023/07/08',
      dueTime: '19:00'
    },
    'ID15': {
      name: 'Get apple',
      completed: false,
      dueDate: '2023/07/09',
      dueTime: '16:00'
    },
    'ID': {
      name: 'Go to shop',
      completed: false,
      dueDate: '2023/07/07',
      dueTime: '18:00'
    },
    'ID': {
      name: 'Get banana',
      completed: true,
      dueDate: '2023/07/08',
      dueTime: '19:00'
    },
    'ID': {
      name: 'Get apple',
      completed: false,
      dueDate: '2023/07/09',
      dueTime: '16:00'
    }
  },
  search: '',
  sort: 'name'
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
  },
  setSort(state, value) {
    state.sort = value
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
  },
  setSort({ commit }, value) {
    commit('setSort', value)
  }
}

const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {}
    let keyOrdered = Object.keys(state.tasks).sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase()
      let taskBProp = state.tasks[b][state.sort].toLowerCase()
      if (taskAProp > taskBProp) {
        return 1
      } else if (taskAProp < taskBProp) {
        return -1
      } else {
        return 0
      }
    })
    keyOrdered.forEach(key => tasksSorted[key] = state.tasks[key])
    return tasksSorted;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted
    let tasksFiltered = {}
    if (state.search) {
      Object.keys(tasksSorted).forEach(key => {
        let task = tasksSorted[key]
        let taskNameLowerCase = task.name.toLowerCase()
        let searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return tasksSorted
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
