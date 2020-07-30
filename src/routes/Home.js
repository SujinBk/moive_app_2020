import React from 'react';
import axios from 'axios';
import Movies from '../components/Movies';
import './Home.css'

class Home extends React.Component {
 state = {
   isLoading : true,
   movies:[],
 }


 getMovies = async ()=> { // 자바스크립트에게 getMovies() 함수는 시간이 필요하고(동기화 시간)
   const{ // 구조 분해 할당
     data: {
       data:{movies},
     }
   } =await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating'); // axios 를 통해 api를 호출
 // axiox.get의 실행을 기다려 달라고 말해주는 거임 (실행 시간)

 this.setState({movies,isLoading:false});

  //  console.log(movies.data.data.movies) ;          
 }

 componentDidMount(){

  // 영화 데이터 로딩~~

  //  setTimeout(()=>{
  //    this.setState({isLoading : false });
  //  },6000);
  this.getMovies();
  
 }
 render(){
   const { isLoading,movies } = this.state

   return(
     <section className="container">
       {isLoading ? (
         <div className="loader">
           <span className="loader__text">Loading</span>
         </div>
       ):(
         <div className="movies">
           {movies.map(movies =>(
             <Movies 
             key={movies.id}
             id= {movies.id}
             year= {movies.year}
             title= {movies.title}
             summary= {movies.summary}
             poster= {movies.medium_cover_image}
             genres= {movies.genres}
             />
           ))}
         </div>
       )

       }
     </section>
   );
   
  }
}

export default Home;
