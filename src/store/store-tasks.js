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
  }
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
  }
}

const getters = {
  tasks: (state)  => {
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
