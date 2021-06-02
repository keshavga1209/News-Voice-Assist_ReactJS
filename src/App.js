import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import React, {useState,useEffect} from 'react';
import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles.js';

const alanKey = 'dfd5dec54cb8563db5cc7393c7d5a5ec2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
  const [newsArticles, setnewsArticles] = useState([]);
  const [activeArticle, setactiveArticle] = useState(-1);
  const classes = useStyles();
  useEffect(() => {
    alanBtn(
      {
        key: alanKey,
        onCommand:({command, articles, number})=>{
          if(command==='newHeadlines'){
            //console.log("hi");
            setnewsArticles(articles); 
            setactiveArticle(-1);
          }
          else if(command==='highlight'){
            setactiveArticle((prevArticle)=>prevArticle +1 )
          }
          else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];
  
            if (parsedNumber > articles.length) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          }
        }
      }
    )
  }, [])

                                       
  return (
    <div className="App">
    <div className = {classes.logoContainer}>
    <img src = "https://cdn.dribbble.com/users/2501555/screenshots/5965492/flo-motion_5sec.gif" className = {classes.logoContainer} alt = "HII" />
    </div>
    <br/><br/>
     <NewsCards articles = {newsArticles} activeArticle = {activeArticle}/> 
    </div>
  );
}

export default App;
