import { useState, VFC } from 'react';
import { useAuthors } from 'src/hooks/useAuthors';
import { createAuthor, deleteAuthor, updateAuthor } from 'src/libs/api/authors';
import { Author } from 'types';
import { Button } from './@base/Button';
import { Input } from './@base/Input';
import { Modal } from './@base/Modal';

const initialAuthorState = {
  name: '',
};

export const AuthorList: VFC = () => {
  const {
    authors,
    isLoading: isLoadingAuthors,
    refetch: refetchAuthors,
  } = useAuthors();

  const [newAuthorState, setNewAuthorState] =
    useState<Omit<Author, 'id'>>(initialAuthorState);
  const [editAuthorState, setEditAuthorState] = useState<Author>({
    ...initialAuthorState,
    id: 0,
  });
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const openCreateModal = () => {
    setIsOpenCreateModal(true);
  };
  const closeCreateModal = () => {
    setIsOpenCreateModal(false);
    setNewAuthorState(initialAuthorState);
  };

  const openEditModal = (author: Author) => {
    setIsOpenEditModal(true);
    setEditAuthorState(author);
  };
  const closeEditModal = () => {
    setIsOpenEditModal(false);
    setEditAuthorState({
      ...initialAuthorState,
      id: 0,
    });
  };

  const handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isOpenCreateModal) {
      setNewAuthorState({ ...newAuthorState, [name]: value });
    }
    if (isOpenEditModal) {
      setEditAuthorState({ ...editAuthorState, [name]: value });
    }
  };

  /* 著者の追加 */
  const createAuthorHandler = async () => {
    try {
      await createAuthor(newAuthorState);
      setNewAuthorState(initialAuthorState);
      refetchAuthors();
      setIsOpenCreateModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  /* 著者の編集 */
  const updateAuthorHandler = async () => {
    try {
      await updateAuthor(editAuthorState);
      setEditAuthorState({
        ...initialAuthorState,
        id: 0,
      });
      refetchAuthors();
      setIsOpenEditModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  /* 著者の削除 */
  const deleteAuthorHandler = async (id: number) => {
    const haveBooks = authors?.find((author) => author.id === id)?.books.length;
    if (haveBooks) {
      alert('⚠この著者には本があります。');
      return;
    }

    try {
      await deleteAuthor(id);
      refetchAuthors();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className='p-4 space-y-3 bg-slate-200 rounded'>
        <div className='flex justify-between gap-4'>
          <h2 className='text-xl'>著者一覧</h2>
          <Button onClick={openCreateModal}>新規追加</Button>
        </div>
        {isLoadingAuthors ? (
          <p>Loading...</p>
        ) : (
          <div className='bg-white rounded p-1'>
            <div className='grid grid-cols-3 gap-2 p-1'>
              <div>名前</div>
              <div>冊数</div>
              <div className='flex justify-end items-center gap-2'></div>
            </div>
            {authors?.map((author) => (
              <div key={author.id} className='grid grid-cols-3 gap-2 p-1'>
                <div>{author.name}</div>
                <div>{author.books.length}</div>
                <div className='flex justify-end items-center gap-2'>
                  <Button onClick={() => openEditModal(author)}>編集</Button>
                  <Button
                    disabled={author.books.length > 0}
                    onClick={() => deleteAuthorHandler(author.id)}
                  >
                    削除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 追加Modal */}
      <Modal isOpen={isOpenCreateModal} closeHandler={closeCreateModal}>
        <div className='p-4 space-y-2 w-60 bg-slate-200 rounded'>
          <h2 className='text-xl'>著者を登録</h2>
          <Input
            name='name'
            placeholder='著者'
            value={newAuthorState.name}
            onChange={(e) => handleChangeState(e)}
          />
          <div className='text-right'>
            <Button onClick={createAuthorHandler}>送信</Button>
          </div>
        </div>
      </Modal>
      {/* 編集Modal */}
      <Modal isOpen={isOpenEditModal} closeHandler={closeEditModal}>
        <div className='p-4 space-y-2 w-60 bg-slate-200 rounded'>
          <h2 className='text-xl'>著者を編集</h2>
          <Input
            name='name'
            placeholder='著者'
            value={editAuthorState.name}
            onChange={(e) => handleChangeState(e)}
          />
          <div className='text-right'>
            <Button onClick={updateAuthorHandler}>更新</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
