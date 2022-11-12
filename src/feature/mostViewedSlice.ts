import axios from 'axios'
import { createSlice, PayloadAction ,createAsyncThunk  } from "@reduxjs/toolkit";

type mostViewed = {
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
    entities: mostViewed[]
    error: string
  }

  const initialState: InitialState = {
    loading: false,
    entities: [],
    error: ''
  }

  // Generates pending, fulfilled and rejected action types
  export const fetchMostViewed = createAsyncThunk('facebook/fetchMostViewed', () => {
    return axios
      .get('https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=PPxDJ83mDxYM88zwp7XzVQP3gWF1sLDy')
      .then(response => response.data.results)
  })

export const mostViewedSlice = createSlice({
  name: "mostViewed",
  initialState,
  reducers: { },
  extraReducers: builder => {
    builder.addCase(fetchMostViewed.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchMostViewed.fulfilled,
      (state, action: PayloadAction<mostViewed[]>) => {
        state.loading = false
        state.entities = action.payload
        state.error = ''
      }
    )
    builder.addCase(fetchMostViewed.rejected, (state, action) => {
      state.loading = false
      state.entities = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
  
});


export default mostViewedSlice.reducer;

