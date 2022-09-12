import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (thunkAPI) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
    const data = await response.json();
    return data;
  }
);

export const getData = createAsyncThunk(
  'post/getData',
  async ({ id }, thunkAPI) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return response.json();
  }
);
export const getPost = createAsyncThunk('post/getPost', async ({ id }) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  );
});
export const deleteData = createAsyncThunk(
  'post/deleteData',
  async ({ id }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  }
);
export const createData = createAsyncThunk(
  'post/createData',
  async ({ values }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: values.title,
        body: values.body,
      }),
    }).then((res) => res.json());
  }
);
export const updateData = createAsyncThunk(
  'post/updateData',
  async ({ id, title, body }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
      }),
    }).then((res) => res.json());
  }
);
export const DataSlice = createSlice({
  name: 'data',
  initialState: {
    data: {},
    loading: false,
    status: 'idle',
    body: '',
    edit: false,
    error: null,
  },
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload.edit;
      state.body = action.payload.body;
    },
  },
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [getData.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
    },
    [getData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
      state.data = action.payload;
    },
    [getData.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteData.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
    },
    [deleteData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
      state.data = action.payload;
    },
    [deleteData.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },
    [createData.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
    },
    [createData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
      state.data = action.payload;
    },
    [createData.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },
    [updateData.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
    },
    [updateData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
      state.data = action.payload;
    },
    [updateData.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { setEdit } = DataSlice.actions;

export default DataSlice.reducer;
