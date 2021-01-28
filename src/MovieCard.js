import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import {IMAGE_BASE_URL} from "./APIUtils";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    media : {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    image: {
        width: 128,
        height: 128,
        margin: 'auto'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
  }));

export default function MovieCard({title, releaseDate, overview, rating, numReviews, posterPath}) {
    const classes = useStyles();
    const noImage = posterPath === null;
    const imagePath = IMAGE_BASE_URL + posterPath;
    const hasReleaseDate = releaseDate && releaseDate.length > 0;
    const releaseYear =  new Date(releaseDate).getFullYear().toString();
    const stars = rating/2;
    const reviews = numReviews.toString() + " reviews";
    return (
        <React.Fragment>
            <Card className={classes.root}>
            <div className={classes.media}>
            {noImage ? (
                <Skeleton variant="rect" className={classes.image}/>
            ): (
                <CardMedia className={classes.image} image={imagePath}/>
            )}
            </div>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <Typography variant="overline">
                        {hasReleaseDate? (releaseYear): ("")}
                    </Typography>
                    <Typography variant="subtitle2">
                        {overview}
                    </Typography>
                    <Box component="span">
                        <Rating name="size-small" value={stars} precision={0.5} size="small" readOnly />
                        {reviews}
                    </Box>
                </CardContent>
            </div>
            </Card>
        </React.Fragment>
    );
}