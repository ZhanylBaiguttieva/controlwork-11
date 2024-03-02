
import { useAppDispatch } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { ItemMutation } from '../../../../types';
import { createItem } from '../itemsThunk.ts';
import ItemForm from './ItemForm.tsx';

const NewItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (itemMutation: ItemMutation) => {
    await dispatch(createItem(itemMutation)).unwrap();
    navigate('/');
  };
  return (
    <>
      <ItemForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewItem;