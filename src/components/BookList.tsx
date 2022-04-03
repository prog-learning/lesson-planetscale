import { useMemo, useState, VFC } from 'react';
import { useAuthors } from 'src/hooks/useAuthors';
import { useBooks } from 'src/hooks/useBooks';
import { createBook, deleteBook, updateBook } from 'src/libs/api/books';
import { Book, BookWithAuthor } from 'types';
import { Button } from './@base/Button';
import { Input } from './@base/Input';
import { Modal } from './@base/Modal';
import { Select } from './@base/Select';
import { Snackbar } from './@base/Snackbar';

type Props = {};

const initialBookState = {
  title: '',
  description: '',
  price: 0,
  authorId: 0,
};

export const BookList: VFC<Props> = () => {
  /* DBから取得したデータ */
  const {
    books,
    isLoading: isLoadingBooks,
    refetch: refetchBooks,
  } = useBooks();
  const { authors } = useAuthors();

  /* Formの入力状態 */
  const [newBookState, setNewBookState] =
    useState<Omit<Book, 'id'>>(initialBookState);
  const [editBookState, setEditBookState] = useState<Book>({
    ...initialBookState,
    id: 0,
  });
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  /* Select Options */
  const authorOptions = useMemo(() => {
    if (!authors) return [];
    return authors.map((author) => ({
      value: author.id,
      label: author.name,
    }));
  }, [authors]);

  const openCreateModal = () => {
    setIsOpenCreateModal(true);
  };
  const closeCreateModal = () => {
    setIsOpenCreateModal(false);
    setNewBookState(initialBookState);
  };

  const openEditModal = (book: BookWithAuthor) => {
    setIsOpenEditModal(true);
    setEditBookState(book);
    // setEditBookState({
    //   id: book.id,
    //   title: book.title,
    //   description: book.description,
    //   price: book.price,
    //   authorId: book.author.id,
    // });
  };
  const closeEditModal = () => {
    setIsOpenEditModal(false);
    setEditBookState({
      ...initialBookState,
      id: 0,
    });
  };

  const handleChangeState = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (isOpenCreateModal) {
      setNewBookState({ ...newBookState, [name]: value });
    }
    if (isOpenEditModal) {
      setEditBookState({ ...editBookState, [name]: value });
    }
  };

  /* 本の追加 */
  const createBookHandler = async () => {
    try {
      await createBook(newBookState);
      setNewBookState(initialBookState);
      refetchBooks();
      setIsOpenCreateModal(false);
    } catch (error: any) {
      setErrorMessages([error]);
    }
  };

  /* 本の編集 */
  const updateBookHandler = async () => {
    if (!editBookState) return;
    try {
      await updateBook(editBookState);
      setEditBookState({
        ...initialBookState,
        id: 0,
      });
      refetchBooks();
      setIsOpenEditModal(false);
    } catch (error: any) {
      setErrorMessages([error]);
    }
  };

  /* 本の削除 */
  const deleteBookDeleteHandler = async (id: number) => {
    try {
      await deleteBook(id);
      refetchBooks();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {/* Error Message */}
      <Snackbar
        isOpen={errorMessages.length > 0}
        closeHandler={() => setErrorMessages([])}
        messages={errorMessages}
      />
      <div className='p-4 space-y-3 bg-slate-200 rounded'>
        <div className='flex justify-between gap-4'>
          <h2 className='text-xl'>本一覧</h2>
          <Button onClick={openCreateModal}>新規追加</Button>
        </div>
        {isLoadingBooks ? (
          <p>Loading...</p>
        ) : (
          <div className='bg-white rounded p-1'>
            <div className='grid grid-cols-5 gap-2 p-1'>
              <div>タイトル</div>
              <div>説明</div>
              <div>著者</div>
              <div>価格</div>
              <div></div>
            </div>
            {books?.map((book) => (
              <div key={book.id} className='grid grid-cols-5 gap-2 p-1'>
                <div>{book.title}</div>
                <div>{book.description}</div>
                <div>{book.author.name}</div>
                <div>¥{book.price}</div>
                <div className='flex justify-end items-center gap-2'>
                  <Button onClick={() => openEditModal(book)}>編集</Button>
                  <Button onClick={() => deleteBookDeleteHandler(book.id)}>
                    削除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 登録Modal */}
      <Modal isOpen={isOpenCreateModal} closeHandler={closeCreateModal}>
        <div className='p-4 space-y-2 w-60 bg-slate-200 rounded'>
          <h2 className='text-xl'>本を登録</h2>
          <Input
            name='title'
            placeholder='タイトル'
            value={newBookState.title}
            onChange={(e) => handleChangeState(e)}
          />
          <Input
            name='description'
            placeholder='説明'
            value={newBookState.description}
            onChange={(e) => handleChangeState(e)}
          />
          <Input
            type='number'
            name='price'
            placeholder='価格'
            value={newBookState.price}
            onChange={(e) => handleChangeState(e)}
          />
          <Select
            name='authorId'
            value={newBookState.authorId}
            onChange={(e) => handleChangeState(e)}
          >
            <option value={0} disabled>
              著者を選択
            </option>
            {authorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <div className='text-right'>
            <Button onClick={createBookHandler}>送信</Button>
          </div>
        </div>
      </Modal>

      {/* 編集Modal */}
      <Modal isOpen={isOpenEditModal} closeHandler={closeEditModal}>
        <div className='p-4 space-y-2 w-60 bg-slate-200 rounded'>
          <h2 className='text-xl'>本を登録</h2>
          <Input
            name='title'
            placeholder='タイトル'
            value={editBookState.title}
            onChange={(e) => handleChangeState(e)}
          />
          <Input
            name='description'
            placeholder='説明'
            value={editBookState.description}
            onChange={(e) => handleChangeState(e)}
          />
          <Input
            name='price'
            placeholder='価格'
            value={editBookState.price}
            onChange={(e) => handleChangeState(e)}
          />
          <Select
            name='authorId'
            value={editBookState.authorId}
            onChange={(e) => handleChangeState(e)}
          >
            <option value={0} disabled>
              著者を選択
            </option>
            {authorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <div className='text-right'>
            <Button onClick={updateBookHandler}>更新</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
