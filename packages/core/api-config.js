export default {
    fetchPolls: {
        path: '/api/v001/polls',
        method: 'GET',
    },

    fetchPoll: {
        path: '/api/v001/polls/:id',
        method: 'GET',
    },

    createPoll: {
        path: '/api/v001/polls',
        method: 'POST',
    },

    deletePoll: {
        path: '/api/v001/polls/:id',
        method: 'DELETE',
    },
};