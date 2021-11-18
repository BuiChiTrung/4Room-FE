import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            userInfo: {},
            showEditForm: true,
            followStatus: false
        }
    },
    mutations: {
        updateUserInfo(state, newUserInfo) {
            state.userInfo = newUserInfo;
        },
        toggleEditForm(state) {
            state.showEditForm = !state.showEditForm
        },
        updateFollowStatus(state, newFollowStatus) {
            state.followStatus = newFollowStatus
        }
    }
})

export default store;
