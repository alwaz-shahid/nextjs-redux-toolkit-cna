import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, getData } from '../../state/features/DataSlice';

export default function Main() {
  const [id, setId] = useState('');
  const [all, setAll] = useState(false);
  const dispatch = useDispatch();
  const { loading, data, body, status } = useSelector((state) => ({
    ...state.data,
  }));

  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);
  const fetchUsers = () => {
    dispatch(fetchData());
    setAll(true);
  };
  const handleFetch = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert('Please enter a valid ID');
    } else {
      dispatch(getData({ id }));
    }
    setAll(false);
    // console.log(data);
    // setId(e.target.value);
  };
  //delete handler
  const handleDelete = ({ id }) => {
    dispatch(deletePost({ id: data[0].id }));
    window.location.reload();
    window.alert('Deleted !');
  };
  return (
    <div className='w-full p-4 min-h-screen'>
      <form className='w-2/3 p-2' method='get'>
        <span className='font-bold'>Search by ID: </span>
        <input
          className='p-1 rounded m-2'
          type='text'
          name='id'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          onClick={handleFetch}
          type='submit'
          className='focus:ring-2 focus:ring-red-400 bg-red-800 py-1 px-2 rounded m-1'
        >
          Get User by id{' '}
        </button>

        <button
          onClick={fetchUsers}
          type='button'
          className='focus:ring-2 focus:ring-blue-400 bg-blue-800 py-1 px-2 rounded m-1'
        >
          Get All users
        </button>
        {/* <button
          className='focus:ring-2 focus:ring-blue-400 bg-blue-800 py-1 px-2 rounded'
          type='button'
        >
          Search
        </button> */}
      </form>
      {loading && (
        <span className='text-4xl text-red-700 font-bold m-auto'>
          Loading....
        </span>
      )}
      {/* <p className='p-2 text-red-800'>{id && id}</p> */}

      {data && data?.length > 0 && all ? (
        data?.map((item) => (
          <div key={item.id} className='p-2 border-b'>
            <p className='text-2xl font- text-red-400 font-semibold'>
              {item.id}. {item.title}
            </p>
            <p className='text-xl'>{item.body}</p>
          </div>
        ))
      ) : (
        <div key={data.id} className='p-2'>
          <p className='text-2xl font- text-red-400 font-semibold'>
            {data.id}. {data.title}
          </p>
          <p className='text-xl'>{data.body}</p>
        </div>
      )}
    </div>
  );
}
