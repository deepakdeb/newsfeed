import { useEffect , useState} from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchMostViewed } from '../../feature/mostViewedSlice'

const MostViewedNews = () => {

  const mostViewed = useAppSelector(state => state.mostViewed)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchMostViewed())
  }, [])

  const [search, setSearch] = useState('');

  return (
    <>
    <input type="text" id="search_field" className="form-control" placeholder="Search by Title or Section"
     onChange={e => setSearch(e.target.value)}/>

    <div className="row mb-2">
      
      {mostViewed.loading && <div>Loading...</div>}
      {!mostViewed.loading && mostViewed.error ? <div>Error: {mostViewed.error}</div> : null}
      {!mostViewed.loading && mostViewed.entities.length ? (
        
        mostViewed.entities.filter((val)=>{
          if(search == ''){
            return val;
          }else if(val.title.toLowerCase().includes(search.toLowerCase()) || val.section.toLowerCase().includes(search.toLowerCase()))
            {
              return val;
            }
          
        }).map(mostViewed => (            
             <div key={mostViewed.id} className="col-md-6">
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary">{mostViewed.section}</strong>
                    <h4 className="mb-0">{mostViewed.title}</h4>
                    <div className="mb-1 text-muted">{mostViewed.published_date}</div>
                    <img src={mostViewed.media[0]? mostViewed.media[0]['media-metadata'][2]['url'] : ""} alt="" />
                    <p className="card-text mb-auto">{mostViewed.abstract}</p>
                    <a href={mostViewed.url} target="_blank" className="stretched-link">Continue reading</a>
                  </div>
                </div>
            </div>
          ))
      ) : null}
    </div>
    </>
  )
}

export default MostViewedNews