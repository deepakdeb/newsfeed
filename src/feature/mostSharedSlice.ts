import axios from 'axios'
import { createSlice, PayloadAction ,createAsyncThunk  } from "@reduxjs/toolkit";

type mostShared = {
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
    entities: mostShared[]
    error: string
  }

  const initialState: InitialState = {
    loading: false,
    entities: [],
    error: ''
  }

  // Generates pending, fulfilled and rejected action types
  export const fetchMostShared = createAsyncThunk('facebook/fetchMostShared', () => {
    return axios
      .get('https://api.nytimes.com/svc/mostpopular/v2/shared/30/facebook.json?api-key=PPxDJ83mDxYM88zwp7XzVQP3gWF1sLDy')
      .then(response => response.data.results)
  })

export const mostSharedSlice = createSlice({
  name: "mostShared",
  initialState,
  reducers: { },
  extraReducers: builder => {
    builder.addCase(fetchMostShared.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchMostShared.fulfilled,
      (state, action: PayloadAction<mostShared[]>) => {
        state.loading = false
        state.entities = action.payload
        console.log('state.entities')
        console.log(state.entities)
        state.error = ''
      }
    )
    builder.addCase(fetchMostShared.rejected, (state, action) => {
      state.loading = false
      state.entities = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
  
});


export default mostSharedSlice.reducer;

