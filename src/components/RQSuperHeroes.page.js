import {useQuery} from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () =>{
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) =>{
    console.log('perform side effect after data fetching', data);
  }

  const onError = (error) =>{
    console.log('perform side effect after encountering error', error);
  }

  const {isLoading, data, isError, error, isFetching, refetch,} = useQuery('super-heroes', 
  fetchSuperHeroes,
  {
    onSuccess,
    onError,
    select: (data) =>{
      const superHeroNames = data.data.map(hero => hero.name);
      return superHeroNames;
    }
  })

  if(isLoading || isFetching){
    return <h2>Loading...</h2>
  }

  if(isError){
    return <h2>{error.message}</h2>
  }

  return( 
  <>
  <h2>React Query Super Heroes Page</h2>
  <button onClick={refetch}>Fetch heroes</button>
  {/* {
    data?.data.map(hero =>{
      return <div key={hero.name}>{hero.name}</div>
    })
  } */}

  {
    data.map(heroName => {
      return <div key={heroName}>{heroName}</div>
    })
  }
  </>
  )
}
