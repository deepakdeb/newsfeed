import { useEffect ,useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchMostShared } from '../../feature/mostSharedSlice'

const MostSharedNews = () => {

  const mostShared = useAppSelector(state => state.mostShared)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchMostShared())
  }, [])

  const [search, setSearch] = useState('');

  return (
    <>
    <input type="text" id="search_field" className="form-control" placeholder="Search by Title or Section"
     onChange={e => setSearch(e.target.value)}/>

    <div className="row mb-2">
      
      {mostShared.loading && <div>Loading...</div>}
      {!mostShared.loading && mostShared.error ? <div>Error: {mostShared.error}</div> : null}
      {!mostShared.loading && mostShared.entities.length ? (
        
        mostShared.entities.filter((val)=>{
          if(search == ''){
            return val;
          }else if(val.title.toLowerCase().includes(search.toLowerCase()) || val.section.toLowerCase().includes(search.toLowerCase()))
            {
              return val;
            }
          
        }).map(mostShared => (            
             <div key={mostShared.id} className="col-md-6">
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary">{mostShared.section}</strong>
                    <h4 className="mb-0">{mostShared.title}</h4>
                    <div className="mb-1 text-muted">{mostShared.published_date}</div>
                    <img src={mostShared.media[0]? mostShared.media[0]['media-metadata'][2]['url'] : ""} alt="" />
                    <p className="card-text mb-auto">{mostShared.abstract}</p>
                    <a href={mostShared.url} target="_blank" className="stretched-link">Read More..</a>
                  </div>
                </div>
            </div>
          ))
      ) : null}
    </div>
    </>
  )
}

export default MostSharedNews