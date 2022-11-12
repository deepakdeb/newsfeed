import axios from 'axios'
import { createSlice, PayloadAction ,createAsyncThunk  } from "@reduxjs/toolkit";

type mostEmailed = {
    id: string
    name: string
    section: string
    abstract: string
    title: string
    published_date: string
    url: string
    media: any
}

type InitialState = {
    loading: boolean
    entities: mostEmailed[]
    error: string
  }

  const initialState: InitialState = {
    loading: false,
    entities: [],
    error: ''
  }

  // Generates pending, fulfilled and rejected action types
  export const fetchMostEmailed = createAsyncThunk('facebook/fetchMostEmailed', () => {
    return axios
      .get('https://api.nytimes.com/svc/mostpopular/v2/emailed/30.json?api-key=PPxDJ83mDxYM88zwp7XzVQP3gWF1sLDy')
      .then(response => response.data.results)
  })

export const mostEmailedSlice = createSlice({
  name: "mostEmailed",
  initialState,
  reducers: { },
  extraReducers: builder => {
    builder.addCase(fetchMostEmailed.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchMostEmailed.fulfilled,
      (state, action: PayloadAction<mostEmailed[]>) => {
        state.loading = false
        state.entities = action.payload
        state.error = ''
      }
    )
    builder.addCase(fetchMostEmailed.rejected, (state, action) => {
      state.loading = false
      state.entities = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
  
});


export default mostEmailedSlice.reducer;

