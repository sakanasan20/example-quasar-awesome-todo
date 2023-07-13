import { uid } from 'quasar'
import { auth, database } from 'boot/firebase'

const state = {
  tasks: {
    // 'ID1': {
    //   name: 'Go to shop',
    //   completed: false,
    //   dueDate: '2023/07/07',
    //   dueTime: '18:00'
    // },
    // 'ID2': {
    //   name: 'Get banana',
    //   completed: true,
    //   dueDate: '2023/07/08',
    //   dueTime: '19:00'
    // },
    // 'ID3': {
    //   name: 'Get apple',
    //   completed: false,
    //   dueDate: '2023/07/09',
    //   dueTime: '16:00'
    // }
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
      [taskId]: task
    }
    commit('addTask', payload)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  setSort({ commit }, value) {
    commit('setSort', value)
  }, 
  firebaseReadData({ commit }) {
    const userId = auth.currentUser.uid
    const userTasks = database.ref('tasks/' + userId)

    // triggered when first logged in and add new task
    userTasks.on('child_added', snapshot => {
      const taskId = snapshot.key
      const task = snapshot.val()
      const payload = {
        [taskId]: task
      }
      commit('addTask', payload)
    })

    // triggered when task updated
    userTasks.on('child_changed', snapshot => {
      const taskId = snapshot.key
      const task = snapshot.val()
      const payload = {
        id: taskId, 
        updates: task
      }
      commit('updateTask', payload)
    })

    // triggered when task deleted
    userTasks.on('child_removed', snapshot => {
      const taskId = snapshot.key
      commit('deleteTask', taskId)
    })
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
