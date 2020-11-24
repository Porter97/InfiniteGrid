import agent from './agent';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
  },
  image: {
      filter: 'grayscale(50%)',
      transition: 'filter .25s linear',
      "&:hover": {
          filter: 'grayscale(0)',
      }
  }
}));


export default function InfiniteScroll() {
    const classes = useStyles();

    const [data, setData] = useState({body: []});
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    useEffect(() => {
        fetchData();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchData();
    }, [isFetching]);


    async function fetchData() {
        const result = await agent.Images.get(page);
        if (!!result.body && !!result.body.length) {
            setData({body: [...data.body, ...result.body]});
            setPage(page + 1);
            setIsFetching(false);
        }
    }

    function Loading() {
        return(
            <div style={{top: '46%', left: '43%', position: 'absolute'}}>
                <ReactLoading type={"cubes"} color={"#dc004e"}/>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {
                !!data.body.length ? data.body.map((tile, index) => (
                    <GridListTile key={index} cols={(index % 10) ? 1 : 3} rows={(index % 20) ? 1 : 2}>
                        <img className={classes.image} src={tile} alt="none"/>
                    </GridListTile>
                    ))
                    :
                <Loading/>
            }
            </GridList>
            { !!isFetching &&
                <Loading/>}
        </div>
    )

}