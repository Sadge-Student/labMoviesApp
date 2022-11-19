import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography";
import img from '../../images/film-poster-placeholder.png'
import Tilt from "react-parallax-tilt";

export default function ActorCard({actor, action}) {
    // console.log(actor);
    return (
        <Card sx={{ maxWidth: 345}}>
            <Tilt className="parallax-effect-glare-scale"
                  perspective={500}
                  glareEnable={true}
                  glareMaxOpacity={0.45}
                  transitionSpeed={1500}
                  >
                    <CardHeader 
                        title={
                            <Typography variant="h5" component="p"
                            sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            WebkitBoxOrient: "vertical",
                            }}
                        >
                        {actor.name}{" "}
                        </Typography>
                        }
                    />
                    <Link to={`/actors/${actor.id}`}>
                        <CardMedia
                        sx={{ height: 400 }}
                        image={
                            actor.profile_path
                            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                            : img
                        }
                        />
                    </Link>
                </Tilt>
        </Card>
    )
}