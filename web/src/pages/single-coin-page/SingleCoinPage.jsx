import { useParams } from 'react-router-dom';

const SingleCoinPage = () => {
  const { id } = useParams();

  return (
    <>
      <h1>Dummy</h1>
      {console.log(id)}
    </>
  );
};

export default SingleCoinPage;
