import React from 'react';
import {useState, useEffect, createRef} from 'react'
import {Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import classNames from 'classnames';
import useStyles from './styles.js';

const NewsCard = ({article :{description, publishedAt, source, title, url, urlToImage}, i, activeArticle}) => {
    const classes = {useStyles};
    const [elRefs, setelRefs] = useState([]);
    const scrollToRef = (ref)=> window.scroll(0, ref.current.offsetTop - 50);

   useEffect(() => {
       setelRefs((refs)=>(
           Array(20).fill().map((_, j)=>refs[j] || createRef())
   ))
       
   }, [])

   useEffect(() => {
       if(i===activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle])
       }
       
   }, [i, activeArticle, elRefs])


    return (
        <div>
            {/* <Card className = {classes.card}> */}
            <Card ref = {elRefs[i]} className = {classNames(classes.card, activeArticle===i ? classes.activeCard :null)}>
                <CardActionArea href = {url} target = "_blank">
                <CardMedia  component="img" className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} title={title} />
                    <div className = {classes.details}>
                        <Typography variant = "body2" color = 'textSecondary' component = "h2"> {(new Date(publishedAt)).toDateString()}</Typography>
                        <Typography variant = "body2" color = 'textSecondary' component = "h2"> {source.name} </Typography>
                    </div>
                    <Typography className = {classes.title} gutterBottom = "h5">{title} </Typography>
                    <CardContent>
                        <Typography variant = "body2" color = "textSecondary">{description} </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className = {classes.cardActions}>
                    <Button size = "small" color = "primary">Learn More </Button>
                    <Typography variant = "h5" color = "textSecondary"> {i+1} </Typography>
                </CardActions>
            </Card>
        </div>
    )
}

export default NewsCard
