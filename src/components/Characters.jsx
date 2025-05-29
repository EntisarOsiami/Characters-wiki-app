import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdDelete, MdClose } from 'react-icons/md';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

const API_URL = 'https://6836f2e3664e72d28e42d386.mockapi.io/character';
const initialChar = { name: '', img: '', gender: '' };

 function Characters() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [character, setCharacter] = useState(initialChar);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [charToDel, setCharToDel] = useState(null);
  const userData = JSON.parse(localStorage.getItem('user')) || {};
  const isLoggedIn = userData?.loggedIn === true;

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      const sortedChar = res.data.sort((a, b) => b.id - a.id);
      setCharacters(sortedChar);
    });
  }, []);

  const filteredCharacters = query
    ? characters.filter((char) =>
      char.name.toLowerCase().includes(query.toLowerCase())
    )
    : characters;

  const addChar = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error('You must be logged in to add a character');
      setOpen(false);
      return;
    }

    const { name, img, gender } = character;
    if (!name || !img || !gender) return toast.error('Please fill all fields');

    try {
      const res = await axios.post(API_URL, {
        ...character,
        userId: userData.id,
      });
      toast.success('Character added');
      setCharacters([res.data, ...characters]);
      setCharacter(initialChar);
      setOpen(false);
    } catch (err) {
      toast.error('Failed to add',err);
    }
  };

  const deleteChar = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCharacters(characters.filter((char) => char.id !== id));
      toast.success('Character deleted');
      setDeleteOpen(false);
      setCharToDel(null);
    } catch (err) {
      toast.error('Failed to delete character', err);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col sm:flex-row gap-2 justify-center mb-8'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search character'
          className='px-4 py-2 border bg-gray-200 text-black border-gray-700 rounded-md w-64'
        />
        <button
          onClick={() => {
            if (isLoggedIn) {
              setOpen(true);
            } else {
              toast.error('Please log in to add a character');
            }
          }}
          className='bg-indigo-700 text-white px-6 py-2 rounded-md'>
          Add Character
        </button>
      </div>

      {filteredCharacters.length ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredCharacters.map((char) => (
            <div
              key={char.id}
              className='bg-gray-800 border border-indigo-800 rounded-lg overflow-hidden relative'>
              <img src={char.img} className='w-full h-56 object-cover' />
              <div className='p-4'>
                <h2 className='text-xl font-semibold text-white'>{char.name}</h2>
                <p className='text-purple-300 mt-2'>{char.gender}</p>
                {isLoggedIn && userData.id === char.userId && (
                  <button
                    onClick={() => {
                      setCharToDel(char);
                      setDeleteOpen(true);
                    }}
                    className='absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full'>
                    <MdDelete size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-400 text-lg mt-8'>
         Oops! No characters found
        </p>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogBackdrop className='fixed inset-0 bg-black/30' />
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel className='w-full max-w-md bg-gray-800 p-6 rounded-lg'>
              <div className='flex justify-between items-center mb-4'>
                <DialogTitle className='text-lg font-medium text-white'>
                  Add New Character
                </DialogTitle>
                <button
                  onClick={() => setOpen(false)}
                  className='text-gray-400'>
                  <MdClose size={24} />
                </button>
              </div>
              <form onSubmit={addChar} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-1'>
                    Name
                  </label>
                  <input
                    type='text'
                    value={character.name}
                    onChange={(e) =>
                      setCharacter({ ...character, name: e.target.value })
                    }
                    className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-1'>
                    Image URL
                  </label>
                  <input
                    type='text'
                    value={character.img}
                    onChange={(e) =>
                      setCharacter({ ...character, img: e.target.value })
                    }
                    className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-1'>
                    Gender
                  </label>
                  <select
                    value={character.gender}
                    onChange={(e) =>
                      setCharacter({ ...character, gender: e.target.value })
                    }
                    className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white'>
                    <option value=''>Select gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                  </select>
                </div>
                <button
                  type='submit'
                  className='w-full bg-indigo-600 py-2 px-4 rounded-md text-white'>
                  Add Character
                </button>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogBackdrop className='fixed inset-0 bg-black/30' />
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel className='w-full max-w-md bg-gray-800 p-6 rounded-lg'>
              <DialogTitle className='text-lg font-medium text-white mb-4'>
                Confirm Delete
              </DialogTitle>
              <p className='text-gray-300 mb-6'>
                Are you sure you want to delete <strong>{charToDel?.name}</strong>?
              </p>
              <div className='flex justify-end gap-3'>
                <button
                  onClick={() => setDeleteOpen(false)}
                  className='px-4 py-2 bg-gray-700 text-white rounded-md'>
                  Cancel
                </button>
                <button
                  onClick={() => charToDel && deleteChar(charToDel.id)}
                  className='px-4 py-2 bg-red-600 text-white rounded-md'>
                  Delete
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
export default Characters;
