import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import React, { useEffect } from "react";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("");
      const data = await res.json();
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h1>Upcoming Movies</h1>
      {/* <GridList cols={6}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar title={tile.title} />
          </GridListTile>
        ))}
      </GridList> */}
    </React.Fragment>
  );
};

export default Home;
