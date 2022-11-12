import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchMostEmailed } from '../../feature/mostEmailedSlice'
import React, { useState } from 'react'


const MostEmailedNews = () => {

  const mostEmailed = useAppSelector(state => state.mostEmailed)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchMostEmailed())
  }, [])

  const [search, setSearch] = useState('');


  return (
    <>
    <input type="text" id="search_field" className="form-control" placeholder="Search by Title or Section"
     onChange={e => setSearch(e.target.value)}/>

    <div className="row mb-2">
      
      {mostEmailed.loading && <div>Loading...</div>}
      {!mostEmailed.loading && mostEmailed.error ? <div>Error: {mostEmailed.error}</div> : null}
      {!mostEmailed.loading && mostEmailed.entities.length ? (
        
        mostEmailed.entities.filter((val)=>{
          if(search == ''){
            return val;
          }else if(val.title.toLowerCase().includes(search.toLowerCase()) || val.section.toLowerCase().includes(search.toLowerCase()))
            {
              return val;
            }
          
        }).map(mostEmailed => (            
             <div key={mostEmailed.id} className="col-md-6">
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary">{mostEmailed.section}</strong>
                    <h4 className="mb-0">{mostEmailed.title}</h4>
                    <div className="mb-1 text-muted">{mostEmailed.published_date}</div>
                    <img src={mostEmailed.media[0]? mostEmailed.media[0]['media-metadata'][2]['url'] : ""} alt="" />
                    <p className="card-text mb-auto">{mostEmailed.abstract}</p>
                    <a href={mostEmailed.url} target="_blank" className="stretched-link">Read More..</a>
                  </div>
                </div>
            </div>
          ))
      ) : null}
    </div>
    </>
  )
}

export default MostEmailedNews