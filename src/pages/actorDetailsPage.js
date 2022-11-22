import React from "react";
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import { getActor } from "../api/tmdb-api";
import PageTemplate from "../components/templateActorPage";
import ActorDetails from "../components/actorDetails";
import Spinner from "../components/spinner";

const ActorDetailsPage = (props) => {
  const { id } = useParams();

  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", { id: id}],
    getActor
  );

  if (isLoading)
    return <Spinner />;
  
  if (isError)
    return <h1>{error.message}</h1>;

  return (
    <>
      {actor ? (
        <>
          <PageTemplate actor={actor}>
            <ActorDetails actor={actor} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};
export default ActorDetailsPage;