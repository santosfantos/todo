import axios from 'axios'
import Todo from '../models/todo';

const instance = axios.create({
    headers: {
        'content-type': 'application/json',
    }
});

instance.interceptors.response.use(
    res => res,
    err => {
        throw new Error(err.response.data.message);
    }
);

const responseHandle = (data: string) => {
    console.log('Transforming data...');

    let response;

    try {
        response = JSON.parse(data);

        if(response.status === 'success') {
            response = response.data;
        }
        else {
            throw Error(`Request failed with reason -  ${data}`)
        }
    }
    catch(error) {
        throw Error(`Error parsing response JSON data - ${JSON.stringify(error)}`)
    }

    return response;
};

const api = {
    getTodos:   () =>
                    instance({
                        'method':          'GET',
                        'url':             `/todo`,
                        transformResponse: [(data) => {
                            return responseHandle(data);
                        }],
                    }),
    addTodo:    (todo: Todo) =>
                    instance({
                        'method':          'POST',
                        'url':             `/todo`,
                        data:              {
                            todo: todo
                        },
                        transformResponse: [(data) => {
                            return responseHandle(data);
                        }],
                    }),
    deleteTodo: (id: String) =>
                    instance({
                        'method':          'DELETE',
                        'url':             `/todo/${id}`,
                        data:              {
                            todoId: id
                        },
                        transformResponse: [(data) => {
                            return responseHandle(data);
                        }],
                    }),
}

export default api;
